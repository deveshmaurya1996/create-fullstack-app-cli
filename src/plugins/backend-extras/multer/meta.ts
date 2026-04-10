import type { PluginMeta } from '../../../shared/types.js';
import { showWhenNodeBackend } from '../../helpers/show-when.js';

const meta: PluginMeta = {
  id: 'multer',
  label: 'Multer',
  description: 'Multipart file upload handling middleware and upload route scaffolding.',
  category: 'backend-extras',
  platformSupport: 'backend-only',
  deps: [{ name: 'multer', version: '^1.4.5-lts.1' }],
  devDeps: [],
  envVars: [],
  scripts: [],
  conflicts: [],
  requires: [],
  showWhen: showWhenNodeBackend,
  order: 1,
};

export default meta;
