import type { PluginMeta } from '../../../shared/types.js';
import { showAlways } from '../../helpers/show-when.js';

const meta: PluginMeta = {
  id: 'husky',
  label: 'Husky',
  description: 'Git hooks setup to enforce quality checks before commits and commit messages.',
  category: 'devtools',
  platformSupport: 'all',
  deps: [],
  devDeps: [{ name: 'husky', version: '^9.1.7' }],
  envVars: [],
  scripts: [{ name: 'prepare', command: 'husky', target: 'root' }],
  conflicts: [],
  requires: [],
  showWhen: showAlways,
  order: 3,
};

export default meta;
