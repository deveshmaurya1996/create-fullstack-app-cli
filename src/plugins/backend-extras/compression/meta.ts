import type { PluginMeta } from '../../../shared/types.js';
import { showWhenNodeBackend } from '../../helpers/show-when.js';

const meta: PluginMeta = {
  id: 'compression',
  label: 'Compression',
  description: 'Enable gzip/brotli compression middleware for Node backend responses.',
  category: 'backend-extras',
  platformSupport: 'backend-only',
  deps: [{ name: 'compression', version: '^1.7.5' }],
  devDeps: [],
  envVars: [],
  scripts: [],
  conflicts: [],
  requires: [],
  showWhen: showWhenNodeBackend,
  order: 11,
};

export default meta;
