/*
 * Copyright (c) Pretzel AI GmbH.
 * This file is part of the Pretzel project and is licensed under the
 * GNU Affero General Public License version 3.
 * See the LICENSE_AGPLv3 file at the root of the project for the full license text.
 * Contributions by contributors listed in the PRETZEL_CONTRIBUTORS file (found at
 * the root of the project) are licensed under AGPLv3.
 */
import React, { useEffect, useRef } from 'react';
import { EditorView } from 'codemirror';
import { EditorState, Extension } from '@codemirror/state';
import { unifiedMergeView } from '@codemirror/merge';
import { python } from '@codemirror/lang-python';
import { jupyterTheme } from '@jupyterlab/codemirror';
import { IToolPreview } from '../agent/webTools';

/** What the user chose. */
export type ApprovalChoice = 'accept' | 'accept-run' | 'reject' | 'always' | 'edit';

interface IApprovalCardProps {
  /** The one-line description of what the AI wants to do. */
  label: string;
  /** The code it would write, when there is any. */
  preview: IToolPreview | null;
  /** Where "Always allow" would apply, in words the user can check. */
  folder: string;
  /** False for anything that asks every time whatever the settings say, such as installing. */
  canAlwaysAllow: boolean;
  onChoose: (choice: ApprovalChoice) => void;
}

/**
 * The code the AI wants to write, before it writes it.
 *
 * Same red and green as Cmd+K in a cell, because it is the same question: here is what would
 * change, do you want it. A card that only says "Allow this?" asks the user to approve something
 * they cannot see.
 */
export function ApprovalCard({ label, preview, folder, canAlwaysAllow, onChoose }: IApprovalCardProps): JSX.Element {
  const host = useRef<HTMLDivElement | null>(null);
  const view = useRef<EditorView | null>(null);

  useEffect(() => {
    if (!host.current || !preview) {
      return;
    }
    const changed = preview.before !== preview.after;
    const extensions: Extension[] = [
      python(),
      jupyterTheme,
      EditorView.editable.of(false),
      EditorState.readOnly.of(true),
      EditorView.lineWrapping
    ];
    // A new cell has nothing to compare against, and a cell that is only being run is not
    // changing: in both cases a diff would be noise, so it is shown as plain code.
    if (changed && preview.before) {
      extensions.push(unifiedMergeView({ original: preview.before, mergeControls: false, gutter: false }));
    }
    let editor: EditorView;
    try {
      editor = new EditorView({
        state: EditorState.create({ doc: preview.after || preview.before, extensions }),
        parent: host.current
      });
    } catch {
      // The editor failing to start must not take the buttons with it: the user still has to be
      // able to read this change and answer yes or no, even as plain text.
      const plain = document.createElement('pre');
      plain.className = 'chat-approval-plain';
      plain.textContent = preview.after || preview.before;
      host.current.appendChild(plain);
      return () => {
        plain.remove();
      };
    }
    if (!preview.before) {
      editor.dom.classList.add('pretzel-new-code-generation');
    }
    if (!preview.after) {
      editor.dom.classList.add('pretzel-removed-code');
    }
    view.current = editor;
    return () => {
      editor.destroy();
      view.current = null;
    };
  }, [preview]);

  const button = (choice: ApprovalChoice, text: string, kind: string, title?: string) => (
    <button className={`jp-Dialog-button jp-mod-styled ${kind}`} title={title} onClick={() => onChoose(choice)}>
      {text}
    </button>
  );

  return (
    <div className="chat-approval">
      <p className="chat-approval-ask">{label}</p>
      {preview && (
        <>
          <p className="chat-approval-where">{preview.where}</p>
          <div className="chat-approval-diff" ref={host} />
        </>
      )}
      <div className="chat-approval-buttons">
        {button('accept', 'Accept', 'jp-mod-accept')}
        {preview?.runnable && button('accept-run', 'Accept and run', 'jp-mod-accept')}
        {button('reject', 'Reject', 'jp-mod-reject')}
        {button('edit', 'Edit prompt', 'jp-mod-reject', 'Stop, and put your message back in the box to change it')}
      </div>
      {canAlwaysAllow ? (
        <button
          className="chat-approval-always"
          onClick={() => onChoose('always')}
          title={`Stop asking for changes like this while you are working in ${folder}. Installing still asks.`}
        >
          Always allow in {folder}
        </button>
      ) : (
        // Offering "always allow" here would be a lie: this one asks every time by design
        <p className="chat-approval-note">This one is always asked about, whatever your settings say.</p>
      )}
    </div>
  );
}
