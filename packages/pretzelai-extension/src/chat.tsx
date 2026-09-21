/* eslint-disable camelcase */
/*
 * Copyright (c) Pretzel AI GmbH.
 * This file is part of the Pretzel project and is licensed under the
 * GNU Affero General Public License version 3.
 * See the LICENSE_AGPLv3 file at the root of the project for the full license text.
 * Contributions by contributors listed in the PRETZEL_CONTRIBUTORS file (found at
 * the root of the project) are licensed under AGPLv3.
 */

import { OpenAIClient } from '@azure/openai';
import { ILabShell, JupyterFrontEnd } from '@jupyterlab/application';
import { IThemeManager, ReactWidget } from '@jupyterlab/apputils';
import { URLExt } from '@jupyterlab/coreutils';
import { INotebookTracker } from '@jupyterlab/notebook';
import { IRenderMimeRegistry } from '@jupyterlab/rendermime';
import { ServerConnection } from '@jupyterlab/services';
import { LabIcon } from '@jupyterlab/ui-components';
import MistralClient from '@mistralai/mistralai';
import { Editor, loader, Monaco } from '@monaco-editor/react';
import AddIcon from '@mui/icons-material/Add';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import HistoryIcon from '@mui/icons-material/History';
import UploadIcon from '@mui/icons-material/Upload';
import { Box, IconButton, ListSubheader, Menu, MenuItem, Typography } from '@mui/material';
import * as monaco from 'monaco-editor';
import { OpenAI } from 'openai';
import posthog from 'posthog-js';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import pretzelSvg from '../style/icons/pretzel.svg';
import { CHAT_SYSTEM_MESSAGE, chatAIStream, generateChatPrompt } from './chatAIUtils';
import { describeChatError } from './chatErrors';
import { RendermimeMarkdown } from './components/rendermime-markdown';
import { DEFAULT_MAX_STEPS, IAgentStep, runOllamaAgent, TOOL_GUIDANCE, WEB_GUIDANCE } from './agent/agentLoop';
import { IAgentTool, webTools } from './agent/webTools';
import { createNotebookTools } from './agent/notebookTools';
import { createEnvTools, environmentContext, forgetEnvironment, mentionNote } from './agent/envTools';
import { ApprovalCard, ApprovalChoice } from './components/ApprovalCard';
import { IToolPreview } from './agent/webTools';
import { runCellNow } from './agent/notebookTools';
import { DISPLAY_GUIDANCE, ENVIRONMENT_GUIDANCE, NOTEBOOK_STATE_GUIDANCE, OBEDIENCE_GUIDANCE } from './agent/guidance';
import { AgentApproval, AgentButton, IAgentTools } from './components/AgentButton';
import { ChatModelPicker } from './components/ChatModelPicker';
import { globalState } from './globalState';
import { getDefaultSettings } from './migrations/defaultSettings';
import { Embedding } from './prompt';
import {
  completionFunctionProvider,
  getSelectedCode,
  getTopSimilarities,
  PRETZEL_FOLDER,
  readEmbeddings
} from './utils';
import { providersInfo } from './migrations/providerInfo';
import { ImagePreview } from './components/ImagePreview';
import { OllamaMode, ollamaModelSupportsTools } from './ollama';

loader.config({ monaco }); // BUG FIX - WAS PICKING UP OLD VERSION OF MONACO FROM JSDELIVR

const pretzelIcon = new LabIcon({
  name: 'pretzelai::chat',
  svgstr: pretzelSvg
});

interface IMessage {
  id: string;
  content: string;
  role: 'user' | 'assistant' | 'system';
  // Name the user gave the chat. Kept on the chat's first message so chat_history.json stays a list of message lists
  chatTitle?: string;
  // Reply that failed (the AI provider or model gave an error)
  error?: boolean;
}

const initialMessage: IMessage[] = [{ id: '1', content: 'Hello, how can I assist you today?', role: 'assistant' }];
const isMac = /Mac/i.test(navigator.userAgent);
const keyCombination = isMac ? 'Ctrl+Cmd+B' : 'Ctrl+Alt+B';
const historyPrevKeyCombination = isMac ? '⇧⌘<' : '⇧^<';
const historyNextKeyCombination = isMac ? '⇧⌘>' : '⇧^>';

// Replies that are an error message rather than an answer ("ERROR: ..." is also how older code reports errors)
const isErrorReply = (message?: IMessage): boolean =>
  message?.role === 'assistant' &&
  (!!message.error || (typeof message.content === 'string' && message.content.startsWith('ERROR: ')));

// What the model is sent: failed replies, and the questions they were answering, are left out
const withoutFailedReplies = (messages: IMessage[]): IMessage[] =>
  messages.filter(
    (message, i) => !isErrorReply(message) && !(message.role === 'user' && isErrorReply(messages[i + 1]))
  );

// Chats are saved next to the notebook, in .pretzel/chat_history.json
const getChatHistoryPath = (notebookPath: string): string =>
  notebookPath.substring(0, notebookPath.lastIndexOf('/')) + '/' + PRETZEL_FOLDER + '/' + 'chat_history.json';

// The first thing the user asked in a chat
const getFirstQuestion = (chat: IMessage[]): string => {
  const content: any = chat.find(message => message.role === 'user')?.content ?? '';
  const text = Array.isArray(content) ? content.find(item => item.type === 'text')?.text ?? '' : content;
  return text.replace(/\s+/g, ' ').trim();
};

// Title for a saved chat in the history menu: the name the user gave it, or else its first question
const getChatTitle = (chat: IMessage[]): string => chat[0]?.chatTitle || getFirstQuestion(chat) || 'Untitled chat';

// A copy of the chat with its name set (or removed when chatTitle is undefined)
const withChatTitle = (chat: IMessage[], chatTitle?: string): IMessage[] => [
  { ...chat[0], chatTitle },
  ...chat.slice(1)
];

// Compares content by value, since messages with images have a list as content
const isSameMessage = (message: IMessage, other: IMessage): boolean =>
  message.id === other.id &&
  message.role === other.role &&
  JSON.stringify(message.content) === JSON.stringify(other.content);

const isSameChat = (chat?: IMessage[], other?: IMessage[]): boolean =>
  !!chat && !!other && chat.length === other.length && chat.every((message, i) => isSameMessage(message, other[i]));

// Which saved chat the open conversation is (it may have gone on since it was saved), or chats.length if none
const findOpenChat = (chats: IMessage[][], messages: IMessage[]): number => {
  let found = chats.length;
  chats.forEach((chat, i) => {
    const isStartOfOpenChat =
      chat.length > 1 &&
      chat.length <= messages.length &&
      chat.every((message, j) => isSameMessage(message, messages[j]));
    if (isStartOfOpenChat && (found === chats.length || chat.length >= chats[found].length)) {
      found = i;
    }
  });
  return found;
};

// Text box for renaming a chat in the history menu. Enter or clicking away saves, Esc cancels
// Web search preferences live in the browser, not in Pretzel Settings: they are a working habit
// that changes often, and they belong to the person rather than the project. localStorage can be
// unavailable (private windows, blocked site data), so every access is guarded.
const readAgentPref = (key: string): string => {
  try {
    return localStorage.getItem(key) ?? '';
  } catch {
    return '';
  }
};

const writeAgentPref = (key: string, value: string): void => {
  try {
    localStorage.setItem(key, value);
  } catch {
    // Remembering the choice is not worth breaking the chat over
  }
};

// Markdown that must start a line: a code fence, heading, quote, table or list. The label goes
// above such an answer rather than in front of it, because "***AI:*** ```python" is not a fence
// any more, and the code would render as prose with its comments as headings.
const STARTS_A_BLOCK = /^\s*(```|~~~|#{1,6}\s|>|\||[-*+]\s|\d+\.\s)/;

const withLabel = (label: string, content: any): string => {
  const text = typeof content === 'string' ? content : String(content ?? '');
  return STARTS_A_BLOCK.test(text) ? `${label}\n\n${text}` : `${label} ${text}`;
};

function ChatNameInput({
  initialName,
  onSave,
  onCancel
}: {
  initialName: string;
  onSave: (name: string) => void;
  onCancel: () => void;
}): JSX.Element {
  const [name, setName] = useState(initialName);
  // Enter/Esc remove the text box, which can also fire a blur; only finish once
  const finishedRef = useRef(false);
  const finish = (save: boolean) => {
    if (finishedRef.current) {
      return;
    }
    finishedRef.current = true;
    if (save) {
      onSave(name);
    } else {
      onCancel();
    }
  };
  return (
    <input
      className="jp-mod-styled"
      aria-label="Chat name"
      placeholder="Name this chat"
      autoFocus
      value={name}
      onChange={e => setName(e.target.value)}
      onFocus={e => e.target.select()}
      onBlur={() => finish(true)}
      onClick={e => e.stopPropagation()}
      onKeyDown={e => {
        // Keep keys in the text box: the menu would use them to jump between chats or to close
        e.stopPropagation();
        if (e.key === 'Enter' || e.key === 'Escape') {
          e.preventDefault();
          finish(e.key === 'Enter');
          // Back to the chat in the list, so the arrow keys and Esc keep working
          e.currentTarget.closest('li')?.focus();
        }
      }}
      style={{ width: '100%', height: '24px' }}
    />
  );
}

interface IChatProps {
  aiChatModelProvider: string;
  aiChatModelString: string;
  openAiApiKey?: string;
  openAiBaseUrl?: string;
  azureBaseUrl?: string;
  azureApiKey?: string;
  deploymentId?: string;
  mistralApiKey?: string;
  anthropicApiKey?: string;
  ollamaBaseUrl?: string;
  ollamaMode?: OllamaMode;
  ollamaApiKey?: string;
  groqApiKey?: string;
  notebookTracker: INotebookTracker | null;
  app: JupyterFrontEnd;
  rmRegistry: IRenderMimeRegistry;
  aiClient: OpenAI | OpenAIClient | MistralClient | null;
  codeMatchThreshold: number;
  posthogPromptTelemetry: boolean;
  themeManager: IThemeManager;
  pretzelSettingsJSON: ReturnType<typeof getDefaultSettings> | null;
  // Saves the model picked in the chat as the AI Chat model
  onChatModelChange?: (provider: string, model: string) => void;
}

export function Chat({
  aiChatModelProvider,
  aiChatModelString,
  openAiApiKey,
  openAiBaseUrl,
  azureBaseUrl,
  azureApiKey,
  deploymentId,
  mistralApiKey,
  anthropicApiKey,
  ollamaBaseUrl,
  ollamaMode,
  ollamaApiKey,
  groqApiKey,
  notebookTracker,
  app,
  rmRegistry,
  aiClient,
  codeMatchThreshold,
  posthogPromptTelemetry,
  themeManager,
  pretzelSettingsJSON,
  onChatModelChange
}: IChatProps): JSX.Element {
  // Saving settings (e.g. picking another model) rebuilds this panel: carry on with the chat that was open
  const [messages, setMessages] = useState<IMessage[]>(globalState.openChat?.messages ?? initialMessage);
  const [chatHistory, setChatHistory] = useState<IMessage[][]>([]);
  // Position of the open chat in chatHistory; chatHistory.length means a new chat that isn't saved yet
  const [chatIndex, setChatIndex] = useState(globalState.openChat?.chatIndex ?? 0);
  const [historyMenuAnchor, setHistoryMenuAnchor] = useState<HTMLElement | null>(null);
  // Chat in the history menu that is being renamed, or waiting for the user to confirm its deletion
  const [historyMenuAction, setHistoryMenuAction] = useState<{ type: 'rename' | 'delete'; index: number } | null>(null);
  // Where to put keyboard focus in the history menu once a deleted chat is gone from the list
  const focusAfterDeleteRef = useRef<{ list: HTMLElement; position: number } | null>(null);
  const clearChatRef = useRef<() => void>(() => {});
  const chatHistoryRef = useRef<IMessage[][]>([]);
  const [isAiGenerating, setIsAiGenerating] = useState(false);
  const [referenceSource, setReferenceSource] = useState('');
  const [stopGeneration, setStopGeneration] = useState<() => void>(() => () => {});
  const messagesEndRef = useRef<null | HTMLDivElement>(null);
  const [editorValue, setEditorValue] = useState(globalState.openChat?.draft ?? '');
  const openChatRef = useRef({ messages, chatIndex, draft: editorValue });
  openChatRef.current = { messages, chatIndex, draft: editorValue };
  // Set when a model is picked in the chat: the rebuilt panel puts the cursor back in the chat box
  const focusInputAfterRebuildRef = useRef(false);
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);
  const [base64Images, setBase64Images] = useState<string[]>([]);
  const base64ImagesRef = useRef<string[]>([]);
  const [hoveredImage, setHoveredImage] = useState<string | null>(null);
  const [canBeUsedForImages, setCanBeUsedForImages] = useState(false);
  const canBeUsedForImagesRef = useRef(false);

  useEffect(() => {
    const currentSettingsVersion = pretzelSettingsJSON?.version;
    if (currentSettingsVersion) {
      setCanBeUsedForImages(providersInfo[aiChatModelProvider]?.models[aiChatModelString]?.canBeUsedForImages ?? false);
    }
  }, [pretzelSettingsJSON, aiChatModelProvider, aiChatModelString]);

  useEffect(() => {
    canBeUsedForImagesRef.current = canBeUsedForImages;
  }, [canBeUsedForImages]);

  const fetchChatHistory = async () => {
    const notebook = notebookTracker?.currentWidget;
    if (!notebook?.model) {
      setTimeout(fetchChatHistory, 1000);
      return;
    }
    if (notebook?.model && !isAiGenerating) {
      const chatHistoryPath = getChatHistoryPath(notebook.context.path);

      const requestUrl = URLExt.join(app.serviceManager.serverSettings.baseUrl, 'api/contents', chatHistoryPath);
      const response = await ServerConnection.makeRequest(
        requestUrl,
        { method: 'GET', headers: { 'Content-Type': 'application/json' } },
        app.serviceManager.serverSettings
      );
      if (response.ok) {
        // chat_history.json exists
        const file = await app.serviceManager.contents.get(chatHistoryPath);
        const chatHistoryJson = JSON.parse(file.content);
        setChatHistory(chatHistoryJson);
        // Keep saving the open chat in its place if it is one of this folder's chats (else it's saved as a new one)
        setChatIndex(findOpenChat(chatHistoryJson, openChatRef.current.messages));
      } else {
        // No chats saved in this notebook's folder yet
        setChatHistory([]);
        setChatIndex(0);
      }
    }
  };

  const saveMessages = async () => {
    // Nothing to save until the user has sent a message
    if (!notebookTracker || messages.length <= 1) return;
    const notebook = notebookTracker.currentWidget;
    if (notebook?.model && !isAiGenerating) {
      const chatHistoryPath = getChatHistoryPath(notebook.context.path);

      const requestUrl = URLExt.join(app.serviceManager.serverSettings.baseUrl, 'api/contents', chatHistoryPath);
      const response = await ServerConnection.makeRequest(
        requestUrl,
        { method: 'GET', headers: { 'Content-Type': 'application/json' } },
        app.serviceManager.serverSettings
      );
      if (response.ok) {
        // chat_history.json exists
        const file = await app.serviceManager.contents.get(chatHistoryPath);
        try {
          const chatHistoryJson = JSON.parse(file.content);
          const isContinuationOf = (chat?: IMessage[]) =>
            !!chat && chat.every(m => messages.some(m2 => isSameMessage(m, m2)));
          // Update the chat in place if it was opened from history (or is the latest chat) and continued,
          // otherwise save it as a new chat
          let savedIndex = chatHistoryJson.length;
          if (isContinuationOf(chatHistoryJson[chatIndex])) {
            savedIndex = chatIndex;
          } else if (isContinuationOf(chatHistoryJson[chatHistoryJson.length - 1])) {
            savedIndex = chatHistoryJson.length - 1;
          }
          // Names are changed from the history menu straight in the file, so an updated chat keeps its saved name
          chatHistoryJson[savedIndex] =
            savedIndex < chatHistoryJson.length
              ? withChatTitle(messages, chatHistoryJson[savedIndex][0]?.chatTitle)
              : messages;
          await app.serviceManager.contents.save(chatHistoryPath, {
            type: 'file',
            format: 'text',
            content: JSON.stringify(chatHistoryJson)
          });
          setChatHistory(chatHistoryJson);
          setChatIndex(savedIndex);
        } catch (error) {
          console.error('Error parsing chat history JSON:', error);
        }
      } else {
        // create chat_history.json
        const messagesToSave = [messages];
        app.serviceManager.contents.save(chatHistoryPath, {
          type: 'file',
          format: 'text',
          content: JSON.stringify(messagesToSave)
        });
        setChatHistory(messagesToSave);
        setChatIndex(0);
      }
    }
  };

  useEffect(() => {
    // Remember the open chat for when the panel is rebuilt
    return () => {
      globalState.openChat = { ...openChatRef.current, focusInput: focusInputAfterRebuildRef.current };
    };
  }, []);

  useEffect(() => {
    // Load chat history
    fetchChatHistory();
    const labShell = app.shell as ILabShell;
    labShell.currentPathChanged.connect((sender, args) => {
      fetchChatHistory();
    });
  }, []);

  useEffect(() => {
    chatHistoryRef.current = chatHistory;
  }, [chatHistory]);

  useEffect(() => {
    // Triggers when AI generation finishes
    if (!isAiGenerating) {
      saveMessages();
    }
  }, [isAiGenerating]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView();
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handlePaste = useCallback(
    (editor: monaco.editor.IStandaloneCodeEditor, event: monaco.editor.IPasteEvent) => {
      const clipboardData = event.clipboardEvent?.clipboardData;
      if (clipboardData && canBeUsedForImagesRef.current) {
        const items = clipboardData.items;
        for (let i = 0; i < items.length; i++) {
          const item = items[i];
          if (item.type.indexOf('image') !== -1) {
            const blob = item.getAsFile();
            if (blob) {
              const reader = new FileReader();
              reader.onload = e => {
                const img = new Image();
                img.onload = () => {
                  const canvas = document.createElement('canvas');
                  const ctx = canvas.getContext('2d');
                  if (ctx) {
                    canvas.width = img.width;
                    canvas.height = img.height;
                    ctx.drawImage(img, 0, 0);
                    const jpegDataUrl = canvas.toDataURL('image/jpeg', 0.8); // Convert to JPEG with 80% quality
                    setBase64Images(prevImages => [...prevImages, jpegDataUrl]);
                  }
                };
                img.src = e.target?.result as string;
              };
              reader.readAsDataURL(blob);
            }
          }
        }
      }
    },
    [canBeUsedForImagesRef]
  );

  useEffect(() => {
    base64ImagesRef.current = base64Images;
  }, [base64Images]);

  // Web search ("agent mode"): the model may search the web and read pages before answering.
  // Reading the notebook and the environment is local and quick, so it starts on. Searching the
  // web goes out to other people's servers and takes seconds, so that one is the user's choice.
  const [agentTools, setAgentTools] = useState<IAgentTools>(() => ({
    notebook: readAgentPref('pretzel-agent-notebook') !== 'false',
    environment: readAgentPref('pretzel-agent-environment') !== 'false',
    web: readAgentPref('pretzel-agent-enabled') === 'true'
  }));
  const [agentApproval, setAgentApproval] = useState<AgentApproval>(() => {
    const saved = readAgentPref('pretzel-agent-approval');
    return saved === 'ask' || saved === 'auto' || saved === 'changes' ? saved : 'changes';
  });
  const agentEnabled = agentTools.notebook || agentTools.environment || agentTools.web;
  // What the agent is doing right now, shown in place of "Generating AI response..."
  const [agentStatus, setAgentStatus] = useState('');
  const [pendingApproval, setPendingApproval] = useState<{
    label: string;
    preview: IToolPreview | null;
    /** True for the calls that ask every time — installing, and running a cell that installs. */
    alwaysAsks: boolean;
    resolve: (allowed: boolean) => void;
  } | null>(null);
  // Set when the user chooses "Accept and run", and acted on once the tool has finished
  const runAfterRef = useRef<number | null>(null);

  /**
   * The folder whose settings these are.
   *
   * "Always allow" is a decision about the work in front of you, not about every notebook you
   * will ever open, so it is remembered against the folder the notebook is in and nowhere else.
   */
  const notebookFolder = (): string => {
    const path = notebookTracker?.currentWidget?.context?.path ?? '';
    const folder = path.includes('/') ? path.slice(0, path.lastIndexOf('/')) : '';
    return folder || 'this folder';
  };
  const alwaysKey = () => `pretzel-agent-always:${notebookFolder()}`;
  // localStorage changing is not something React can see, so the menu is told to look again
  const [alwaysTick, setAlwaysTick] = useState(0);
  const alwaysAllowedHere = (): boolean => {
    try {
      return localStorage.getItem(alwaysKey()) === 'true';
    } catch {
      return false;
    }
  };
  // Tool calling needs a provider that supports it; Ollama is the one wired up so far
  // Tool calling needs a provider and a model that can do it. The model is asked once, when it
  // changes, so a model that cannot use tools quietly gets the ordinary chat instead of an error.
  const [modelDoesTools, setModelDoesTools] = useState(false);
  const providerDoesTools = aiChatModelProvider === 'Ollama' && !!ollamaBaseUrl;
  const agentSupported = providerDoesTools && modelDoesTools;
  useEffect(() => {
    let current = true;
    if (!providerDoesTools || !aiChatModelString) {
      setModelDoesTools(false);
      return;
    }
    ollamaModelSupportsTools(
      { mode: ollamaMode || 'local', baseUrl: ollamaBaseUrl || '', apiKey: ollamaApiKey || '' },
      aiChatModelString
    )
      .then(can => {
        if (current) {
          setModelDoesTools(can);
        }
      })
      .catch(() => {
        if (current) {
          setModelDoesTools(false);
        }
      });
    return () => {
      current = false;
    };
  }, [providerDoesTools, aiChatModelString, ollamaBaseUrl, ollamaMode, ollamaApiKey]);

  // The editor's Enter handler is registered once, when the editor mounts, so it keeps the state
  // from that first render. Refs give the send path the current choices instead of the old ones.
  const agentEnabledRef = useRef(agentEnabled);
  const agentSupportedRef = useRef(agentSupported);
  const agentToolsRef = useRef(agentTools);
  const agentApprovalRef = useRef(agentApproval);
  const pendingApprovalRef = useRef(pendingApproval);
  useEffect(() => {
    agentEnabledRef.current = agentEnabled;
    agentSupportedRef.current = agentSupported;
    agentToolsRef.current = agentTools;
  }, [agentEnabled, agentSupported, agentTools]);
  useEffect(() => {
    agentApprovalRef.current = agentApproval;
  }, [agentApproval]);
  useEffect(() => {
    pendingApprovalRef.current = pendingApproval;
  }, [pendingApproval]);

  // Steps stay in the transcript so a saved chat still shows where its answer came from.
  // A finished step needs no line of its own: the one written when it started already says it.
  const agentStepLine = (step: IAgentStep): string => {
    if (step.status === 'running') {
      return `\n\n> _${step.label}…_\n\n`;
    }
    if (step.status === 'error') {
      return `\n\n> _${step.label} — failed: ${step.detail}_\n\n`;
    }
    if (step.status === 'skipped') {
      return `\n\n> _${step.label} — skipped_\n\n`;
    }
    return '';
  };

  /** The tools the AI may reach for right now, following the menu next to the send button. */
  const toolsForRun = () => {
    const choice = agentToolsRef.current;
    return [
      ...(choice.notebook ? createNotebookTools({ tracker: notebookTracker }) : []),
      ...(choice.environment
        ? createEnvTools({ tracker: notebookTracker, onInstalled: () => forgetEnvironment() })
        : []),
      ...(choice.web ? webTools : [])
    ];
  };

  /** Everything the model should know about where it is working, for this run. */
  const guidanceForRun = async (userText: string): Promise<string> => {
    const choice = agentToolsRef.current;
    // Before anything general: what the question itself names, looked up in this kernel. It is
    // the most specific thing we know, and a long system message is read from the top.
    const mentioned = choice.environment ? await mentionNote(notebookTracker, userText) : '';
    const parts = [TOOL_GUIDANCE, OBEDIENCE_GUIDANCE, ...(mentioned ? [mentioned] : [])];
    if (choice.notebook) {
      parts.push(NOTEBOOK_STATE_GUIDANCE);
    }
    if (choice.environment) {
      parts.push(ENVIRONMENT_GUIDANCE);
    }
    if (choice.notebook || choice.environment) {
      parts.push(DISPLAY_GUIDANCE);
    }
    if (choice.web) {
      parts.push(WEB_GUIDANCE);
    }
    const environment = choice.environment ? await environmentContext(notebookTracker) : '';
    if (environment) {
      parts.push(`This notebook is running in:\n${environment}`);
    }
    return parts.join('\n\n');
  };

  /**
   * Whether this particular call waits for a click.
   *
   * Looking something up and rewriting a cell are not the same kind of act, so the middle
   * setting tells them apart: read freely, ask before anything changes.
   */
  const needsApproval = (tool: IAgentTool, args: any): boolean => {
    if (tool.alwaysAsk || tool.alwaysAskFor?.(args)) {
      return true;
    }
    // "Always allow in this folder" covers changes, never installs — those are caught above
    if (alwaysAllowedHere()) {
      return false;
    }
    const mode = agentApprovalRef.current;
    return mode === 'ask' ? true : mode === 'changes' ? tool.risk === 'write' : false;
  };

  const runAgent = async (
    formattedMessages: any[],
    signal: AbortSignal,
    topSimilarities: string[],
    activeCellCode: string,
    selectedCode: string
  ) => {
    const connection = { mode: ollamaMode || 'local', baseUrl: ollamaBaseUrl || '', apiKey: ollamaApiKey || '' };

    // The same notebook context the normal chat adds, so answers still know about your cells
    const lastMessage = formattedMessages[formattedMessages.length - 1];
    const asText = (content: any) => (Array.isArray(content) ? content[0]?.text ?? '' : content);
    const question = await generateChatPrompt(
      asText(lastMessage.content),
      setReferenceSource,
      notebookTracker,
      topSimilarities,
      activeCellCode,
      selectedCode
    );
    const messages = [
      { role: 'system', content: `${CHAT_SYSTEM_MESSAGE}\n\n${await guidanceForRun(asText(lastMessage.content))}` },
      // Images aren't passed on: tool calling and images can't be combined in one Ollama request
      ...formattedMessages.slice(1, -1).map(msg => ({ role: msg.role, content: asText(msg.content) })),
      { role: 'user', content: question }
    ];

    try {
      await runOllamaAgent({
        connection,
        model: aiChatModelString,
        messages,
        tools: toolsForRun(),
        signal,
        // Editing and running cells takes more turns than answering a question does
        maxSteps: agentToolsRef.current.notebook ? 18 : DEFAULT_MAX_STEPS,
        onText: renderChat,
        onStep: step => {
          setAgentStatus(step.status === 'running' ? step.label : '');
          const line = agentStepLine(step);
          if (line) {
            renderChat(line);
          }
          // "Accept and run" waits for the edit to be in the cell before running it
          if (step.status === 'done' && runAfterRef.current !== null) {
            const index = runAfterRef.current;
            runAfterRef.current = null;
            void runCellNow(notebookTracker, index);
          }
        },
        approve: (tool, args) =>
          needsApproval(tool, args)
            ? new Promise<boolean>(resolve =>
                setPendingApproval({
                  label: tool.label(args),
                  // Built before the tool runs, so "before" is still the cell as it stands
                  preview: tool.preview?.(args) ?? null,
                  alwaysAsks: !!(tool.alwaysAsk || tool.alwaysAskFor?.(args)),
                  resolve
                })
              )
            : Promise.resolve(true)
      });
    } finally {
      setAgentStatus('');
      setPendingApproval(null);
    }
    setIsAiGenerating(false);
    setReferenceSource('');
  };

  const onSend = async (editorValueFromEvent = editorValue) => {
    if (editorValueFromEvent.trim() === '' || isAiGenerating) {
      return;
    }
    setIsAiGenerating(true);
    posthog.capture('prompt_chat', { property: posthogPromptTelemetry ? editorValueFromEvent : 'no_telemetry' });
    const inputMarkdown = editorValueFromEvent.replace(/\n/g, '  \n');
    let activeCellCode: string = '';
    let embeddings: Embedding[] = [];
    let selectedCode: string = '';
    if (notebookTracker && notebookTracker.currentWidget) {
      activeCellCode = notebookTracker?.activeCell?.model?.sharedModel?.source || '';
      try {
        embeddings = await readEmbeddings(notebookTracker, app, aiClient, aiChatModelProvider);
      } catch (error) {
        // Similar cells are extra context: the question is still sent without them
        console.error('Could not read the notebook embeddings:', error);
      }
      selectedCode = getSelectedCode(notebookTracker).extractedCode;
    }

    const newMessage = {
      id: String(messages.length + 1),
      // we need to use a Ref here because of the closure created by handleEditorDidMount
      // that meant that when we used shortcuts, the updates state was not accessed
      content:
        base64ImagesRef.current.length > 0
          ? [
              { type: 'text', text: inputMarkdown },
              ...base64ImagesRef.current.map(base64Image => ({
                type: 'image',
                data: base64Image
              }))
            ]
          : inputMarkdown,
      role: 'user'
    };

    setMessages(prevMessages => {
      const updatedMessages = [...prevMessages, newMessage as IMessage];

      const formattedMessages = [
        {
          role: 'system',
          content: CHAT_SYSTEM_MESSAGE
        },
        ...withoutFailedReplies(updatedMessages).map(msg => ({
          role: msg.role,
          content: msg.content
        }))
      ];

      const controller = new AbortController();
      let signal = controller.signal;
      setStopGeneration(() => () => controller.abort());

      (async () => {
        // Even without tools, an answer written for the wrong Python is worse than no answer
        const environment = await environmentContext(notebookTracker);
        // A model with no tools cannot look a library up, so the lookup has to come to it
        const mentioned = await mentionNote(notebookTracker, editorValueFromEvent);
        formattedMessages[0].content = [
          CHAT_SYSTEM_MESSAGE,
          OBEDIENCE_GUIDANCE,
          mentioned,
          DISPLAY_GUIDANCE,
          ENVIRONMENT_GUIDANCE,
          environment ? `This notebook is running in:\n${environment}` : ''
        ]
          .filter(Boolean)
          .join('\n\n');

        const topSimilarities = await getTopSimilarities(
          editorValueFromEvent,
          embeddings,
          5,
          aiClient,
          aiChatModelProvider,
          'no-match-id',
          codeMatchThreshold
        );

        if (agentEnabledRef.current && agentSupportedRef.current) {
          await runAgent(formattedMessages, signal, topSimilarities, activeCellCode, selectedCode);
          return;
        }

        await chatAIStream({
          aiChatModelProvider,
          aiChatModelString,
          openAiApiKey,
          openAiBaseUrl,
          azureBaseUrl,
          azureApiKey,
          deploymentId,
          mistralApiKey,
          anthropicApiKey,
          ollamaBaseUrl,
          ollamaMode,
          ollamaApiKey,
          groqApiKey,
          renderChat,
          messages: formattedMessages,
          topSimilarities,
          activeCellCode,
          selectedCode,
          setReferenceSource,
          setIsAiGenerating,
          signal,
          notebookTracker
        });
      })().catch(error => showChatError(error, signal));

      return updatedMessages;
    });

    setEditorValue('');
    setBase64Images([]); // Clear images after sending
  };

  const onSendWithoutContext = async (editorValueFromEvent = editorValue) => {
    if (editorValueFromEvent.trim() === '' || isAiGenerating) {
      return;
    }
    setIsAiGenerating(true);
    posthog.capture('prompt_chat_without_context', {
      property: posthogPromptTelemetry ? editorValueFromEvent : 'no_telemetry'
    });
    const inputMarkdown = editorValueFromEvent.replace(/\n/g, '  \n');

    const newMessage = {
      id: String(messages.length + 1),
      content:
        base64ImagesRef.current.length > 0
          ? [
              { type: 'text', text: inputMarkdown },
              ...base64ImagesRef.current.map(base64Image => ({
                type: 'image',
                data: base64Image
              }))
            ]
          : inputMarkdown,
      role: 'user'
    };

    setMessages(prevMessages => {
      const updatedMessages = [...prevMessages, newMessage as IMessage];

      const formattedMessages = [
        {
          role: 'system',
          content: CHAT_SYSTEM_MESSAGE
        },
        ...withoutFailedReplies(updatedMessages).map(msg => ({
          role: msg.role,
          content: msg.content
        }))
      ];

      const controller = new AbortController();
      let signal = controller.signal;
      setStopGeneration(() => () => controller.abort());

      (async () => {
        // "Without context" means without your code, not without knowing which Python this is
        const environment = await environmentContext(notebookTracker);
        // A model with no tools cannot look a library up, so the lookup has to come to it
        const mentioned = await mentionNote(notebookTracker, editorValueFromEvent);
        formattedMessages[0].content = [
          CHAT_SYSTEM_MESSAGE,
          OBEDIENCE_GUIDANCE,
          mentioned,
          DISPLAY_GUIDANCE,
          ENVIRONMENT_GUIDANCE,
          environment ? `This notebook is running in:\n${environment}` : ''
        ]
          .filter(Boolean)
          .join('\n\n');

        if (agentEnabledRef.current && agentSupportedRef.current) {
          await runAgent(formattedMessages, signal, [], '', '');
          return;
        }

        await chatAIStream({
          aiChatModelProvider,
          aiChatModelString,
          openAiApiKey,
          openAiBaseUrl,
          azureBaseUrl,
          azureApiKey,
          deploymentId,
          mistralApiKey,
          anthropicApiKey,
          ollamaBaseUrl,
          ollamaMode,
          ollamaApiKey,
          groqApiKey,
          renderChat,
          messages: formattedMessages,
          topSimilarities: [],
          activeCellCode: '',
          selectedCode: '',
          setReferenceSource,
          setIsAiGenerating,
          signal,
          notebookTracker
        });
      })().catch(error => showChatError(error, signal));

      return updatedMessages;
    });

    setEditorValue('');
    setBase64Images([]); // Clear images after sending
  };

  // A failed request says why in the chat, instead of staying on "Generating AI response..."
  const showChatError = (error: any, signal: AbortSignal) => {
    if (signal.aborted) {
      return; // stopped with Cancel
    }
    console.error('AI chat request failed:', error);
    const reason = describeChatError(error, aiChatModelProvider, aiChatModelString);
    setMessages(prevMessages => {
      const lastMessage = prevMessages[prevMessages.length - 1];
      if (lastMessage.role === 'assistant') {
        // Part of the reply came through before the error
        return [
          ...prevMessages.slice(0, -1),
          { ...lastMessage, content: `${lastMessage.content}\n\nERROR: ${reason}`, error: true }
        ];
      }
      return [
        ...prevMessages,
        {
          id: String(prevMessages.length + 1),
          role: 'assistant',
          content: `ERROR: ${reason} Your message is back in the box below, so you can send it again.`,
          error: true
        }
      ];
    });
    setReferenceSource('');
    setIsAiGenerating(false);
  };

  useEffect(() => {
    // When a reply fails before any of it arrives, put the question back in the box to send it again (e.g. with
    // another model). Also after the panel is rebuilt for a model switch.
    const lastMessage = messages[messages.length - 1];
    const question = messages[messages.length - 2];
    const failedBeforeAnswering =
      isErrorReply(lastMessage) && (lastMessage.content as string).startsWith('ERROR: ') && question?.role === 'user';
    if (!isAiGenerating && failedBeforeAnswering && !openChatRef.current.draft.trim()) {
      const content: any = question.content;
      const text = Array.isArray(content) ? content.find(item => item.type === 'text')?.text ?? '' : content;
      setEditorValue(text.replace(/ {2}\n/g, '\n'));
      if (Array.isArray(content)) {
        setBase64Images(content.filter(item => item.type === 'image').map(item => item.data));
      }
    }
  }, [isAiGenerating]);

  /**
   * What each button on the approval card does.
   *
   * Accepting and rejecting are the obvious two. "Accept and run" waits for the edit to land
   * before running the cell. "Always allow" is remembered for this folder only. "Edit prompt"
   * stops the run and puts the message back in the box, because the fastest fix for a wrong
   * change is usually a better question.
   */
  const handleApproval = (choice: ApprovalChoice) => {
    const pending = pendingApproval;
    if (!pending) {
      return;
    }
    setPendingApproval(null);
    if (choice === 'always') {
      try {
        localStorage.setItem(alwaysKey(), 'true');
      } catch {
        // A browser that will not remember it just asks again next time
      }
      setAlwaysTick(tick => tick + 1);
      pending.resolve(true);
      return;
    }
    if (choice === 'accept-run') {
      runAfterRef.current = pending.preview?.index ?? null;
      pending.resolve(true);
      return;
    }
    if (choice === 'edit') {
      pending.resolve(false);
      const question = [...messages].reverse().find(message => message.role === 'user');
      const content: any = question?.content;
      const text = Array.isArray(content) ? content.find((item: any) => item.type === 'text')?.text ?? '' : content;
      if (text) {
        setEditorValue(String(text).replace(/ {2}\n/g, '\n'));
      }
      cancelGeneration();
      editorRef.current?.focus();
      return;
    }
    pending.resolve(choice === 'accept');
  };

  const cancelGeneration = () => {
    posthog.capture('prompt_chat cancel generation');
    // A tool waiting for Allow/Skip would otherwise keep the run alive
    pendingApprovalRef.current?.resolve(false);
    setPendingApproval(null);
    setAgentStatus('');
    setIsAiGenerating(false);
    stopGeneration();
    setReferenceSource('');
  };

  const renderChat = (chunk: string) => {
    setMessages(prevMessages => {
      const updatedMessages = [...prevMessages];
      const lastMessage = updatedMessages[updatedMessages.length - 1];

      if (lastMessage.role === 'user') {
        const aiMessage = {
          id: String(updatedMessages.length + 1),
          content: chunk,
          role: 'assistant'
        };
        updatedMessages.push(aiMessage as IMessage);
      } else if (lastMessage.role === 'assistant') {
        lastMessage.content += chunk;
      }
      return updatedMessages;
    });
  };

  const clearChat = useCallback(() => {
    setMessages(initialMessage);
    setChatIndex(chatHistoryRef.current.length);
    setBase64Images([]);
    posthog.capture('Chat Cleared', {
      chatLength: messages.length
    });
    editorRef.current?.focus();
  }, [messages.length]);

  useEffect(() => {
    clearChatRef.current = clearChat;
  }, [clearChat]);

  const restoreChat = useCallback((direction: number) => {
    setChatIndex(prevIndex => {
      const newIndex = prevIndex + direction;
      const currentChatHistory = chatHistoryRef.current;
      if (direction === 1 && newIndex === currentChatHistory.length) {
        clearChatRef.current();
        return currentChatHistory.length;
      } else if (newIndex >= 0 && newIndex < currentChatHistory.length) {
        setMessages(currentChatHistory[newIndex]);
        posthog.capture('Chat History Restored', {
          direction: direction
        });
        return newIndex;
      }
      return prevIndex;
    });
  }, []);

  const openChatFromHistory = (index: number) => {
    setHistoryMenuAnchor(null);
    setMessages(chatHistory[index]);
    setChatIndex(index);
    posthog.capture('Chat History Restored', { method: 'menu' });
  };

  // Changes one saved chat in chat_history.json and returns the saved chats. The file is read again first,
  // and nothing is changed if that chat moved in the meantime (e.g. a chat was saved from another browser tab)
  const updateSavedChat = async (index: number, change: (chats: IMessage[][]) => void) => {
    const notebook = notebookTracker?.currentWidget;
    if (!notebook?.model) {
      return null;
    }
    const chatHistoryPath = getChatHistoryPath(notebook.context.path);
    try {
      const file = await app.serviceManager.contents.get(chatHistoryPath);
      const chats: IMessage[][] = JSON.parse(file.content);
      if (!isSameChat(chats[index], chatHistory[index])) {
        setChatHistory(chats);
        return null;
      }
      change(chats);
      await app.serviceManager.contents.save(chatHistoryPath, {
        type: 'file',
        format: 'text',
        content: JSON.stringify(chats)
      });
      setChatHistory(chats);
      return chats;
    } catch (error) {
      console.error('Error updating chat history:', error);
      return null;
    }
  };

  const renameChat = async (index: number, name: string) => {
    setHistoryMenuAction(null);
    const chat = chatHistory[index];
    const newName = name.replace(/\s+/g, ' ').trim();
    // An empty name (or the first question itself) goes back to naming the chat after its first question
    const chatTitle = newName && newName !== getFirstQuestion(chat) ? newName : undefined;
    if (chatTitle === chat[0]?.chatTitle) {
      return;
    }
    if (await updateSavedChat(index, chats => (chats[index] = withChatTitle(chats[index], chatTitle)))) {
      posthog.capture('Chat Renamed');
    }
  };

  const deleteChat = async (index: number) => {
    setHistoryMenuAction(null);
    const chats = await updateSavedChat(index, chats => chats.splice(index, 1));
    if (!chats) {
      focusAfterDeleteRef.current = null;
      return;
    }
    posthog.capture('Chat Deleted');
    if (index === chatIndex) {
      // The open chat was deleted: start a new one
      setMessages(initialMessage);
      setChatIndex(chats.length);
    } else if (index < chatIndex) {
      setChatIndex(chatIndex - 1);
    }
  };

  useEffect(() => {
    // Runs after the list is redrawn, so it wins over the menu moving focus to the open chat
    const target = focusAfterDeleteRef.current;
    focusAfterDeleteRef.current = null;
    if (target?.list.isConnected) {
      const rows = target.list.querySelectorAll<HTMLElement>('li[role="menuitem"]:not(.Mui-disabled)');
      (rows[Math.min(target.position, rows.length - 1)] ?? target.list).focus();
    }
  }, [chatHistory]);

  const handleEditorDidMount = useCallback(
    (editor: monaco.editor.IStandaloneCodeEditor, monaco: Monaco) => {
      editorRef.current = editor;
      if (globalState.openChat?.focusInput) {
        globalState.openChat.focusInput = false;
        editor.focus();
      }
      monaco.editor.setTheme(themeManager?.theme?.includes('Light') ? 'vs' : 'vs-dark');

      if (!globalState.isMonacoRegistered) {
        // Register the completion provider for Markdown
        monaco.languages.registerCompletionItemProvider('markdown', {
          triggerCharacters: ['@'],
          provideCompletionItems: completionFunctionProvider
        });

        // remove cmd+k shortcut
        monaco.editor.addKeybindingRule({
          keybinding: monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyK,
          command: null
        });
        if (themeManager) {
          themeManager.themeChanged.connect((_, theme) => {
            const currentTheme = theme.newValue.includes('Light') ? 'vs' : 'vs-dark';
            monaco.editor.setTheme(currentTheme);
          });
        }

        globalState.isMonacoRegistered = true;
      }

      editor.onDidPaste(e => {
        handlePaste(editor, e);
      });

      editor.onKeyDown((event: monaco.IKeyboardEvent) => {
        // Check if autocomplete widget is visible
        const isAutocompleteWidgetVisible = () => {
          const editorElement = editor.getContainerDomNode();
          const suggestWidget = editorElement.querySelector('.editor-widget.suggest-widget.visible');
          return suggestWidget !== null && suggestWidget.getAttribute('monaco-visible-content-widget') === 'true';
        };

        if (isAutocompleteWidgetVisible()) {
          // Let Monaco handle the key events when autocomplete is open
          return;
        }

        if (event.keyCode === monaco.KeyCode.Enter && !event.shiftKey) {
          event.preventDefault();
          const currentValue = editor.getValue();
          if ((isMac && event.altKey) || (!isMac && event.altKey)) {
            onSendWithoutContext(currentValue);
          } else {
            onSend(currentValue);
          }
        }

        if (event.keyCode === monaco.KeyCode.Escape) {
          event.preventDefault();
          if (isAiGenerating) {
            cancelGeneration();
          } else {
            notebookTracker?.activeCell?.editor?.focus();
          }
        }
        // Cmd + Esc should clear the chat
        if ((event.ctrlKey || event.metaKey) && event.keyCode === monaco.KeyCode.Escape && !isAiGenerating) {
          event.preventDefault();
          clearChatRef.current();
        }
        // Navigate chat history with Cmd+Shift+, and Cmd+Shift+. (or Ctrl+Shift on Windows)
        if (
          (event.ctrlKey || event.metaKey) &&
          event.shiftKey &&
          event.keyCode === monaco.KeyCode.Comma &&
          !isAiGenerating
        ) {
          event.preventDefault();
          restoreChat(-1);
        }
        if (
          (event.ctrlKey || event.metaKey) &&
          event.shiftKey &&
          event.keyCode === monaco.KeyCode.Period &&
          !isAiGenerating
        ) {
          event.preventDefault();
          restoreChat(1);
        }
      });
    },
    [restoreChat, isAiGenerating, clearChat, onSendWithoutContext, handlePaste]
  );

  const handleEditorChange = (value: string | undefined) => {
    if (value !== undefined) {
      setEditorValue(value);
    }
  };

  const removeImage = useCallback((indexToRemove: number) => {
    setBase64Images(prevImages => prevImages.filter((_, index) => index !== indexToRemove));
    setHoveredImage(null);
    // Reset the file input
    const fileInput = document.getElementById('image-upload') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  }, []);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = e => {
          const img = new Image();
          img.onload = () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            if (ctx) {
              canvas.width = img.width;
              canvas.height = img.height;
              ctx.drawImage(img, 0, 0);
              const jpegDataUrl = canvas.toDataURL('image/jpeg', 0.8); // Convert to JPEG with 80% quality
              setBase64Images(prevImages => [...prevImages, jpegDataUrl]);
            }
          };
          img.src = e.target?.result as string;
        };
        reader.readAsDataURL(file);
      } else {
        alert('Please upload a valid image file.');
      }
    }
    // Clear the file input after upload
    event.target.value = '';
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Box sx={{ flexGrow: 1, overflowY: 'auto', padding: 2 }}>
        {messages.map((message, index) => (
          <Box key={`message-${index}`} className={isErrorReply(message) ? 'pretzel-chat-error' : undefined}>
            {referenceSource && message.role === 'assistant' && messages[messages.length - 1].id === message.id && (
              <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '8px', marginBottom: '2px' }}>
                <Typography
                  color={'var(--jp-ui-font-color1)'}
                  sx={{
                    fontSize: '1em',
                    marginRight: '4px'
                  }}
                >
                  Using
                </Typography>
                {referenceSource.split(',').map((ref, index) => (
                  <Box
                    key={index}
                    sx={{
                      backgroundColor: 'var(--jp-layout-color2)',
                      borderRadius: '4px',
                      display: 'inline-block',
                      marginLeft: '0px',
                      padding: '2px 6px',
                      marginRight: '4px'
                    }}
                  >
                    <Typography
                      color={'var(--jp-ui-font-color1)'}
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        fontSize: '1em'
                      }}
                    >
                      {ref.trim()}
                    </Typography>
                  </Box>
                ))}
              </Box>
            )}
            <RendermimeMarkdown
              rmRegistry={rmRegistry}
              markdownStr={withLabel(
                message.role === 'user' ? '***You:***' : '***AI:***',
                Array.isArray(message.content) ? message.content[0].text : message.content
              )}
              notebookTracker={notebookTracker}
              role={message.role}
              images={
                Array.isArray(message.content)
                  ? (message.content as Array<any>)
                      .filter((item: any) => item.type === 'image')
                      .map((item: any) => item.data as string)
                  : []
              }
            />
          </Box>
        ))}
        <div ref={messagesEndRef} />
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', padding: 0 }}>
        {hoveredImage && (
          <Box sx={{ marginBottom: 1, marginLeft: 1, marginRight: 1, backgroundColor: 'transparent' }}>
            <img src={hoveredImage} alt="Preview" />
          </Box>
        )}
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, margin: '5px 0 0 10px' }}>
          {base64Images.map((base64Image, index) => (
            <Box
              key={index}
              sx={{
                position: 'relative',
                display: 'inline-block',
                margin: '0 4px 4px 0',
                transition: 'all 0.2s ease-in-out',
                '&:hover': {
                  transform: 'scale(1.05)',
                  '& .delete-icon': {
                    opacity: 1
                  }
                }
              }}
              onMouseEnter={() => setHoveredImage(base64Image)}
              onMouseLeave={() => setHoveredImage(null)}
            >
              <ImagePreview base64Image={base64Image} />
              <Box
                className="delete-icon"
                sx={{
                  position: 'absolute',
                  top: -8,
                  right: -8,
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--jp-layout-color3)',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  cursor: 'pointer',
                  opacity: 0,
                  transition: 'all 0.2s ease-in-out',
                  border: '2px solid var(--jp-layout-color1)',
                  '&:hover': {
                    backgroundColor: 'var(--jp-layout-color4)'
                  }
                }}
                onClick={e => {
                  e.stopPropagation();
                  removeImage(index);
                }}
              >
                <Typography
                  sx={{
                    color: 'var(--jp-ui-font-color1)',
                    fontSize: '16px',
                    fontWeight: 'bold',
                    lineHeight: 1
                  }}
                >
                  ×
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', padding: 1, paddingTop: 0 }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              padding: '6px',
              border: '1px solid var(--jp-border-color1)',
              background: 'var(--vscode-editor-background)',
              height: '100px',
              overflow: 'hidden'
            }}
          >
            <Editor
              defaultLanguage="markdown"
              value={editorValue}
              onChange={handleEditorChange}
              onMount={handleEditorDidMount}
              options={{
                minimap: { enabled: false },
                suggestOnTriggerCharacters: true,
                wordBasedSuggestions: 'off',
                parameterHints: { enabled: false },
                quickSuggestions: {
                  other: false,
                  comments: false,
                  strings: false
                },
                lineNumbers: 'off',
                glyphMargin: false,
                lineDecorationsWidth: 0,
                lineNumbersMinChars: 0,
                folding: false,
                wordWrap: 'on',
                wrappingIndent: 'same',
                automaticLayout: true,
                overviewRulerBorder: false,
                hideCursorInOverviewRuler: true,
                overviewRulerLanes: 0,
                renderLineHighlight: 'none',
                readOnly: isAiGenerating,
                scrollBeyondLastLine: false,
                placeholder:
                  `Ask AI (toggle with: ${keyCombination}).\n` +
                  `Shift + Enter for newline. Esc to jump back to cell.\n` +
                  `${canBeUsedForImages ? `Paste image from clipboard with ${isMac ? 'Cmd+V' : 'Ctrl+V'}.\n` : ''}` +
                  `Code from current cell and other relevant cells\nare available to the AI.`
              }}
            />
          </Box>
          {isAiGenerating ? (
            <div className="chat-working">
              <div className="chat-working-line">
                <button className="remove-button" onClick={cancelGeneration} title="Cancel">
                  Cancel <span style={{ fontSize: '0.8em' }}>Esc</span>
                </button>
                <span className="chat-working-status">{agentStatus || 'Generating AI response...'}</span>
              </div>
              {pendingApproval && (
                // The whole request is shown, not just "a tool": the answer to "may I run cell 4"
                // and to "may I install gymnasium" should never be given to the wrong question.
                <ApprovalCard
                  label={pendingApproval.label}
                  preview={pendingApproval.preview}
                  folder={notebookFolder()}
                  canAlwaysAllow={!pendingApproval.alwaysAsks}
                  onChoose={choice => handleApproval(choice)}
                />
              )}
            </div>
          ) : (
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
              <div className="submit-button-container">
                <button className="pretzelInputSubmitButton" onClick={() => onSend(editorValue)} title="Submit ↵">
                  Submit <span style={{ fontSize: '0.8em' }}>↵</span>
                </button>
                <div className="tooltip">
                  Submit the message to the AI
                  <br />
                  Shortcut: <strong>Enter</strong>
                  <br />
                  Submit without context: <strong>{isMac ? 'Option' : 'Alt'}+Enter</strong>
                </div>
              </div>
              <div className="history-button-container">
                <button
                  className="pretzelInputSubmitButton"
                  onClick={e => {
                    setHistoryMenuAction(null);
                    setHistoryMenuAnchor(e.currentTarget);
                  }}
                  title="Chat history"
                  aria-label="Chat history"
                >
                  <HistoryIcon />
                </button>
                <div className="tooltip">
                  {chatIndex < chatHistory.length
                    ? `Chat ${chatIndex + 1} of ${chatHistory.length}`
                    : `New chat · ${chatHistory.length} saved`}
                  <br />
                  New chat: <strong>{isMac ? 'Cmd+Esc' : 'Ctrl+Esc'}</strong>
                  <br />
                  Previous / next chat: <strong>{historyPrevKeyCombination}</strong> /{' '}
                  <strong>{historyNextKeyCombination}</strong>
                </div>
              </div>
              <Menu
                anchorEl={historyMenuAnchor}
                open={!!historyMenuAnchor}
                onClose={() => setHistoryMenuAnchor(null)}
                // Back to typing once the menu is gone (focus can't leave the menu while it's open)
                disableRestoreFocus
                TransitionProps={{ onExited: () => editorRef.current?.focus() }}
                anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
                transformOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                PaperProps={{
                  sx: {
                    width: 320,
                    maxHeight: 400,
                    backgroundColor: 'var(--jp-layout-color1)',
                    color: 'var(--jp-ui-font-color1)',
                    border: '1px solid var(--jp-border-color1)'
                  }
                }}
                MenuListProps={{ dense: true }}
              >
                <MenuItem
                  className="chat-history-new"
                  selected={chatIndex >= chatHistory.length}
                  onClick={() => {
                    setHistoryMenuAnchor(null);
                    clearChat();
                  }}
                  sx={{
                    gap: 1,
                    color: 'var(--jp-ui-font-color1)',
                    '&:hover': { backgroundColor: 'var(--jp-layout-color2)' }
                  }}
                >
                  <AddIcon fontSize="small" sx={{ color: 'inherit' }} />
                  <Typography sx={{ fontSize: '0.875rem', color: 'inherit', flexGrow: 1 }}>New chat</Typography>
                  <Typography sx={{ fontSize: '0.75rem', color: 'inherit', opacity: 0.75 }}>
                    {isMac ? '⌘Esc' : 'Ctrl+Esc'}
                  </Typography>
                </MenuItem>
                <ListSubheader
                  style={{ backgroundColor: 'var(--jp-layout-color1)', color: 'var(--jp-ui-font-color2)' }}
                >
                  Recent chats ({chatHistory.length})
                </ListSubheader>
                {chatHistory.length === 0 && <MenuItem disabled>Your chats will show up here.</MenuItem>}
                {chatHistory
                  .map((chat, index) => ({ chat, index }))
                  .reverse()
                  .map(({ chat, index }) => {
                    const isRenaming = historyMenuAction?.type === 'rename' && historyMenuAction.index === index;
                    const isDeleting = historyMenuAction?.type === 'delete' && historyMenuAction.index === index;
                    return (
                      <MenuItem
                        key={index}
                        selected={index === chatIndex}
                        onClick={() => !isRenaming && !isDeleting && openChatFromHistory(index)}
                        onKeyDown={e => {
                          // Shortcuts on a chat picked with the arrow keys: F2 renames it, Delete removes it
                          if (e.target !== e.currentTarget) {
                            return;
                          }
                          if (e.key === 'F2') {
                            e.preventDefault();
                            setHistoryMenuAction({ type: 'rename', index });
                          } else if (e.key === 'Delete' || e.key === 'Backspace') {
                            e.preventDefault();
                            setHistoryMenuAction({ type: 'delete', index });
                          }
                        }}
                        disableRipple={isRenaming || isDeleting}
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 1,
                          color: 'var(--jp-ui-font-color1)',
                          '&:hover': { backgroundColor: 'var(--jp-layout-color2)' },
                          // Rename and delete buttons show up when pointing at a chat or moving to it with the keyboard
                          '& .chat-history-actions': { opacity: 0 },
                          '&:hover .chat-history-actions, &.Mui-focusVisible .chat-history-actions': { opacity: 1 },
                          '@media (hover: none)': { '& .chat-history-actions': { opacity: 1 } }
                        }}
                      >
                        <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                          {isRenaming ? (
                            <ChatNameInput
                              initialName={chat[0]?.chatTitle || getFirstQuestion(chat)}
                              onSave={name => renameChat(index, name)}
                              onCancel={() => setHistoryMenuAction(null)}
                            />
                          ) : (
                            <Typography noWrap sx={{ fontSize: '0.875rem', color: 'inherit' }}>
                              {getChatTitle(chat)}
                            </Typography>
                          )}
                          {isDeleting ? (
                            <Box
                              sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '6px',
                                marginTop: '4px',
                                '& button': { height: '22px', lineHeight: '22px', padding: '0 8px', cursor: 'pointer' }
                              }}
                              onClick={e => e.stopPropagation()}
                              onKeyDown={e => {
                                // Keep keys here: the menu would use them to jump between chats or to close
                                e.stopPropagation();
                                if (e.key === 'Escape') {
                                  e.preventDefault();
                                  e.currentTarget.closest('li')?.focus();
                                  setHistoryMenuAction(null);
                                }
                              }}
                            >
                              <Typography sx={{ fontSize: '0.75rem', color: 'inherit', flexGrow: 1 }}>
                                Delete this chat?
                              </Typography>
                              <button
                                className="jp-mod-styled jp-mod-reject"
                                onClick={e => {
                                  e.currentTarget.closest('li')?.focus();
                                  setHistoryMenuAction(null);
                                }}
                              >
                                Cancel
                              </button>
                              <button
                                className="jp-mod-styled jp-mod-warn"
                                autoFocus
                                onClick={e => {
                                  const list = e.currentTarget.closest('ul');
                                  const row = e.currentTarget.closest('li');
                                  if (list && row) {
                                    // Keep focus in the menu while saving, then give it to the chat taking this one's place
                                    list.focus();
                                    focusAfterDeleteRef.current = {
                                      list,
                                      position: Array.from(list.querySelectorAll('li[role="menuitem"]')).indexOf(row)
                                    };
                                  }
                                  deleteChat(index);
                                }}
                              >
                                Delete
                              </button>
                            </Box>
                          ) : (
                            <Typography sx={{ fontSize: '0.75rem', color: 'inherit', opacity: 0.75 }}>
                              Chat {index + 1} · {chat.length - 1} {chat.length === 2 ? 'message' : 'messages'}
                              {index === chatIndex ? ' · open now' : ''}
                            </Typography>
                          )}
                        </Box>
                        {!isRenaming && !isDeleting && (
                          <Box
                            className="chat-history-actions"
                            sx={{ display: 'flex', flexShrink: 0 }}
                            onMouseDown={e => e.stopPropagation()}
                          >
                            <IconButton
                              size="small"
                              title="Rename (F2)"
                              aria-label="Rename chat"
                              sx={{ color: 'inherit' }}
                              onClick={e => {
                                e.stopPropagation();
                                setHistoryMenuAction({ type: 'rename', index });
                              }}
                            >
                              <EditOutlinedIcon fontSize="small" />
                            </IconButton>
                            <IconButton
                              size="small"
                              title={isMac ? 'Delete (⌫)' : 'Delete (Del)'}
                              aria-label="Delete chat"
                              sx={{ color: 'inherit' }}
                              onClick={e => {
                                e.stopPropagation();
                                setHistoryMenuAction({ type: 'delete', index });
                              }}
                            >
                              <DeleteOutlineIcon fontSize="small" />
                            </IconButton>
                          </Box>
                        )}
                      </MenuItem>
                    );
                  })}
              </Menu>
              {canBeUsedForImages && (
                <div className="upload-image-button-container">
                  <input
                    accept="image/*"
                    style={{ display: 'none' }}
                    id="image-upload"
                    type="file"
                    onChange={handleImageUpload}
                  />
                  <button
                    className="pretzelInputSubmitButton"
                    title="Upload Image"
                    onClick={() => document.getElementById('image-upload')?.click()}
                  >
                    <UploadIcon />
                  </button>
                  <div className="tooltip">
                    Upload an image.
                    <br />
                    Paste image from clipboard with <strong>{isMac ? 'Cmd+V' : 'Ctrl+V'}</strong>
                  </div>
                </div>
              )}
              <AgentButton
                tools={agentTools}
                approval={agentApproval}
                supported={agentSupported}
                unsupportedReason={
                  providerDoesTools
                    ? `${aiChatModelString} cannot use tools. Models that can include gpt-oss and qwen3.`
                    : 'Tools work with Ollama models for now.'
                }
                alwaysAllowed={alwaysTick >= 0 && alwaysAllowedHere()}
                folder={notebookFolder()}
                onClearAlways={() => {
                  try {
                    localStorage.removeItem(alwaysKey());
                  } catch {
                    // Nothing to clear if it could never be stored
                  }
                  setAlwaysTick(tick => tick + 1);
                }}
                onChange={change => {
                  if (change.tools) {
                    setAgentTools(previous => {
                      const updated = { ...previous, ...change.tools };
                      writeAgentPref('pretzel-agent-notebook', String(updated.notebook));
                      writeAgentPref('pretzel-agent-environment', String(updated.environment));
                      writeAgentPref('pretzel-agent-enabled', String(updated.web));
                      return updated;
                    });
                    posthog.capture('Chat Agent Tools Changed', change.tools);
                  }
                  if (change.approval) {
                    setAgentApproval(change.approval);
                    writeAgentPref('pretzel-agent-approval', change.approval);
                  }
                }}
                onClosed={() => editorRef.current?.focus()}
              />
              <ChatModelPicker
                settings={pretzelSettingsJSON}
                provider={aiChatModelProvider}
                model={aiChatModelString}
                onChange={(provider, model) => {
                  focusInputAfterRebuildRef.current = true;
                  posthog.capture('Chat Model Switched', { provider, model });
                  onChatModelChange?.(provider, model);
                }}
                onOpenSettings={() => app.commands.execute('pretzelai:open-settings')}
                onClosed={() => editorRef.current?.focus()}
              />
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
}

export function createChat(props: IChatProps): ReactWidget {
  const widget = ReactWidget.create(<Chat {...props} />);

  widget.id = 'pretzelai::chat';
  widget.title.icon = pretzelIcon;
  widget.title.caption = `Pretzel AI Chat (${keyCombination})`;
  return widget;
}
