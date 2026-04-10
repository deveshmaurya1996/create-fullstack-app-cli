import type { PluginMeta } from '../../../shared/types.js';
import { showAlways } from '../../helpers/show-when.js';

const meta: PluginMeta = {
  id: 'vitest',
  label: 'Vitest',
  description: 'Fast unit testing setup for TypeScript projects using Vitest and jsdom.',
  category: 'testing',
  platformSupport: 'all',
  deps: [],
  devDeps: [
    { name: 'vitest', version: '^2.1.8' },
    { name: 'jsdom', version: '^25.0.1' },
  ],
  envVars: [],
  scripts: [
    { name: 'test', command: 'vitest run', target: 'root' },
    { name: 'test:watch', command: 'vitest', target: 'root' },
  ],
  conflicts: ['jest'],
  requires: [],
  showWhen: showAlways,
  order: 1,
};

export default meta;
