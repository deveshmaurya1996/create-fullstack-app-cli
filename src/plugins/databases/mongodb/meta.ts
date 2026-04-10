import type { PluginMeta } from '../../../shared/types.js';

const meta: PluginMeta = {
  id: 'mongodb',
  label: 'MongoDB',
  description: 'Document database for flexible JSON-like documents',
  category: 'database',
  platformSupport: 'backend-only',
  deps: [{ name: 'mongodb', version: '^6.10.0' }],
  devDeps: [{ name: '@types/node', version: '^22.10.0' }],
  envVars: [
    {
      key: 'MONGODB_URI',
      defaultValue: 'mongodb://127.0.0.1:27017/myapp',
      comment: 'MongoDB connection URI',
      target: 'backend',
    },
    { key: 'MONGO_HOST', defaultValue: '127.0.0.1', comment: 'MongoDB host', target: 'backend' },
    { key: 'MONGO_PORT', defaultValue: '27017', comment: 'MongoDB port', target: 'backend' },
    { key: 'MONGO_DB', defaultValue: 'myapp', comment: 'MongoDB database name', target: 'backend' },
  ],
  scripts: [],
  conflicts: [],
  requires: [],
  showWhen: (draft) => draft.needBackend === true,
  order: 2,
};

export default meta;
