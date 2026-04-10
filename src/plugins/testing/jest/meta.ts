import type { PluginMeta } from '../../../shared/types.js';
import { showAlways } from '../../helpers/show-when.js';

const meta: PluginMeta = {
  id: 'jest',
  label: 'Jest',
  description: 'Jest-based unit testing setup with ts-jest and baseline test scaffolding.',
  category: 'testing',
  platformSupport: 'all',
  deps: [],
  devDeps: [
    { name: 'jest', version: '^29.7.0' },
    { name: 'ts-jest', version: '^29.2.5' },
    { name: '@types/jest', version: '^29.5.14' },
  ],
  envVars: [],
  scripts: [
    { name: 'test', command: 'jest', target: 'root' },
    { name: 'test:watch', command: 'jest --watch', target: 'root' },
  ],
  conflicts: ['vitest'],
  requires: [],
  showWhen: showAlways,
  order: 2,
};

export default meta;
