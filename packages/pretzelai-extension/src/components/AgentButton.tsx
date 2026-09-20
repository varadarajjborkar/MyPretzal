/*
 * Copyright (c) Pretzel AI GmbH.
 * This file is part of the Pretzel project and is licensed under the
 * GNU Affero General Public License version 3.
 * See the LICENSE_AGPLv3 file at the root of the project for the full license text.
 * Contributions by contributors listed in the PRETZEL_CONTRIBUTORS file (found at
 * the root of the project) are licensed under AGPLv3.
 */
import CheckIcon from '@mui/icons-material/Check';
import PublicIcon from '@mui/icons-material/Public';
import { Divider, ListSubheader, Menu, MenuItem } from '@mui/material';
import React, { useState } from 'react';

/** What happens when the agent wants to use a tool. */
export type AgentApproval = 'auto' | 'ask';

interface IAgentButtonProps {
  enabled: boolean;
  approval: AgentApproval;
  /** False when the chosen model can't use tools; the button then explains instead of turning on. */
  supported: boolean;
  unsupportedReason?: string;
  onChange: (change: { enabled?: boolean; approval?: AgentApproval }) => void;
  onClosed: () => void;
}

/**
 * Turns web search on for the chat, and chooses whether tool calls run by themselves or wait
 * for a click.
 */
export function AgentButton({
  enabled,
  approval,
  supported,
  unsupportedReason,
  onChange,
  onClosed
}: IAgentButtonProps): JSX.Element {
  const [anchor, setAnchor] = useState<HTMLElement | null>(null);
  const itemSx = {
    color: 'var(--jp-ui-font-color1)',
    '&:hover': { backgroundColor: 'var(--jp-layout-color2)' }
  };
  const subheaderStyle = { backgroundColor: 'var(--jp-layout-color1)', color: 'var(--jp-ui-font-color2)' };
  const tick = (shown: boolean) => (
    <CheckIcon sx={{ fontSize: '1rem', marginRight: '6px', opacity: shown ? 1 : 0 }} />
  );

  const title = supported
    ? enabled
      ? `Web search is on. Tools ${approval === 'auto' ? 'run automatically' : 'ask first'}. Click to change.`
      : 'Web search is off. Click to let the AI search and read pages.'
    : unsupportedReason || 'This model cannot use web search.';

  return (
    <>
      <button
        className={`chat-agent-button${enabled && supported ? ' chat-agent-on' : ''}`}
        onClick={e => setAnchor(e.currentTarget)}
        title={title}
        aria-label="Web search"
      >
        <PublicIcon sx={{ fontSize: '1rem' }} />
        <span className="chat-agent-label">{enabled && supported ? 'Web' : 'Web off'}</span>
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
            minWidth: 260,
            maxWidth: 340,
            backgroundColor: 'var(--jp-layout-color1)',
            color: 'var(--jp-ui-font-color1)',
            border: '1px solid var(--jp-border-color1)'
          }
        }}
        MenuListProps={{ dense: true }}
      >
        <MenuItem
          disabled={!supported}
          onClick={() => {
            setAnchor(null);
            onChange({ enabled: !enabled });
          }}
          sx={itemSx}
        >
          {tick(enabled && supported)}
          Search the web when needed
        </MenuItem>
        {!supported && (
          <MenuItem disabled sx={{ ...itemSx, fontSize: '0.78rem', whiteSpace: 'normal' }}>
            {unsupportedReason}
          </MenuItem>
        )}
        <Divider />
        <ListSubheader style={subheaderStyle}>When the AI wants to use a tool</ListSubheader>
        <MenuItem
          onClick={() => {
            setAnchor(null);
            onChange({ approval: 'auto' });
          }}
          sx={itemSx}
        >
          {tick(approval === 'auto')}
          Let it run
        </MenuItem>
        <MenuItem
          onClick={() => {
            setAnchor(null);
            onChange({ approval: 'ask' });
          }}
          sx={itemSx}
        >
          {tick(approval === 'ask')}
          Ask me first
        </MenuItem>
      </Menu>
    </>
  );
}
