import type { PluginMeta } from '../../../shared/types.js';
import { showWhenNodeBackend } from '../../helpers/show-when.js';

const meta: PluginMeta = {
  id: 'pino',
  label: 'Pino',
  description: 'High-performance JSON logging setup for Node backends with environment-aware level.',
  category: 'logging',
  platformSupport: 'backend-only',
  deps: [{ name: 'pino', version: '^9.5.0' }],
  devDeps: [{ name: 'pino-pretty', version: '^11.3.0' }],
  envVars: [],
  scripts: [],
  conflicts: ['winston'],
  requires: [],
  showWhen: showWhenNodeBackend,
  order: 2,
};

export default meta;
