import type { PluginMeta } from '../../../shared/types.js';
import { showAlways } from '../../helpers/show-when.js';

const meta: PluginMeta = {
  id: 'supertest',
  label: 'Supertest',
  description: 'HTTP API integration testing setup for Node backends with Supertest.',
  category: 'testing',
  platformSupport: 'all',
  deps: [],
  devDeps: [{ name: 'supertest', version: '^7.0.0' }],
  envVars: [],
  scripts: [],
  conflicts: [],
  requires: [],
  showWhen: showAlways,
  order: 9,
};

export default meta;
