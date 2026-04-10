import type { PluginMeta } from '../../../shared/types.js';

const meta: PluginMeta = {
  id: 'redis',
  label: 'Redis',
  description: 'In-memory cache, pub/sub, and data structures server',
  category: 'database',
  platformSupport: 'backend-only',
  deps: [{ name: 'ioredis', version: '^5.4.1' }],
  devDeps: [{ name: '@types/node', version: '^22.10.0' }],
  envVars: [
    {
      key: 'REDIS_URL',
      defaultValue: 'redis://127.0.0.1:6379',
      comment: 'Redis connection URL',
      target: 'backend',
    },
    { key: 'REDIS_HOST', defaultValue: '127.0.0.1', comment: 'Redis host', target: 'backend' },
    { key: 'REDIS_PORT', defaultValue: '6379', comment: 'Redis port', target: 'backend' },
  ],
  scripts: [],
  conflicts: [],
  requires: [],
  showWhen: (draft) => draft.needBackend === true,
  order: 5,
};

export default meta;
