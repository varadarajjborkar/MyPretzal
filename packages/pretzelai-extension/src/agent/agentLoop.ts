/*
 * Copyright (c) Pretzel AI GmbH.
 * This file is part of the Pretzel project and is licensed under the
 * GNU Affero General Public License version 3.
 * See the LICENSE_AGPLv3 file at the root of the project for the full license text.
 * Contributions by contributors listed in the PRETZEL_CONTRIBUTORS file (found at
 * the root of the project) are licensed under AGPLv3.
 */
import { IOllamaConnection, IOllamaToolCall, streamOllamaChatParts } from '../ollama';
import { IAgentTool, toolSchema } from './webTools';

/**
 * Added to the chat system message in agent mode, so the model knows it can act instead of
 * answering from memory alone.
 */
export const AGENT_SYSTEM_MESSAGE = `You can use tools to look things up before answering. Guidelines:
- Search the web whenever the answer depends on current information, a specific library version, or anything you are unsure about. Do not guess.
- Search with short, specific queries. Read the pages that look most useful before answering.
- When a question mentions a URL, a repository or a document, read it rather than assuming its contents.
- Work in small steps: search, read, then answer. Use several tools in a row when a question needs it.
- Base the answer on what you actually read, and list the URLs you used at the end under "Sources".
- If the tools fail or find nothing useful, say so plainly instead of inventing an answer.`;

/** How many times the model may call tools before it must answer. */
export const DEFAULT_MAX_STEPS = 12;

export type AgentStepStatus = 'running' | 'done' | 'error' | 'skipped';

/** One tool call, as shown in the chat while the agent works. */
export interface IAgentStep {
  id: number;
  tool: string;
  label: string;
  status: AgentStepStatus;
  detail?: string;
}

export interface IRunAgentOptions {
  connection: IOllamaConnection;
  model: string;
  /** The conversation so far, including the system message. */
  messages: any[];
  tools: IAgentTool[];
  signal: AbortSignal;
  /** Called with reply text as it streams. */
  onText: (chunk: string) => void;
  /** Called when a step starts and again when it finishes. */
  onStep: (step: IAgentStep) => void;
  /** Ask the user before running a tool. Returning false skips the call and tells the model so. */
  approve?: (tool: IAgentTool, args: any) => Promise<boolean>;
  maxSteps?: number;
}

/** Ollama sometimes sends tool arguments as a JSON string rather than an object. */
const parseArgs = (args: any): Record<string, any> => {
  if (typeof args === 'string') {
    try {
      return JSON.parse(args);
    } catch {
      return {};
    }
  }
  return args || {};
};

/** Read one reply from the model, streaming its text and collecting any tool calls. */
async function readTurn(
  options: IRunAgentOptions,
  conversation: any[],
  offerTools: boolean
): Promise<{ content: string; toolCalls: IOllamaToolCall[] }> {
  const { connection, model, tools, signal, onText } = options;
  const stream = await streamOllamaChatParts(connection, model, conversation, {
    tools: offerTools ? tools.map(toolSchema) : undefined,
    signal
  });

  let content = '';
  const toolCalls: IOllamaToolCall[] = [];
  for await (const part of stream) {
    if (part.content) {
      content += part.content;
      onText(part.content);
    }
    if (part.toolCalls?.length) {
      toolCalls.push(...part.toolCalls);
    }
  }
  return { content, toolCalls };
}

/**
 * Run the agent until the model answers without asking for a tool.
 *
 * Each round: the model replies, and if it asks for tools they are run and their results are
 * added to the conversation for the next round. Tool failures are reported back to the model
 * rather than thrown, so it can try something else. Cancelling aborts the whole run.
 */
export async function runOllamaAgent(options: IRunAgentOptions): Promise<void> {
  const { messages, tools, signal, onText, onStep, approve, maxSteps = DEFAULT_MAX_STEPS } = options;
  const byName = new Map(tools.map(tool => [tool.name, tool]));
  const conversation = [...messages];
  let stepId = 0;

  for (let round = 0; round < maxSteps; round++) {
    if (signal.aborted) {
      return;
    }

    const { content, toolCalls } = await readTurn(options, conversation, true);
    if (!toolCalls.length) {
      return; // the model answered
    }

    conversation.push({
      role: 'assistant',
      content,
      // eslint-disable-next-line camelcase
      tool_calls: toolCalls
    });

    for (const call of toolCalls) {
      if (signal.aborted) {
        return;
      }
      const name = call.function?.name;
      const tool = name ? byName.get(name) : undefined;
      const args = parseArgs(call.function?.arguments);

      if (!tool) {
        conversation.push({
          role: 'tool',
          /* eslint-disable-next-line camelcase */
          tool_name: name,
          content: `There is no tool called "${name}". Available tools: ${tools.map(t => t.name).join(', ')}.`
        });
        continue;
      }

      const step: IAgentStep = { id: ++stepId, tool: tool.name, label: tool.label(args), status: 'running' };
      onStep(step);

      if (approve && !(await approve(tool, args))) {
        onStep({ ...step, status: 'skipped' });
        conversation.push({
          role: 'tool',
          /* eslint-disable-next-line camelcase */
          tool_name: tool.name,
          content: 'The user declined this tool call. Continue without it, or ask them what to do instead.'
        });
        continue;
      }

      try {
        const result = await tool.run(args, signal);
        onStep({ ...step, status: 'done' });
        /* eslint-disable-next-line camelcase */
        conversation.push({ role: 'tool', tool_name: tool.name, content: result });
      } catch (error: any) {
        if (error?.name === 'AbortError' || signal.aborted) {
          return;
        }
        const message = error?.message || String(error);
        onStep({ ...step, status: 'error', detail: message });
        /* eslint-disable-next-line camelcase */
        conversation.push({ role: 'tool', tool_name: tool.name, content: `The tool failed: ${message}` });
      }
    }
  }

  // Out of steps. Ask once more with no tools, so the user gets an answer from what was gathered.
  if (!signal.aborted) {
    onText('\n\n');
    conversation.push({
      role: 'user',
      content: 'Stop using tools now and answer with what you have found so far, noting anything still uncertain.'
    });
    await readTurn(options, conversation, false);
  }
}
