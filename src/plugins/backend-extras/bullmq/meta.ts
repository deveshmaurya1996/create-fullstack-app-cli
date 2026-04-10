import type { PluginMeta } from '../../../shared/types.js';
import { showWhenNodeBackend } from '../../helpers/show-when.js';

const meta: PluginMeta = {
  id: 'bullmq',
  label: 'BullMQ',
  description: 'Queue and background job processing setup with BullMQ for Node backends.',
  category: 'backend-extras',
  platformSupport: 'backend-only',
  deps: [
    { name: 'bullmq', version: '^5.34.0' },
    { name: 'ioredis', version: '^5.4.1' },
  ],
  devDeps: [],
  envVars: [],
  scripts: [],
  conflicts: [],
  requires: [],
  showWhen: showWhenNodeBackend,
  order: 7,
};

export default meta;
