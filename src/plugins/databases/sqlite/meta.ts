import type { PluginMeta } from '../../../shared/types.js';

const meta: PluginMeta = {
  id: 'sqlite',
  label: 'SQLite',
  description: 'Embedded file-based SQL database',
  category: 'database',
  platformSupport: 'backend-only',
  deps: [{ name: 'better-sqlite3', version: '^11.6.0' }],
  devDeps: [
    { name: '@types/better-sqlite3', version: '^7.6.11' },
    { name: '@types/node', version: '^22.10.0' },
  ],
  envVars: [
    {
      key: 'DATABASE_URL',
      defaultValue: 'file:./dev.db',
      comment: 'SQLite file URL (Prisma-style)',
      target: 'backend',
    },
    { key: 'SQLITE_PATH', defaultValue: './dev.db', comment: 'SQLite database file path', target: 'backend' },
  ],
  scripts: [],
  conflicts: [],
  requires: [],
  showWhen: (draft) => draft.needBackend === true,
  order: 4,
};

export default meta;
