import type { PluginMeta } from '../../../shared/types.js';
import { showAlways } from '../../helpers/show-when.js';

const meta: PluginMeta = {
  id: 'lint-staged',
  label: 'Lint Staged',
  description: 'Run linters/formatters only on staged files before commit.',
  category: 'devtools',
  platformSupport: 'all',
  deps: [],
  devDeps: [{ name: 'lint-staged', version: '^15.2.11' }],
  envVars: [],
  scripts: [],
  conflicts: [],
  requires: [],
  showWhen: showAlways,
  order: 4,
};

export default meta;
