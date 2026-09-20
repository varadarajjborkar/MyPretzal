/*
 * Copyright (c) Pretzel AI GmbH.
 * This file is part of the Pretzel project and is licensed under the
 * GNU Affero General Public License version 3.
 * See the LICENSE_AGPLv3 file at the root of the project for the full license text.
 * Contributions by contributors listed in the PRETZEL_CONTRIBUTORS file (found at
 * the root of the project) are licensed under AGPLv3.
 */
import { URLExt } from '@jupyterlab/coreutils';
import { ServerConnection } from '@jupyterlab/services';

/**
 * A tool the chat agent can use. `run` returns the text handed back to the model, so it should
 * be readable on its own: the model sees nothing else about what happened.
 */
export interface IAgentTool {
  name: string;
  description: string;
  parameters: Record<string, any>;
  /**
   * Whether this call only looks at things ('read') or changes them ('write'): edits a cell,
   * runs code, installs a package. The approval setting is read against this, so a user who
   * wants to be asked before anything changes is not also asked before every search.
   */
  risk?: 'read' | 'write';
  /** Ask the user every time, whatever the approval setting is. */
  alwaysAsk?: boolean;
  /** Short line describing this call, shown in the chat while it runs. */
  label: (args: any) => string;
  run: (args: any, signal?: AbortSignal) => Promise<string>;
}

/** The tool definition as the model's API expects it. */
export const toolSchema = (tool: IAgentTool) => ({
  type: 'function',
  function: { name: tool.name, description: tool.description, parameters: tool.parameters }
});

/**
 * Call Pretzel's server-side web tools. Search engines and most websites don't allow browser
 * requests (no CORS headers), so the server makes these calls (see jupyterlab/handlers/agent_handler.py).
 */
async function agentRequest(
  endpoint: 'search' | 'fetch' | 'github',
  payload: object,
  signal?: AbortSignal
): Promise<any> {
  const settings = ServerConnection.makeSettings();
  const response = await ServerConnection.makeRequest(
    URLExt.join(settings.baseUrl, 'lab/api/agent', endpoint),
    { method: 'POST', body: JSON.stringify(payload), signal },
    settings
  ).catch(error => {
    if (signal?.aborted) {
      throw new DOMException('The request was aborted', 'AbortError');
    }
    throw error;
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.message || data.reason || `The ${endpoint} tool failed (${response.status})`);
  }
  return data;
}

export interface ISearchResult {
  title: string;
  url: string;
  snippet: string;
}

export const webSearchTool: IAgentTool = {
  name: 'web_search',
  risk: 'read',
  description:
    'Search the web and get a list of results with titles, URLs and short extracts. ' +
    'Use it to find current information, documentation or examples. ' +
    'The extracts are short, so follow up with read_page on the results worth reading in full.',
  parameters: {
    type: 'object',
    properties: {
      query: { type: 'string', description: 'What to search for, as you would type it into a search engine' },
      // eslint-disable-next-line camelcase
      max_results: { type: 'integer', description: 'How many results to return (1-10, default 5)' }
    },
    required: ['query']
  },
  label: args => `Searching the web for "${args?.query ?? ''}"`,
  run: async (args, signal) => {
    const data = await agentRequest(
      'search',
      // eslint-disable-next-line camelcase
      { query: args?.query, max_results: Math.min(Number(args?.max_results) || 5, 10) },
      signal
    );
    const results: ISearchResult[] = data.results || [];
    // Which sources answered, and which turned us away: without this the model cannot tell
    // "there is nothing about this" from "the search engine refused to answer"
    const sources = (data.sources || []).join(', ');
    const notes = (data.notes || []).length ? `\n\nCouldn't use: ${(data.notes || []).join('; ')}` : '';
    if (!results.length) {
      return `No results for "${args?.query}".${notes || ' Try different words.'}`;
    }
    const list = results.map((r, i) => `${i + 1}. ${r.title}\n   URL: ${r.url}\n   ${r.snippet}`).join('\n\n');
    return `Results from ${sources || 'the web'}:\n\n${list}${notes}`;
  }
};

export const readPageTool: IAgentTool = {
  name: 'read_page',
  risk: 'read',
  description:
    'Read one web page and get its text. Use it after web_search to read a result in full, ' +
    'or directly when you already know the URL (documentation, an article, a GitHub page). ' +
    'Always pass looking_for: a long page is trimmed to the parts that match it, so a precise ' +
    'looking_for is the difference between getting the answer and getting the introduction.',
  parameters: {
    type: 'object',
    properties: {
      url: { type: 'string', description: 'The full URL of the page, starting with https://' },
      // eslint-disable-next-line camelcase
      looking_for: {
        type: 'string',
        description: 'What you want from this page, in a few words. Used to pick which parts to return.'
      },
      // eslint-disable-next-line camelcase
      max_chars: { type: 'integer', description: 'How much text to return (default 8000, maximum 40000)' }
    },
    required: ['url']
  },
  label: args => {
    try {
      return `Reading ${new URL(args?.url).hostname}`;
    } catch {
      return `Reading ${args?.url ?? 'a page'}`;
    }
  },
  run: async (args, signal) => {
    const data = await agentRequest(
      'fetch',
      // eslint-disable-next-line camelcase
      { url: args?.url, query: args?.looking_for ?? '', max_chars: Number(args?.max_chars) || 8000 },
      signal
    );
    const header = [data.title, data.url].filter(Boolean).join('\n');
    const ending = data.truncated
      ? '\n\n[Only the parts matching what you asked for are shown. Read it again with a different ' +
        'looking_for, or a larger max_chars, for more.]'
      : '';
    return `${header}\n\n${data.text}${ending}`;
  }
};

export const githubRepoTool: IAgentTool = {
  name: 'github_repo',
  risk: 'read',
  description:
    'Look at a GitHub repository: what it is for, its README, and the list of files in it. ' +
    'Use this instead of read_page for anything on github.com, and before answering questions ' +
    'about a project. Then read the files that matter with github_file.',
  parameters: {
    type: 'object',
    properties: {
      repo: { type: 'string', description: 'Either "owner/name" or the repository\'s github.com URL' }
    },
    required: ['repo']
  },
  label: args => `Reading the ${args?.repo ?? ''} repository`,
  run: async (args, signal) => {
    const data = await agentRequest('github', { action: 'repo', repo: args?.repo }, signal);
    const files = (data.files || []).slice(0, 120).join('\n');
    return [
      `${data.full_name} — ${data.description || 'no description'}`,
      `${data.url} | ${data.language || 'no main language'} | ${data.stars} stars | last pushed ${data.updated}` +
        `${data.private ? ' | private repository' : ''}${data.license ? ` | ${data.license}` : ''}`,
      '',
      'README:',
      (data.readme || '(no README)').slice(0, 6000),
      '',
      `Files (${(data.files || []).length}${data.files_truncated ? '+, list truncated' : ''}):`,
      files
    ].join('\n');
  }
};

export const githubFileTool: IAgentTool = {
  name: 'github_file',
  risk: 'read',
  description:
    'Read one file from a GitHub repository, by its path inside that repository. ' +
    'Use github_repo first to see which files exist.',
  parameters: {
    type: 'object',
    properties: {
      repo: { type: 'string', description: 'Either "owner/name" or the repository\'s github.com URL' },
      path: { type: 'string', description: 'Path inside the repository, such as src/main.py' },
      ref: { type: 'string', description: 'Branch or tag, if not the default branch' }
    },
    required: ['repo', 'path']
  },
  label: args => `Reading ${args?.path ?? 'a file'} from ${args?.repo ?? 'the repository'}`,
  run: async (args, signal) => {
    const data = await agentRequest(
      'github',
      { action: 'file', repo: args?.repo, path: args?.path, ref: args?.ref ?? '' },
      signal
    );
    return `${data.repo}: ${data.path}\n\n${data.content}`;
  }
};

export const webTools: IAgentTool[] = [webSearchTool, readPageTool, githubRepoTool, githubFileTool];
