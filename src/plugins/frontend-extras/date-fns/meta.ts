import type { PluginMeta } from '../../../shared/types.js';
import { showWhenFrontend } from '../../helpers/show-when.js';

const meta: PluginMeta = {
  id: 'date-fns',
  label: 'Date Fns',
  description: 'Lightweight date utility helpers using date-fns for frontend formatting and parsing.',
  category: 'frontend-extras',
  platformSupport: 'all',
  deps: [{ name: 'date-fns', version: '^4.1.0' }],
  devDeps: [],
  envVars: [],
  scripts: [],
  conflicts: [],
  requires: [],
  showWhen: showWhenFrontend,
  order: 3,
};

export default meta;
