/* eslint-disable camelcase */
/*
 * Copyright (c) Pretzel AI GmbH.
 * This file is part of the Pretzel project and is licensed under the
 * GNU Affero General Public License version 3.
 * See the LICENSE_AGPLv3 file at the root of the project for the full license text.
 * Contributions by contributors listed in the PRETZEL_CONTRIBUTORS file (found at
 * the root of the project) are licensed under AGPLv3.
 */
import { OpenAI } from 'openai';
import { Embeddings as AzureEmbeddings } from '@azure/openai/types/openai';
import { OpenAIClient } from '@azure/openai';
import MistralClient, { EmbeddingResponse as MistralEmbeddings } from '@mistralai/mistralai';
import { CreateEmbeddingResponse as OpenAIEmbeddings } from 'openai/resources/embeddings';
import { getCookie, processTaggedVariables } from './utils';
import { ServerConnection } from '@jupyterlab/services';
import { URLExt } from '@jupyterlab/coreutils';
import { INotebookTracker } from '@jupyterlab/notebook';
import { environmentContext, missingImports } from './agent/envTools';
import {
  CODE_DISPLAY_GUIDANCE,
  CODE_ENVIRONMENT_GUIDANCE,
  CODE_FIX_GUIDANCE,
  CODE_OBEDIENCE_GUIDANCE
} from './agent/guidance';

/** The rule every in-cell prompt ends on: what comes back goes straight into a cell. */
const CODE_ONLY =
  '**VERY IMPORTANT**: This code will be run directly in a Jupyter cell. So: Return ONLY RUNNABLE AND VALID python code WITHOUT ANY BACKTICKS.';

/** The top-level modules a piece of Python imports. */
const importedNames = (code: string): string[] => {
  const found = new Set<string>();
  const pattern = /^[ \t]*(?:import[ \t]+([A-Za-z_][\w.]*)|from[ \t]+([A-Za-z_][\w.]*)[ \t]+import)/gm;
  let match = pattern.exec(code);
  while (match) {
    found.add((match[1] || match[2]).split('.')[0]);
    match = pattern.exec(code);
  }
  return [...found].slice(0, 8);
};

/**
 * Add what the model needs to know about this machine to a prompt that asks for code.
 *
 * Without it the model writes for the Python it imagines rather than the one that will run the
 * code, and a missing package turns into an endless rewrite instead of an install.
 */
const withContext = (prompt: string, environment: string, isFix: boolean, missing: string[] = []): string => {
  const blocks = [prompt.replace(CODE_ONLY, '').trimEnd()];
  if (missing.length) {
    blocks.push(
      `*NOT INSTALLED*\nThese modules cannot be imported in this kernel: ${missing.join(', ')}. ` +
        'Say so in a comment at the top rather than writing code that pretends they are there, ' +
        'and do not silently swap in a different library.\n*END NOT INSTALLED*'
    );
  }
  if (environment) {
    blocks.push(`*ENVIRONMENT*\nThis code will run here:\n${environment}\n*END ENVIRONMENT*`);
  }
  blocks.push(CODE_OBEDIENCE_GUIDANCE, CODE_ENVIRONMENT_GUIDANCE, CODE_DISPLAY_GUIDANCE);
  if (isFix) {
    blocks.push(CODE_FIX_GUIDANCE);
  }
  blocks.push(CODE_ONLY);
  return blocks.join('\n\n');
};

export type Embedding = {
  id: string;
  source: string;
  hash: string;
  embedding: number[];
};

export async function generatePrompt(
  userInput: string,
  oldCode: string,
  topSimilarities: string[],
  notebookTracker: INotebookTracker,
  selectedCode: string = '',
  traceback: string = '',
  isInject: boolean = false,
  fixAttempt: number = 1
): Promise<string> {
  userInput = await processTaggedVariables(userInput, notebookTracker);
  const environment = await environmentContext(notebookTracker);
  // A model that cannot see which imports fail here will happily write code around a missing
  // package, which is how people end up fixing the same error for half an hour
  const missing = await missingImports(notebookTracker, importedNames(`${oldCode}\n${selectedCode}`));

  if (selectedCode) {
    return withContext(
      generatePromptEditPartial(userInput, selectedCode, oldCode, topSimilarities),
      environment,
      false,
      missing
    );
  }
  if (traceback) {
    return withContext(
      generatePromptErrorFix(traceback, oldCode, topSimilarities, fixAttempt),
      environment,
      true,
      missing
    );
  }
  if (isInject) {
    return withContext(generatePromptInject(userInput, oldCode, topSimilarities), environment, false, missing);
  }
  if (oldCode) {
    return withContext(generatePromptFullEdit(userInput, oldCode, topSimilarities), environment, false, missing);
  }
  return withContext(generatePromptNew(userInput, oldCode, topSimilarities), environment, false, missing);
}

function generatePromptFullEdit(userInput: string, oldCode: string, topSimilarities: string[]): string {
  const initPrompt =
    'You are a Data Science expert and an expert python programmer. ' +
    'You are helping users edit existing python code in a Jupyter notebook cell. ' +
    'Given existing code and user instructions, you modify the existing code with clean, production quality, working python code. ';

  return `${initPrompt}

The user is in a Jupyter notebook cell that has the following code:
*EXISTING CODE START*
\`\`\`
${oldCode}
\`\`\`
*EXISTING CODE END*

The user wants to modify the existing code according to the following instructions:
${userInput}

${
  topSimilarities.length > 0
    ? `The following code cells ALREADY EXISTS in *OTHER* notebook cells and *MAY* be relevant:
\`\`\`
${topSimilarities.join('\n```\n\n```\n')}
\`\`\`
You *MAY* reference this code from *OTHER* notebook cells to call existing functions or use existing variables.
`
    : ''
}

Modify the EXISTING CODE according to USER INSTRUCTION. Take a deep breath, think step-by-step and respond with the working python code, no explanations.

**VERY IMPORTANT**: This code will be run directly in a Jupyter cell. So: Return ONLY RUNNABLE AND VALID python code WITHOUT ANY BACKTICKS.`;
}

function generatePromptInject(userInput: string, oldCode: string, topSimilarities: string[]): string {
  const initPrompt =
    'You are a Data Science expert and an expert python programmer. ' +
    'You are helping users write python code in a Jupyter notebook cell. ' +
    'Given existing code and user instructions, you write clean, production quality, working python code in the middle of the existing code. ';

  return `${initPrompt}
The user is in a Jupyter notebook cell that has the following code:
*EXISTING CODE START*
\`\`\`
${oldCode}
\`\`\`
*EXISTING CODE END*

The user wants to add some code IN THE MIDDLE OF THE EXISTING CODE according to the following instructions:
${userInput}

${
  topSimilarities.length > 0
    ? `The following code cells ALREADY EXISTS in *OTHER* notebook cells and *MAY* be relevant:
\`\`\`
${topSimilarities.join('\n```\n\n```\n')}
\`\`\`
You *MAY* reference this code from *OTHER* notebook cells to call existing functions or use existing variables.
`
    : ''
}

*REPLACE* the comment "# INJECT NEW CODE HERE" in the EXISTING CODE (*THIS IS VERY IMPORTANT!!!*) with the new code according to USER INSTRUCTION. Take a deep breath, think step-by-step and respond with the working python code, no explanation.

**VERY IMPORTANT**: This code will be run directly in a Jupyter cell. So: Return ONLY RUNNABLE AND VALID python code WITHOUT ANY BACKTICKS.`;
}

function generatePromptNew(userInput: string, oldCode: string, topSimilarities: string[]): string {
  const initPrompt =
    'You are a Data Science expert and an expert python programmer. ' +
    'You help users write python code in Jupyter notebook cells. ' +
    'You respond with the clean, production quality, working python code.';

  return `${initPrompt}
The user has provided the following instruction:
${userInput}

${
  topSimilarities.length > 0
    ? `The following code cells ALREADY EXISTS in *OTHER* notebook cells and *MAY* be relevant:
\`\`\`
${topSimilarities.join('\n```\n\n```\n')}
\`\`\`
`
    : ''
}

Write code according to the USER INSTRUCTION. CALL EXISTING FUNCTIONS AND REUSE EXISTING VARIABLES when possible. Take a deep breath, think step-by-step and respond with the working python code. DO NOT ADD explanation or comments.

**VERY IMPORTANT**: This code will be run directly in a Jupyter cell. So: Return ONLY RUNNABLE AND VALID python code WITHOUT ANY BACKTICKS.`;
}

function generatePromptEditPartial(
  userInput: string,
  selectedCode: string,
  oldCode: string,
  topSimilarities: string[]
): string {
  const initPrompt =
    'You are a Data Science expert and an expert python programmer. ' +
    'You are helping users edit existing python code in a Jupyter notebook cell. ' +
    'Given existing code and user instructions, you modify the existing code with clean, production quality, working python code. ';

  return `${initPrompt}
The user has selected the following code chunk in the CURRENT Jupyter notebook cell:
*SELECTED CODE START*
\`\`\`
${selectedCode}
\`\`\`
*SELECTED CODE END*

This SELECTED CODE is part of the following larger code chunk:
*FULL CODE CHUNK START*
\`\`\`
${oldCode}
\`\`\`
*FULL CODE CHUNK END*

The user wants to MODIFY the SELECTED CODE ONLY (IMPORTANT) with the following instruction:
${userInput}

${
  topSimilarities.length > 0
    ? `The following code cells ALREADY EXISTS in *OTHER* notebook cells and *MAY* be relevant:
\`\`\`
${topSimilarities.join('\n```\n\n```\n')}
\`\`\`
`
    : ''
}

Modify the SELECTED CODE (*THIS IS VERY IMPORTANT!!!*) according to the user's instructions. Respond with FULL CODE CHUNK but with the SELECTED CODE modified according to USER INSTRUCTION. Take a deep breath, think step-by-step and respond with the working python code, no explanation.

**VERY IMPORTANT**: This code will be run directly in a Jupyter cell. So: Return ONLY RUNNABLE AND VALID python code WITHOUT ANY BACKTICKS.`;
}

function generatePromptErrorFix(
  traceback: string,
  oldCode: string,
  topSimilarities: string[],
  fixAttempt: number = 1
): string {
  const initPrompt =
    'You are a Data Science expert and an expert python programmer. ' +
    'You are helping users fix errors in Jupyter notebook cells. ' +
    'Given existing code and the traceback, you responde with code that fixes the error. ' +
    'Respond with the clean, production quality, working python code.';

  return `${initPrompt}

The user ran the following code in the CURRENT Jupyter notebook cell:
*CURRENT CELL CODE START*
\`\`\`
${oldCode}
\`\`\`
*CURRENT CELL CODE END*

Running the code produces an error with the following traceback:
*TRACEBACK START*
\`\`\`
${traceback}
\`\`\`
*TRACEBACK END*

${
  topSimilarities.length > 0
    ? `The following code cells ALREADY EXISTS in *OTHER* notebook cells and *MAY* be relevant:
\`\`\`
${topSimilarities.join('\n```\n\n```\n')}
\`\`\`
`
    : ''
}

${
  fixAttempt > 1
    ? `This is attempt ${fixAttempt} at this same error: the previous fixes did not work. That usually means the cause is NOT in this code — it is the environment, a package version, or the data. Say what you now think it is in a comment at the top, and make the smallest change you can rather than rewriting it again.\n`
    : ''
}
Take a deep breath, think step-by-step and respond with MODIFIED version of CURRENT CELL CODE to fix the error. Add a PYTHON COMMENT explaining what you did. IF NEEDED, use of Jupyter bang and magic.

**VERY IMPORTANT**: This code will be run directly in a Jupyter cell. So: Return ONLY RUNNABLE AND VALID python code WITHOUT ANY BACKTICKS.`;
}

export const openaiEmbeddings = async (
  source: string,
  aiChatModelProvider: string,
  aiClient: OpenAI | OpenAIClient | MistralClient | null
): Promise<OpenAIEmbeddings | AzureEmbeddings | MistralEmbeddings> => {
  if (aiChatModelProvider === 'Pretzel AI') {
    return (await (
      await fetch('https://api.pretzelai.app/embeddings/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          source: source
        })
      })
    ).json()) as OpenAIEmbeddings;
  } else if (aiChatModelProvider === 'OpenAI') {
    return await (aiClient as OpenAI).embeddings.create({
      model: 'text-embedding-3-large',
      input: source
    });
  } else if (aiChatModelProvider === 'Azure') {
    return await (aiClient as OpenAIClient).getEmbeddings('text-embedding-ada-002', [source]);
  } else if (aiChatModelProvider === 'Mistral') {
    return await (aiClient as MistralClient).embeddings({
      model: 'mistral-embed',
      input: source
    });
  } else {
    const baseUrl = ServerConnection.makeSettings().baseUrl;
    const fullUrl = URLExt.join(baseUrl, '/embed');
    const xsrfToken = await getCookie('_xsrf');
    const response = await fetch(fullUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-XSRFToken': xsrfToken
      },
      body: JSON.stringify({
        texts: [source]
      })
    });
    const data = await response.json();
    return {
      data: [
        {
          embedding: data.embeddings[0],
          index: 0,
          object: 'embedding'
        }
      ],
      model: 'local-jina-embeddings-v2-small-en',
      object: 'list',
      usage: {
        prompt_tokens: source.split(' ').length,
        total_tokens: source.split(' ').length
      }
    } as OpenAIEmbeddings;
  }
};

export const getInlinePrompt = (prompt: string, suffix: string) => `Here are some examples of Python code completion:

Example 1:
Input:
def calculate_area(radius):
    return 3.14 * [BLANK]

Output:
radius ** 2

Example 2:
Input:
for i in range(10):
    if i % 2 == 0:
        [BLANK]

Output:
print(i)

Example 3:
Input:
try:
    result = 10 / 0
except [BLANK]:
    print("Division by zero!")

Output:
ZeroDivisionError

Example 4:
Input:
import random

numbers = [1, 2, 3, 4, 5]
random.[BLANK]

Output:
shuffle(numbers)

Example 5:
Input:
def quick_sort(arr):
    # exp

Output:
lanation:

Now, complete the following Python code:

${prompt}[BLANK]${suffix}

Fill in the blank to complete the code block. Your response should include only the code to replace [BLANK], without surrounding backticks. Do not return a linebreak at the beginning of your response.`;
