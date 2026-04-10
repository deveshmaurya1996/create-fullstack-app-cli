import type { PluginMeta } from '../../../shared/types.js';
import { showWhenNodeBackend } from '../../helpers/show-when.js';

const meta: PluginMeta = {
  id: 'cors-config',
  label: 'CORS Config',
  description: 'Configurable CORS middleware for Node backends.',
  category: 'backend-extras',
  platformSupport: 'backend-only',
  deps: [{ name: 'cors', version: '^2.8.5' }],
  devDeps: [],
  envVars: [],
  scripts: [],
  conflicts: [],
  requires: [],
  showWhen: showWhenNodeBackend,
  order: 4,
};

export default meta;
