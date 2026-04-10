import type { PluginMeta } from '../../../shared/types.js';
import { showWhenNodeBackend } from '../../helpers/show-when.js';

const meta: PluginMeta = {
  id: 'winston',
  label: 'Winston',
  description: 'Flexible multi-transport backend logger setup with timestamped structured messages.',
  category: 'logging',
  platformSupport: 'backend-only',
  deps: [{ name: 'winston', version: '^3.17.0' }],
  devDeps: [],
  envVars: [],
  scripts: [],
  conflicts: ['pino'],
  requires: [],
  showWhen: showWhenNodeBackend,
  order: 1,
};

export default meta;
