import type { PluginMeta } from '../../../shared/types.js';
import { showWhenNodeBackend } from '../../helpers/show-when.js';

const meta: PluginMeta = {
  id: 'cron',
  label: 'Cron',
  description: 'Scheduled background jobs setup for Node backends.',
  category: 'backend-extras',
  platformSupport: 'backend-only',
  deps: [{ name: 'node-cron', version: '^3.0.3' }],
  devDeps: [],
  envVars: [],
  scripts: [],
  conflicts: [],
  requires: [],
  showWhen: showWhenNodeBackend,
  order: 12,
};

export default meta;
