/*
 * Copyright (c) Pretzel AI GmbH.
 * This file is part of the Pretzel project and is licensed under the
 * GNU Affero General Public License version 3.
 * See the LICENSE_AGPLv3 file at the root of the project for the full license text.
 * Contributions by contributors listed in the PRETZEL_CONTRIBUTORS file (found at
 * the root of the project) are licensed under AGPLv3.
 */
import { ICodeCellModel } from '@jupyterlab/cells';
import { INotebookTracker, NotebookActions, NotebookPanel } from '@jupyterlab/notebook';
import { IAgentTool } from './webTools';

/**
 * Reading and changing the open notebook.
 *
 * The hard part of this is not the editing, it is that a notebook is not a program. What the
 * kernel knows comes from the cells that have been run, in the order they were run, which may be
 * nothing like the order they are written in. A cell can be gone from the screen and its
 * variables still be alive; a cell can be sitting there in plain sight and mean nothing yet.
 *
 * So every description of the notebook that goes to the model carries the execution state
 * alongside the text: what ran, in what order, and what has been edited since it ran.
 */

const MAX_CELL_CHARS = 6000;
const MAX_OUTPUT_CHARS = 3000;
const MAX_PREVIEW = 68;

const panelOf = (tracker: INotebookTracker | null): NotebookPanel => {
  const panel = tracker?.currentWidget;
  if (!panel) {
    throw new Error('No notebook is open. Ask the user to open one first.');
  }
  return panel;
};

const cellAt = (panel: NotebookPanel, index: any) => {
  const cells = panel.content.widgets;
  const position = Number(index);
  if (!Number.isInteger(position) || position < 0 || position >= cells.length) {
    throw new Error(
      `There is no cell ${index}. The notebook has ${cells.length} cells, numbered 0 to ${cells.length - 1}.`
    );
  }
  return cells[position];
};

const clip = (text: string, limit: number): string =>
  text.length > limit ? `${text.slice(0, limit)}\n… (${text.length - limit} more characters)` : text;

/** Everything a cell produced, as the user sees it. */
const outputsOf = (model: any): { text: string; error: string; kinds: string[] } => {
  const outputs = model?.outputs;
  if (!outputs || typeof outputs.length !== 'number') {
    return { text: '', error: '', kinds: [] };
  }
  let text = '';
  let error = '';
  const kinds: string[] = [];
  for (let i = 0; i < outputs.length; i++) {
    const output = outputs.get(i)?.toJSON?.();
    if (!output) {
      continue;
    }
    if (output.output_type === 'stream') {
      text += Array.isArray(output.text) ? output.text.join('') : output.text || '';
      kinds.push('printed text');
    } else if (output.output_type === 'error') {
      // A traceback arrives with the terminal's colour codes still in it
      // eslint-disable-next-line no-control-regex
      const trace = (output.traceback || []).join('\n').replace(/\u001b\[[0-9;]*m/g, '');
      error = `${output.ename}: ${output.evalue}\n${trace}`;
      kinds.push(`error (${output.ename})`);
    } else {
      const data = output.data || {};
      const plain = data['text/plain'];
      text += Array.isArray(plain) ? plain.join('') : plain || '';
      const rich = Object.keys(data).filter(t => t !== 'text/plain');
      kinds.push(rich.length ? `${rich.join(', ')}` : 'a value');
    }
  }
  return { text: text.trim(), error: error.trim(), kinds };
};

/** One line in the overview: what this cell is, whether it ran, and what came out. */
const cellLine = (cell: any, index: number): string => {
  const model = cell.model;
  const source: string = model?.sharedModel?.source ?? '';
  const first = source.split('\n').find((line: string) => line.trim()) ?? '';
  const preview = first.length > MAX_PREVIEW ? `${first.slice(0, MAX_PREVIEW)}…` : first;
  const lines = source ? source.split('\n').length : 0;

  if (model?.type !== 'code') {
    return `[${index}] ${model?.type ?? 'unknown'} — ${preview || '(empty)'}`;
  }

  const code = model as ICodeCellModel;
  const count = code.executionCount;
  let state: string;
  if (!source.trim()) {
    state = 'empty';
  } else if (count === null || count === undefined) {
    state = 'NEVER RUN';
  } else if (code.isDirty) {
    state = `EDITED SINCE IT RAN as [${count}]`;
  } else {
    state = `ran as [${count}]`;
  }

  const { error, kinds } = outputsOf(code);
  const result = error
    ? `ended in ${error.split('\n')[0]}`
    : kinds.length
    ? `produced ${Array.from(new Set(kinds)).join(', ')}`
    : count
    ? 'no output'
    : '';

  return `[${index}] code, ${lines} line${lines === 1 ? '' : 's'}, ${state}${result ? `, ${result}` : ''} — ${
    preview || '(empty)'
  }`;
};

/** "Cell 3 has" or "Cells 3, 5 have" — the model reads these lines out to the user. */
const listCells = (indexes: number[]): { subject: string; verb: string } => ({
  subject: indexes.length === 1 ? `Cell ${indexes[0]}` : `Cells ${indexes.join(', ')}`,
  verb: indexes.length === 1 ? 'has' : 'have'
});

/** The part people get wrong and models get wrong with them: what the kernel actually holds. */
const stateNotes = (panel: NotebookPanel): string[] => {
  const cells = panel.content.widgets;
  const notes: string[] = [];
  const stale: number[] = [];
  const unrun: number[] = [];
  const ran: { index: number; count: number }[] = [];

  cells.forEach((cell, index) => {
    const model = cell.model;
    if (model?.type !== 'code' || !model.sharedModel.source.trim()) {
      return;
    }
    const code = model as ICodeCellModel;
    if (code.executionCount === null || code.executionCount === undefined) {
      unrun.push(index);
    } else {
      ran.push({ index, count: code.executionCount });
      if (code.isDirty) {
        stale.push(index);
      }
    }
  });

  if (!ran.length) {
    notes.push(
      'Nothing in this notebook has been run in the current kernel, so the kernel is empty: no variables, no imports, no functions exist yet.'
    );
  }
  if (stale.length) {
    const { subject, verb } = listCells(stale);
    notes.push(
      `${subject} ${verb} been edited since ${
        stale.length === 1 ? 'it' : 'they'
      } last ran. The kernel is still using the OLD version of that code. ` +
        'Anything that depends on it needs it run again first.'
    );
  }
  if (unrun.length && ran.length) {
    const { subject, verb } = listCells(unrun);
    notes.push(
      `${subject} ${verb} never been run, so nothing ${
        unrun.length === 1 ? 'it defines' : 'they define'
      } exists in the kernel yet.`
    );
  }

  const order = [...ran].sort((a, b) => a.count - b.count).map(r => r.index);
  const inOrder = order.every((index, i) => i === 0 || index > order[i - 1]);
  if (ran.length > 1 && !inOrder) {
    notes.push(
      `These cells were run out of order — by execution count: ${order.join(
        ' → '
      )}. The kernel holds the result of THAT sequence, not of reading the notebook top to bottom.`
    );
  }
  return notes;
};

export interface INotebookToolOptions {
  tracker: INotebookTracker | null;
  /** How long to wait for one cell before reporting back that it is still going. */
  runTimeoutMs?: number;
}

/** Where an insert will actually land, so the label and the action agree. */
const insertPosition = (index: any, count: number): number => {
  const wanted = Number(index);
  return Number.isInteger(wanted) ? Math.max(0, Math.min(wanted, count)) : count;
};

export function createNotebookTools({ tracker, runTimeoutMs = 120000 }: INotebookToolOptions): IAgentTool[] {
  const overview: IAgentTool = {
    name: 'notebook_overview',
    risk: 'read',
    description:
      'List the cells of the open notebook with their numbers, what each one starts with, ' +
      'whether it has been run, and what it produced — plus what the kernel currently holds. ' +
      'Read this before changing or running anything, so the cell numbers you use are real.',
    parameters: { type: 'object', properties: {} },
    label: () => 'Looking at the notebook',
    run: async () => {
      const panel = panelOf(tracker);
      const cells = panel.content.widgets;
      const kernel = panel.sessionContext?.session?.kernel;
      const header =
        `${panel.title.label} — ${cells.length} cell${cells.length === 1 ? '' : 's'}, ` +
        (kernel ? `kernel ${kernel.name} (${panel.sessionContext.kernelDisplayStatus})` : 'no kernel running');
      const notes = stateNotes(panel);
      return [
        header,
        '',
        ...cells.map((cell, index) => cellLine(cell, index)),
        '',
        'State of the kernel:',
        ...(notes.length ? notes.map(note => `- ${note}`) : ['- Everything written has been run as written.'])
      ].join('\n');
    }
  };

  const readCell: IAgentTool = {
    name: 'read_cell',
    risk: 'read',
    description:
      'Read one cell in full: its source and everything it produced, including the whole error ' +
      'traceback when it failed. Cell numbers come from notebook_overview and start at 0.',
    parameters: {
      type: 'object',
      properties: { index: { type: 'integer', description: 'Which cell to read, counting from 0' } },
      required: ['index']
    },
    label: args => `Reading cell ${args?.index}`,
    run: async args => {
      const panel = panelOf(tracker);
      const cell = cellAt(panel, args?.index);
      const model = cell.model;
      const source = clip(model.sharedModel.source, MAX_CELL_CHARS);
      const parts = [`Cell ${args.index} (${model.type}):`, '```python', source, '```'];

      if (model.type === 'code') {
        const code = model as ICodeCellModel;
        parts.push(
          code.executionCount === null || code.executionCount === undefined
            ? 'It has never been run.'
            : code.isDirty
            ? `It last ran as [${code.executionCount}], but has been edited since — the kernel still has the old version.`
            : `It ran as [${code.executionCount}] and has not been edited since.`
        );
        const { text, error } = outputsOf(code);
        if (error) {
          parts.push('It ended in this error:', clip(error, MAX_OUTPUT_CHARS));
        } else if (text) {
          parts.push('Its output:', clip(text, MAX_OUTPUT_CHARS));
        } else {
          parts.push('It produced no output.');
        }
      }
      return parts.join('\n');
    }
  };

  const editCell: IAgentTool = {
    name: 'edit_cell',
    risk: 'write',
    description:
      'Replace the whole contents of one cell. Give the complete new source, not a fragment: ' +
      'whatever you pass becomes the cell. Editing does not run it, and it does not undo what the ' +
      'old version already did to the kernel.',
    parameters: {
      type: 'object',
      properties: {
        index: { type: 'integer', description: 'Which cell to replace, counting from 0' },
        source: { type: 'string', description: 'The complete new contents of the cell' }
      },
      required: ['index', 'source']
    },
    label: args => `Rewriting cell ${args?.index}`,
    run: async args => {
      const panel = panelOf(tracker);
      const cell = cellAt(panel, args?.index);
      const before = cell.model.sharedModel.source;
      cell.model.sharedModel.setSource(String(args?.source ?? ''));
      panel.content.activeCellIndex = Number(args.index);
      const ran =
        cell.model.type === 'code' && (cell.model as ICodeCellModel).executionCount !== null && before.trim() !== '';
      return (
        `Cell ${args.index} now holds the new code. It has NOT been run.` +
        (ran ? ' The kernel is still using the previous version until this cell is run again.' : '')
      );
    }
  };

  const insertCell: IAgentTool = {
    name: 'insert_cell',
    risk: 'write',
    description:
      'Add a new cell. It goes in at `index`, pushing the cells below it down, so inserting at 0 ' +
      'puts it at the top and inserting at the cell count puts it at the end. ' +
      'Leave `source` out for an empty cell — if the user asked for empty cells, they mean empty.',
    parameters: {
      type: 'object',
      properties: {
        index: { type: 'integer', description: 'Where to put it, counting from 0' },
        source: { type: 'string', description: 'What goes in it; omit for an empty cell' },
        // eslint-disable-next-line camelcase
        cell_type: { type: 'string', enum: ['code', 'markdown'], description: 'Defaults to code' }
      },
      required: ['index']
    },
    label: args => {
      const kind = args?.cell_type === 'markdown' ? 'markdown' : 'code';
      const what = String(args?.source ?? '').trim() ? 'a ' : 'an empty ';
      // The approval prompt has to say where it will really go: a model that asks for -1 is
      // asking for the top, and the user should be told that, not "-1"
      const count = tracker?.currentWidget?.content.widgets.length ?? 0;
      const position = insertPosition(args?.index, count);
      const where = position >= count ? 'at the end' : `at position ${position}`;
      return `Adding ${what}${kind} cell ${where}`;
    },
    run: async args => {
      const panel = panelOf(tracker);
      const model = panel.model;
      if (!model) {
        throw new Error('That notebook has no model, so it cannot be changed.');
      }
      const count = panel.content.widgets.length;
      const position = insertPosition(args?.index, count);
      const type = args?.cell_type === 'markdown' ? 'markdown' : 'code';
      model.sharedModel.insertCell(position, {
        // eslint-disable-next-line camelcase
        cell_type: type,
        source: String(args?.source ?? ''),
        metadata: type === 'code' ? { trusted: true } : {}
      });
      panel.content.activeCellIndex = position;
      return `Added a ${type} cell at ${position}. The notebook now has ${panel.content.widgets.length} cells, and everything below ${position} has shifted down by one.`;
    }
  };

  const deleteCell: IAgentTool = {
    name: 'delete_cell',
    risk: 'write',
    description:
      'Delete one cell. The cells below it move up, so their numbers change. ' +
      'Deleting a cell does not remove anything it already defined in the kernel.',
    parameters: {
      type: 'object',
      properties: { index: { type: 'integer', description: 'Which cell to delete, counting from 0' } },
      required: ['index']
    },
    label: args => `Deleting cell ${args?.index}`,
    run: async args => {
      const panel = panelOf(tracker);
      const cell = cellAt(panel, args?.index);
      const wasRun = cell.model.type === 'code' && (cell.model as ICodeCellModel).executionCount !== null;
      if (!panel.model) {
        throw new Error('That notebook has no model, so it cannot be changed.');
      }
      panel.model.sharedModel.deleteCell(Number(args.index));
      return (
        `Deleted cell ${args.index}. The notebook now has ${panel.content.widgets.length} cells and the ones below have moved up by one.` +
        (wasRun
          ? ' It had already run, so whatever it defined is still in the kernel until the kernel is restarted.'
          : '')
      );
    }
  };

  /**
   * Whether running this cell would install something.
   *
   * The install tool always asks, because installing changes the machine outside the notebook.
   * A cell saying `!pip install torch` does exactly the same thing, so it asks too — otherwise
   * "let it run" quietly becomes permission to install.
   */
  const installsSomething = (source: string): boolean =>
    /(^|\n)\s*[!%]\s*(pip|conda|uv|mamba|micromamba)\s+install\b/.test(source) ||
    /(^|\n)[^#\n]*\bpip\b[^\n]*\binstall\b/.test(source);

  const runCell: IAgentTool = {
    name: 'run_cell',
    risk: 'write',
    description:
      'Run one cell in the kernel and get back what it produced, including the error if it failed. ' +
      'Running changes the kernel, so run the fewest cells that answer the question, and run the ' +
      'cells something depends on before the cell that depends on them.',
    parameters: {
      type: 'object',
      properties: { index: { type: 'integer', description: 'Which cell to run, counting from 0' } },
      required: ['index']
    },
    alwaysAskFor: args => {
      try {
        return installsSomething(cellAt(panelOf(tracker), args?.index).model.sharedModel.source);
      } catch {
        return false;
      }
    },
    label: args => {
      let installs = false;
      try {
        installs = installsSomething(cellAt(panelOf(tracker), args?.index).model.sharedModel.source);
      } catch {
        installs = false;
      }
      return installs ? `Running cell ${args?.index} — it installs packages` : `Running cell ${args?.index}`;
    },
    run: async args => {
      const panel = panelOf(tracker);
      const cell = cellAt(panel, args?.index);
      if (!panel.sessionContext?.session?.kernel) {
        throw new Error('There is no kernel running, so nothing can be run yet.');
      }
      if (cell.model.type !== 'code') {
        throw new Error(`Cell ${args.index} is a ${cell.model.type} cell, so there is nothing to run.`);
      }

      panel.content.activeCellIndex = Number(args.index);
      panel.content.deselectAll();

      // A cell can wait forever — for a window that cannot open here, for input nobody will type.
      // Stopping the wait is not stopping the cell: it keeps running, and the user can interrupt it.
      let finished = false;
      const run = NotebookActions.run(panel.content, panel.sessionContext).then(ok => {
        finished = true;
        return ok;
      });
      const waited = await Promise.race([
        run,
        new Promise<'timeout'>(resolve => setTimeout(() => resolve('timeout'), runTimeoutMs))
      ]);

      if (waited === 'timeout' && !finished) {
        return (
          `Cell ${args.index} is still running after ${Math.round(runTimeoutMs / 1000)} seconds. ` +
          'That usually means it is waiting for something that will not happen here — a native ' +
          'window, an animation loop with no end, or input from a person. Tell the user what you ' +
          'think it is waiting for and let them decide whether to interrupt it. Do not start ' +
          'another run in the meantime.'
        );
      }

      const code = cell.model as ICodeCellModel;
      const { text, error } = outputsOf(code);
      if (error) {
        return `Cell ${args.index} ran as [${code.executionCount}] and FAILED:\n${clip(error, MAX_OUTPUT_CHARS)}`;
      }
      return (
        `Cell ${args.index} ran as [${code.executionCount}] without error.` +
        (text ? `\nOutput:\n${clip(text, MAX_OUTPUT_CHARS)}` : ' It produced no output.')
      );
    }
  };

  return [overview, readCell, editCell, insertCell, deleteCell, runCell];
}
