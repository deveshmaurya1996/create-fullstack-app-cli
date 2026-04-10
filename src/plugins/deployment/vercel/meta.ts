import type { PluginMeta } from '../../../shared/types.js';
import { showAlways } from '../../helpers/show-when.js';

const meta: PluginMeta = {
  id: 'vercel',
  label: 'Vercel',
  description: 'Vercel deployment routing and build configuration for fullstack apps.',
  category: 'deployment',
  platformSupport: 'all',
  deps: [],
  devDeps: [],
  envVars: [],
  scripts: [],
  conflicts: [],
  requires: [],
  showWhen: showAlways,
  order: 1,
};

export default meta;
