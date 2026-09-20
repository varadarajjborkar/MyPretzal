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
async function agentRequest(endpoint: 'search' | 'fetch', payload: object, signal?: AbortSignal): Promise<any> {
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
    if (!results.length) {
      return `No results for "${args?.query}". Try different words.`;
    }
    return results
      .map((r, i) => `${i + 1}. ${r.title}\n   URL: ${r.url}\n   ${r.snippet}`)
      .join('\n\n');
  }
};

export const readPageTool: IAgentTool = {
  name: 'read_page',
  description:
    'Read one web page and get its text. Use it after web_search to read a result in full, ' +
    'or directly when you already know the URL (documentation, an article, a raw file on GitHub). ' +
    'Long pages are cut off; ask for a bigger max_chars if you need more.',
  parameters: {
    type: 'object',
    properties: {
      url: { type: 'string', description: 'The full URL of the page, starting with https://' },
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
      { url: args?.url, max_chars: Number(args?.max_chars) || 8000 },
      signal
    );
    const header = [data.title, data.url].filter(Boolean).join('\n');
    const ending = data.truncated ? '\n\n[The page continues; read it again with a larger max_chars if needed.]' : '';
    return `${header}\n\n${data.text}${ending}`;
  }
};

export const webTools: IAgentTool[] = [webSearchTool, readPageTool];
