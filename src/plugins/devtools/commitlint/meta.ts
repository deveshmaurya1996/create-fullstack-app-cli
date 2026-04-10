import type { PluginMeta } from '../../../shared/types.js';
import { showAlways } from '../../helpers/show-when.js';

const meta: PluginMeta = {
  id: 'commitlint',
  label: 'Commitlint',
  description: 'Conventional commit message validation setup for consistent commit history.',
  category: 'devtools',
  platformSupport: 'all',
  deps: [],
  devDeps: [
    { name: '@commitlint/cli', version: '^19.6.0' },
    { name: '@commitlint/config-conventional', version: '^19.6.0' },
  ],
  envVars: [],
  scripts: [],
  conflicts: [],
  requires: [],
  showWhen: showAlways,
  order: 5,
};

export default meta;
