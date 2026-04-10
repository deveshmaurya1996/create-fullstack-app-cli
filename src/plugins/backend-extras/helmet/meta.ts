import type { PluginMeta } from '../../../shared/types.js';
import { showWhenNodeBackend } from '../../helpers/show-when.js';

const meta: PluginMeta = {
  id: 'helmet',
  label: 'Helmet',
  description: 'HTTP security headers middleware for Node backends.',
  category: 'backend-extras',
  platformSupport: 'backend-only',
  deps: [{ name: 'helmet', version: '^8.0.0' }],
  devDeps: [],
  envVars: [],
  scripts: [],
  conflicts: [],
  requires: [],
  showWhen: showWhenNodeBackend,
  order: 5,
};

export default meta;
