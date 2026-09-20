/*
 * Copyright (c) Pretzel AI GmbH.
 * This file is part of the Pretzel project and is licensed under the
 * GNU Affero General Public License version 3.
 * See the LICENSE_AGPLv3 file at the root of the project for the full license text.
 * Contributions by contributors listed in the PRETZEL_CONTRIBUTORS file (found at
 * the root of the project) are licensed under AGPLv3.
 */
import CheckIcon from '@mui/icons-material/Check';
import HandymanIcon from '@mui/icons-material/Handyman';
import { Divider, ListSubheader, Menu, MenuItem } from '@mui/material';
import React, { useState } from 'react';

/**
 * What happens when the agent wants to use a tool.
 *
 * 'changes' is the middle setting and the default: looking things up needs no permission, but
 * anything that edits a cell, runs code or installs a package waits for a click.
 */
export type AgentApproval = 'auto' | 'changes' | 'ask';

/** Which groups of tools the agent may reach for. */
export interface IAgentTools {
  web: boolean;
  notebook: boolean;
  environment: boolean;
}

interface IAgentButtonProps {
  tools: IAgentTools;
  approval: AgentApproval;
  /** False when the chosen model can't use tools; the button then explains instead of turning on. */
  supported: boolean;
  unsupportedReason?: string;
  onChange: (change: { tools?: Partial<IAgentTools>; approval?: AgentApproval }) => void;
  onClosed: () => void;
}

const APPROVALS: { value: AgentApproval; label: string }[] = [
  { value: 'auto', label: 'Let it run' },
  { value: 'changes', label: 'Ask before it changes anything' },
  { value: 'ask', label: 'Ask before every step' }
];

/** Chooses what the AI may do on its own, and when it has to ask first. */
export function AgentButton({
  tools,
  approval,
  supported,
  unsupportedReason,
  onChange,
  onClosed
}: IAgentButtonProps): JSX.Element {
  const [anchor, setAnchor] = useState<HTMLElement | null>(null);
  const itemSx = {
    color: 'var(--jp-ui-font-color1)',
    whiteSpace: 'normal' as const,
    '&:hover': { backgroundColor: 'var(--jp-layout-color2)' }
  };
  const subheaderStyle = {
    backgroundColor: 'var(--jp-layout-color1)',
    color: 'var(--jp-ui-font-color2)',
    lineHeight: '2rem'
  };
  const tick = (shown: boolean) => <CheckIcon sx={{ fontSize: '1rem', marginRight: '6px', opacity: shown ? 1 : 0 }} />;

  const on = supported ? Object.values(tools).filter(Boolean).length : 0;
  const names = [
    tools.notebook ? 'the notebook' : '',
    tools.environment ? 'the environment' : '',
    tools.web ? 'the web' : ''
  ].filter(Boolean);
  const title = !supported
    ? unsupportedReason || 'This model cannot use tools.'
    : on === 0
    ? 'The AI answers from what you send it. Click to let it read the notebook, the environment or the web.'
    : `The AI can look at ${names.join(', ')}. ${APPROVALS.find(a => a.value === approval)?.label}. Click to change.`;

  const toggle = (key: keyof IAgentTools) => () => {
    setAnchor(null);
    onChange({ tools: { [key]: !tools[key] } });
  };

  return (
    <>
      <button
        className={`chat-agent-button${on > 0 ? ' chat-agent-on' : ''}`}
        onClick={e => setAnchor(e.currentTarget)}
        title={title}
        aria-label="Agent tools"
      >
        <HandymanIcon sx={{ fontSize: '1rem' }} />
        <span className="chat-agent-label">{on > 0 ? `Tools ${on}` : 'Tools off'}</span>
      </button>
      <Menu
        anchorEl={anchor}
        open={!!anchor}
        onClose={() => setAnchor(null)}
        // Back to typing once the menu is gone
        disableRestoreFocus
        TransitionProps={{ onExited: onClosed }}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        PaperProps={{
          className: 'chat-agent-menu',
          sx: {
            minWidth: 275,
            maxWidth: 340,
            backgroundColor: 'var(--jp-layout-color1)',
            color: 'var(--jp-ui-font-color1)',
            border: '1px solid var(--jp-border-color1)'
          }
        }}
        MenuListProps={{ dense: true }}
      >
        <ListSubheader style={subheaderStyle}>What the AI may use</ListSubheader>
        <MenuItem disabled={!supported} onClick={toggle('notebook')} sx={itemSx}>
          {tick(supported && tools.notebook)}
          Read and change this notebook
        </MenuItem>
        <MenuItem disabled={!supported} onClick={toggle('environment')} sx={itemSx}>
          {tick(supported && tools.environment)}
          Look at the environment and install packages
        </MenuItem>
        <MenuItem disabled={!supported} onClick={toggle('web')} sx={itemSx}>
          {tick(supported && tools.web)}
          Search the web when needed
        </MenuItem>
        {!supported && (
          <MenuItem disabled sx={{ ...itemSx, fontSize: '0.78rem' }}>
            {unsupportedReason}
          </MenuItem>
        )}
        <Divider />
        <ListSubheader style={subheaderStyle}>Before it acts</ListSubheader>
        {APPROVALS.map(option => (
          <MenuItem
            key={option.value}
            onClick={() => {
              setAnchor(null);
              onChange({ approval: option.value });
            }}
            sx={itemSx}
          >
            {tick(approval === option.value)}
            {option.label}
          </MenuItem>
        ))}
        <MenuItem disabled sx={{ ...itemSx, fontSize: '0.75rem', opacity: 0.75 }}>
          Installing a package always asks first, whatever is chosen here.
        </MenuItem>
      </Menu>
    </>
  );
}
