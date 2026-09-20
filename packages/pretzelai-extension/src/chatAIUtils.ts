/* eslint-disable camelcase */
/*
 * Copyright (c) Pretzel AI GmbH.
 * This file is part of the Pretzel project and is licensed under the
 * GNU Affero General Public License version 3.
 * See the LICENSE_AGPLv3 file at the root of the project for the full license text.
 * Contributions by contributors listed in the PRETZEL_CONTRIBUTORS file (found at
 * the root of the project) are licensed under AGPLv3.
 */
import { AzureKeyCredential, OpenAIClient } from '@azure/openai';
import { OpenAI } from 'openai';
import { ChatCompletionMessage } from 'openai/resources';
import MistralClient, { Message } from '@mistralai/mistralai';
import { streamAnthropicCompletion } from './utils';
import { OllamaMode, streamOllamaChat } from './ollama';
import Groq from 'groq-sdk';
import { ChatCompletionMessageParam } from 'groq-sdk/resources/chat/completions';
import { processVariables } from './utils';
import { httpError } from './chatErrors';
import { INotebookTracker } from '@jupyterlab/notebook';
import { Dispatch, SetStateAction } from 'react';

export const CHAT_SYSTEM_MESSAGE =
  `You are Pretzel, an assistant working inside a Jupyter notebook. You are an expert in Jupyter Notebooks, Data Science and Data Analysis.

Answering:
- Work out what is actually being asked, then answer exactly that. Do not widen the task or solve problems nobody asked about.
- Cells from the notebook are given to you as context, not as something to rewrite. Never repeat code that already exists there: give only the new or changed code that was asked for, ready to paste into a cell.
- When changing existing code, show the part that changes rather than the whole notebook, and say in one line which cell it belongs in.
- Keep the words around the code short. No summary of the notebook, no restating the question, no explaining code nobody asked about.
- If the request could mean two different things, ask one short question instead of answering both.

Format. Your answer is rendered as markdown in a narrow side panel, so:
- Every piece of code goes in a fenced code block that starts on its own line and names the language (\`\`\`python), and the fence is closed. Code outside a fence is shown as prose, and its comments turn into headings.
- Never put a heading inside code, and never indent code instead of fencing it. Comments stay as # comments inside the fence.
- One short line of explanation before the code is enough. The panel is narrow, so keep lines and tables small. `;

export const generateChatPrompt = async (
  lastContent: string,
  setReferenceSource: Dispatch<SetStateAction<string>>,
  notebookTracker: INotebookTracker | null,
  topSimilarities?: string[],
  activeCellCode?: string,
  selectedCode?: string
) => {
  let processedInput = lastContent;
  let varValues = '';

  if (notebookTracker && notebookTracker.currentWidget) {
    const result = await processVariables(lastContent, notebookTracker);
    processedInput = result.processedInput;
    varValues = result.varValues;
  }

  let output = `${processedInput}\n`;

  if (!selectedCode && !activeCellCode && (!topSimilarities || topSimilarities.length === 0)) {
    setReferenceSource(prev => (prev ? prev : 'No context'));
    output += `My main question is the above. Your goal is to answer my question briefly and don't mention the code unless necessary.\n`;
  }

  if (varValues) {
    output += `\n*ADDITIONAL CONTEXT*\n`;
    output += `\n${varValues}\n`;
    output += `\n*END ADDITIONAL CONTEXT*\n`;
  }

  if (selectedCode || activeCellCode) {
    const referenceSource = selectedCode ? 'Selected code' : 'Current cell';
    setReferenceSource(prev => (prev ? prev + ', ' + referenceSource : referenceSource));

    output += `This is the code I am working on. It is here as context: answer about it, but do not
repeat it back to me unless you are changing it. Keep the answer short and to the point.
\`\`\`python
${selectedCode || activeCellCode}
\`\`\`\n`;
  }

  if (topSimilarities && topSimilarities.length > 0) {
    // setReferenceSource(selectedCode || activeCellCode ? 'Current code, Related cells' : 'Related cells');
    setReferenceSource(prev => (prev ? prev + ', Related cells' : 'Related cells'));
    output += `Other cells from my notebook, for background only. They are already written and
already run: do not include them in your answer, and do not rewrite them unless I ask.
\`\`\`python
${topSimilarities.join('\n```\n```python\n')}
\`\`\`\n`;
  }

  return output;
};

const processMessages = (messages: any[], provider: string, model: string): any[] => {
  const processedMessages: any[] = [];

  for (const message of messages) {
    if (!Array.isArray(message.content)) {
      processedMessages.push(message);
      continue;
    }

    if (provider !== 'OpenAI' && provider !== 'Anthropic' && provider !== 'Pretzel AI') {
      // If the provider doesn't support images, only keep the text content
      const textContent = message.content.find(item => item.type === 'text')?.text || '';
      processedMessages.push({ ...message, content: textContent });
      continue;
    }

    // Process messages for image-supporting models
    let processedContent: any[] = [];
    for (const item of message.content) {
      if (item.type === 'text') {
        processedContent.push({ type: 'text', text: item.text });
      } else if (item.type === 'image') {
        if (provider === 'Anthropic') {
          processedContent.push({
            type: 'image',
            source: {
              type: 'base64',
              media_type: item.data.split(',')[0].split(':')[1].split(';')[0],
              data: item.data.split(',')[1]
            }
          });
        } else if (provider === 'OpenAI' || provider === 'Pretzel AI') {
          processedContent.push({
            type: 'image_url',
            image_url: { url: item.data }
          });
        } else {
          throw new Error('Invalid provider');
        }
      }
    }
    processedMessages.push({ ...message, content: processedContent });
  }
  return processedMessages;
};

export const chatAIStream = async ({
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
  messages,
  topSimilarities,
  activeCellCode,
  selectedCode,
  setReferenceSource,
  setIsAiGenerating,
  signal,
  notebookTracker
}: {
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
  renderChat: (message: string) => void;
  messages: any[]; // types are too complex
  topSimilarities: string[];
  activeCellCode?: string;
  selectedCode?: string;
  setReferenceSource: Dispatch<SetStateAction<string>>;
  setIsAiGenerating: (isGenerating: boolean) => void;
  signal: AbortSignal;
  notebookTracker: INotebookTracker | null;
}): Promise<void> => {
  const lastMessageContent = messages[messages.length - 1].content;

  // FIXME: This should be handled at each provider level, this is a workaround
  if (aiChatModelProvider === 'OpenAI' || aiChatModelProvider === 'Anthropic' || aiChatModelProvider === 'Pretzel AI') {
    if (Array.isArray(lastMessageContent)) {
      setReferenceSource(prevSource => (prevSource ? `${prevSource}, Image` : 'Image'));
    }
  }

  // Process the last message to add context
  const lastMessageText = Array.isArray(lastMessageContent) ? lastMessageContent[0].text : lastMessageContent;
  const lastMessageTextWithInjection = await generateChatPrompt(
    lastMessageText,
    setReferenceSource,
    notebookTracker,
    topSimilarities,
    activeCellCode,
    selectedCode
  );
  const updatedLastMessageContent = Array.isArray(lastMessageContent)
    ? [{ type: 'text', text: lastMessageTextWithInjection }, ...lastMessageContent.slice(1)]
    : lastMessageTextWithInjection;
  const updatedMessages = [...messages.slice(0, -1), { role: 'user', content: updatedLastMessageContent }];
  const processedMessages = processMessages(updatedMessages, aiChatModelProvider, aiChatModelString);

  if (aiChatModelProvider === 'OpenAI' && openAiApiKey && aiChatModelString && messages) {
    const openai = new OpenAI({
      apiKey: openAiApiKey,
      dangerouslyAllowBrowser: true,
      baseURL: openAiBaseUrl ? openAiBaseUrl : undefined
    });

    const stream = await openai.chat.completions.create(
      {
        model: aiChatModelString,
        messages: processedMessages as ChatCompletionMessage[],
        stream: true
      },
      {
        signal
      }
    );
    for await (const chunk of stream) {
      renderChat(chunk.choices[0]?.delta?.content || '');
    }
    setReferenceSource('');
    setIsAiGenerating(false);
  } else if (
    // FIXME : never tested
    aiChatModelProvider === 'Azure' &&
    azureBaseUrl &&
    azureApiKey &&
    deploymentId &&
    aiChatModelString &&
    messages
  ) {
    const client = new OpenAIClient(azureBaseUrl, new AzureKeyCredential(azureApiKey));
    const events = await client.streamChatCompletions(deploymentId, processedMessages as ChatCompletionMessage[]);
    for await (const event of events) {
      for (const choice of event.choices) {
        if (choice.delta?.content) {
          renderChat(choice.delta.content);
        }
      }
    }
    setReferenceSource('');
    setIsAiGenerating(false);
  } else if (aiChatModelProvider === 'Pretzel AI') {
    const response = await fetch('https://api.pretzelai.app/chat/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        messages: processedMessages
      }),
      signal
    });
    if (!response.ok) {
      throw await httpError(response);
    }
    const reader = response!.body!.getReader();
    const decoder = new TextDecoder('utf-8');
    let isReading = true;
    while (isReading) {
      const { done, value } = await reader.read();
      if (done) {
        isReading = false;
        setReferenceSource('');
        setIsAiGenerating(false);
      } else {
        const chunk = decoder.decode(value);
        renderChat(chunk);
      }
    }
  } else if (aiChatModelProvider === 'Mistral' && mistralApiKey && aiChatModelString && messages) {
    const client = new MistralClient(mistralApiKey);

    // Convert messagesWithInjection to the required Message[] type
    const convertedMessages = processedMessages.map(msg => ({
      role: msg.role,
      content: msg.content || ''
    }));

    const chatStream = await client.chatStream({
      model: aiChatModelString,
      messages: convertedMessages as Message[]
    });

    for await (const chunk of chatStream) {
      if (chunk.choices[0].delta.content) {
        renderChat(chunk.choices[0].delta.content);
      }
    }
    setReferenceSource('');
    setIsAiGenerating(false);
  } else if (aiChatModelProvider === 'Anthropic' && anthropicApiKey && aiChatModelString && messages) {
    const filteredMessages = processedMessages.filter((msg, index) => index !== 1);
    const stream = await streamAnthropicCompletion(anthropicApiKey, filteredMessages, aiChatModelString);

    for await (const chunk of stream) {
      if (chunk.choices[0]?.delta?.content) {
        renderChat(chunk.choices[0].delta.content);
      }
    }
    setReferenceSource('');
    setIsAiGenerating(false);
  } else if (aiChatModelProvider === 'Ollama' && ollamaBaseUrl) {
    try {
      const stream = await streamOllamaChat(
        { mode: ollamaMode || 'local', baseUrl: ollamaBaseUrl, apiKey: ollamaApiKey || '' },
        aiChatModelString,
        processedMessages,
        signal
      );
      for await (const chunk of stream) {
        renderChat(chunk);
      }
    } catch (error: any) {
      if (error.name !== 'AbortError') {
        renderChat(`ERROR: ${error.message}`);
      }
    }
    setReferenceSource('');
    setIsAiGenerating(false);
  } else if (aiChatModelProvider === 'Groq' && aiChatModelString && messages) {
    const groq = new Groq({ apiKey: groqApiKey, dangerouslyAllowBrowser: true });
    const stream = await groq.chat.completions.create({
      model: aiChatModelString,
      messages: processedMessages as ChatCompletionMessageParam[],
      stream: true
    });

    for await (const chunk of stream) {
      if (chunk.choices[0]?.delta?.content) {
        renderChat(chunk.choices[0].delta.content);
      }
    }
    setReferenceSource('');
    setIsAiGenerating(false);
  } else {
    renderChat('ERROR: No model provided. Fix your settings in Settings > Pretzel AI Settings');
    setReferenceSource('');
    setIsAiGenerating(false);
  }
};
