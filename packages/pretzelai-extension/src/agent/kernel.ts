/*
 * Copyright (c) Pretzel AI GmbH.
 * This file is part of the Pretzel project and is licensed under the
 * GNU Affero General Public License version 3.
 * See the LICENSE_AGPLv3 file at the root of the project for the full license text.
 * Contributions by contributors listed in the PRETZEL_CONTRIBUTORS file (found at
 * the root of the project) are licensed under AGPLv3.
 */
import { INotebookTracker } from '@jupyterlab/notebook';
import { KernelMessage } from '@jupyterlab/services';

/**
 * Running code in the notebook's own kernel.
 *
 * The environment that matters is the kernel's, not the server's: the kernel is where the user's
 * imports resolve and where a package has to be installed to be of any use. Asking the server
 * which packages exist would answer a different question, and answer it wrongly whenever the
 * kernel runs in another environment — which is the normal case.
 *
 * Everything here runs `silent: true, store_history: false`, so these probes leave no trace in the
 * notebook: no cell, no execution count, no entry in `In`/`Out`.
 */

export interface IKernelRunResult {
  /** Anything printed, plus the text form of whatever the code evaluated to. */
  text: string;
  /** "ename: evalue" when the code raised, otherwise empty. */
  error: string;
  /** True when the code was still running when we stopped waiting. */
  timedOut: boolean;
}

/** A kernel we can run code in, or a reason why we cannot. */
export const kernelProblem = (tracker: INotebookTracker | null): string => {
  const panel = tracker?.currentWidget;
  if (!panel) {
    return 'No notebook is open, so there is no environment to look at.';
  }
  if (!panel.sessionContext?.session?.kernel) {
    return 'The notebook has no kernel running. Starting one (or running any cell) will let me look at the environment.';
  }
  return '';
};

const textOf = (bundle: any): string => {
  const plain = bundle?.['text/plain'];
  return typeof plain === 'string' ? plain : Array.isArray(plain) ? plain.join('') : '';
};

/**
 * Run code in the current notebook's kernel without showing it to the user.
 *
 * A kernel can wait forever — for a window that will never open, for input nobody types — so
 * every probe is given a deadline. On a timeout the request is interrupted, because a probe that
 * is still holding the kernel would block the next cell the user runs.
 */
export async function runInKernel(
  tracker: INotebookTracker | null,
  code: string,
  timeoutMs = 25000
): Promise<IKernelRunResult> {
  const problem = kernelProblem(tracker);
  if (problem) {
    throw new Error(problem);
  }
  const panel = tracker!.currentWidget!;
  const kernel = panel.sessionContext.session!.kernel!;

  const future = kernel.requestExecute(
    // eslint-disable-next-line camelcase
    { code, silent: true, store_history: false, stop_on_error: true },
    true
  );

  let text = '';
  let error = '';
  future.onIOPub = (message: KernelMessage.IIOPubMessage) => {
    const type = message.header.msg_type;
    const content: any = message.content;
    if (type === 'stream') {
      text += content.text || '';
    } else if (type === 'execute_result' || type === 'display_data') {
      text += textOf(content.data);
    } else if (type === 'error') {
      error = `${content.ename}: ${content.evalue}`;
    }
  };

  let timer: ReturnType<typeof setTimeout> | undefined;
  const timedOut = await Promise.race([
    future.done.then(() => false),
    new Promise<boolean>(resolve => {
      timer = setTimeout(() => resolve(true), timeoutMs);
    })
  ]);
  if (timer) {
    clearTimeout(timer);
  }
  if (timedOut) {
    await kernel.interrupt().catch(() => undefined);
    future.dispose();
  }

  return { text: text.trim(), error, timedOut };
}

/** Run code that prints JSON and hand back the parsed value. */
export async function runInKernelForJson(
  tracker: INotebookTracker | null,
  code: string,
  timeoutMs = 25000
): Promise<any> {
  const { text, error, timedOut } = await runInKernel(tracker, code, timeoutMs);
  if (timedOut) {
    throw new Error('The kernel did not answer in time. It may be busy running something else.');
  }
  if (error) {
    throw new Error(error);
  }
  const start = text.indexOf('{');
  const end = text.lastIndexOf('}');
  if (start === -1 || end === -1) {
    throw new Error(`The kernel replied with something unexpected: ${text.slice(0, 200)}`);
  }
  try {
    return JSON.parse(text.slice(start, end + 1));
  } catch {
    throw new Error(`The kernel's reply could not be read: ${text.slice(0, 200)}`);
  }
}
