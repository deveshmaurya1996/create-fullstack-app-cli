import type { PluginMeta } from '../../../shared/types.js';
import { showAlways } from '../../helpers/show-when.js';

const meta: PluginMeta = {
  id: 'eslint',
  label: 'ESLint',
  description: 'Linting setup for JavaScript/TypeScript code quality and consistency.',
  category: 'devtools',
  platformSupport: 'all',
  deps: [],
  devDeps: [
    { name: 'eslint', version: '^9.15.0' },
    { name: '@typescript-eslint/parser', version: '^8.18.0' },
    { name: '@typescript-eslint/eslint-plugin', version: '^8.18.0' },
  ],
  envVars: [],
  scripts: [{ name: 'lint', command: 'eslint .', target: 'root' }],
  conflicts: [],
  requires: [],
  showWhen: showAlways,
  order: 1,
};

export default meta;
