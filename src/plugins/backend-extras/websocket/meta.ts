import type { PluginMeta } from '../../../shared/types.js';
import { showWhenNodeBackend } from '../../helpers/show-when.js';

const meta: PluginMeta = {
  id: 'websocket',
  label: 'WebSocket',
  description: 'Real-time WebSocket server setup with starter chat event handlers.',
  category: 'backend-extras',
  platformSupport: 'backend-only',
  deps: [{ name: 'ws', version: '^8.18.0' }],
  devDeps: [],
  envVars: [],
  scripts: [],
  conflicts: [],
  requires: [],
  showWhen: showWhenNodeBackend,
  order: 6,
};

export default meta;
