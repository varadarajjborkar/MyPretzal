/*
 * Copyright (c) Pretzel AI GmbH.
 * This file is part of the Pretzel project and is licensed under the
 * GNU Affero General Public License version 3.
 * See the LICENSE_AGPLv3 file at the root of the project for the full license text.
 * Contributions by contributors listed in the PRETZEL_CONTRIBUTORS file (found at
 * the root of the project) are licensed under AGPLv3.
 */

/**
 * What the assistant has already done in this notebook.
 *
 * Without this it starts every message from nothing: it offers to install a package it installed
 * five minutes ago, asks again for permission it was already given, and cannot answer "did that
 * work?" because it has no idea it ever happened. The user then watches it go round the same
 * loop, which is exactly what they came here to stop.
 *
 * It survives a page reload, because reloading is when people lose the thread and ask "where did
 * we get to?". It is kept per notebook, because the answer is different in each one.
 */

export type LedgerKind = 'install' | 'edit' | 'insert' | 'delete' | 'run' | 'check' | 'note';
export type LedgerOutcome = 'ok' | 'failed' | 'declined' | 'skipped';

export interface ILedgerEntry {
  /** When it happened, so the assistant can say "a moment ago" rather than guess. */
  at: number;
  kind: LedgerKind;
  /** What it was about: a package name, "cell 3", a short phrase. */
  what: string;
  outcome: LedgerOutcome;
  /** One line of detail — the pip error, the exception, what the user said no to. */
  detail?: string;
}

/** Long enough to cover a working session, short enough not to become archaeology. */
const KEEP = 40;
const STORE = 'pretzel-agent-ledger:';

const memory = new Map<string, ILedgerEntry[]>();

const KINDS: LedgerKind[] = ['install', 'edit', 'insert', 'delete', 'run', 'check', 'note'];
const OUTCOMES: LedgerOutcome[] = ['ok', 'failed', 'declined', 'skipped'];

/**
 * Make an entry out of whatever was stored, or nothing.
 *
 * What comes back from localStorage was written by some other version of this code, or by a
 * half-finished write, or by nobody at all. A stored line the reader does not recognise must
 * cost the user a line of history, never the ability to send their next message.
 */
const clean = (value: any): ILedgerEntry | null => {
  if (!value || typeof value !== 'object') {
    return null;
  }
  const kind = KINDS.includes(value.kind) ? (value.kind as LedgerKind) : null;
  if (!kind || typeof value.what !== 'string' || !value.what) {
    return null;
  }
  return {
    at: Number.isFinite(value.at) ? value.at : Date.now(),
    kind,
    what: value.what,
    outcome: OUTCOMES.includes(value.outcome) ? (value.outcome as LedgerOutcome) : 'ok',
    detail: typeof value.detail === 'string' ? value.detail : undefined
  };
};

const load = (notebook: string): ILedgerEntry[] => {
  const held = memory.get(notebook);
  if (held) {
    return held;
  }
  let saved: any = [];
  try {
    saved = JSON.parse(localStorage.getItem(STORE + notebook) || '[]');
  } catch {
    // A browser that will not remember just starts the history here
    saved = [];
  }
  const entries = (Array.isArray(saved) ? saved : []).map(clean).filter((e): e is ILedgerEntry => e !== null);
  memory.set(notebook, entries);
  return entries;
};

const save = (notebook: string, entries: ILedgerEntry[]): void => {
  memory.set(notebook, entries);
  try {
    localStorage.setItem(STORE + notebook, JSON.stringify(entries));
  } catch {
    // Not being able to persist it is not a reason to lose it for this session
  }
};

/** Write down something that happened. */
export function record(notebook: string, entry: Omit<ILedgerEntry, 'at'>): void {
  if (!notebook) {
    return;
  }
  const written = clean({ ...entry, at: Date.now() });
  if (!written) {
    return;
  }
  const entries = load(notebook);
  entries.push(written);
  save(notebook, entries.slice(-KEEP));
}

/** Everything recorded for this notebook, oldest first. */
export const history = (notebook: string): ILedgerEntry[] => (notebook ? [...load(notebook)] : []);

/** Forget it — for "start again" rather than for tidiness. */
export function clearHistory(notebook: string): void {
  memory.delete(notebook);
  try {
    localStorage.removeItem(STORE + notebook);
  } catch {
    // Nothing to remove if it was never stored
  }
}

/** The packages this notebook has already had installed successfully. */
export const installedEarlier = (notebook: string): string[] => [
  ...new Set(
    history(notebook)
      .filter(e => e.kind === 'install' && e.outcome === 'ok')
      .map(e => e.what)
  )
];

const ago = (at: number): string => {
  const seconds = Math.max(0, Math.round((Date.now() - at) / 1000));
  if (seconds < 90) {
    return `${seconds}s ago`;
  }
  const minutes = Math.round(seconds / 60);
  return minutes < 90 ? `${minutes} min ago` : `${Math.round(minutes / 60)}h ago`;
};

const said: Record<LedgerKind, (entry: ILedgerEntry) => string> = {
  install: e => `installed ${e.what}`,
  edit: e => `rewrote ${e.what}`,
  insert: e => `added ${e.what}`,
  delete: e => `deleted ${e.what}`,
  run: e => `ran ${e.what}`,
  check: e => `checked ${e.what}`,
  note: e => e.what
};

const ending: Record<LedgerOutcome, string> = {
  ok: '',
  failed: ' — FAILED',
  declined: ' — the user said no',
  skipped: ' — nothing to do, it was already the case'
};

/**
 * The history as the model should read it.
 *
 * Deliberately blunt about installs: "you already installed this" is the single fact that stops
 * the loop this whole file exists for.
 */
export function ledgerNote(notebook: string): string {
  const entries = history(notebook);
  if (!entries.length) {
    return '';
  }
  const lines = entries
    .slice(-14)
    .map(
      e =>
        `- ${ago(e.at)}: ${(said[e.kind] ?? said.note)(e)}${ending[e.outcome] ?? ''}${e.detail ? ` (${e.detail})` : ''}`
    );
  const done = installedEarlier(notebook);
  const installs = done.length
    ? `\nAlready installed during this work, so do NOT offer to install ${
        done.length === 1 ? 'it' : 'them'
      } again: ${done.join(', ')}. ` +
      'If something still will not import, the problem is not that it is missing — check it and say what you find.'
    : '';
  return `*WHAT YOU HAVE ALREADY DONE HERE*\n${lines.join('\n')}${installs}\n*END OF WHAT YOU HAVE DONE*`;
}
