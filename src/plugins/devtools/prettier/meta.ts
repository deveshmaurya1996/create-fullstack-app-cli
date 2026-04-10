import type { PluginMeta } from '../../../shared/types.js';
import { showAlways } from '../../helpers/show-when.js';

const meta: PluginMeta = {
  id: 'prettier',
  label: 'Prettier',
  description: 'Automated code formatting setup with Prettier configuration files.',
  category: 'devtools',
  platformSupport: 'all',
  deps: [],
  devDeps: [{ name: 'prettier', version: '^3.4.1' }],
  envVars: [],
  scripts: [{ name: 'format', command: 'prettier --write .', target: 'root' }],
  conflicts: [],
  requires: [],
  showWhen: showAlways,
  order: 2,
};

export default meta;
