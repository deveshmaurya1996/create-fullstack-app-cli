import type { PluginMeta } from '../../../shared/types.js';

const sqlDatabases = new Set(['postgres', 'mysql', 'sqlite']);

const meta: PluginMeta = {
  id: 'typeorm',
  label: 'TypeORM',
  description: 'ORM supporting Active Record and Data Mapper patterns',
  category: 'orm',
  platformSupport: 'backend-only',
  deps: [
    { name: 'typeorm', version: '^0.3.20' },
    { name: 'reflect-metadata', version: '^0.2.2' },
    { name: 'pg', version: '^8.13.1' },
    { name: 'mysql2', version: '^3.11.0' },
    { name: 'better-sqlite3', version: '^11.6.0' },
  ],
  devDeps: [
    { name: 'tsx', version: '^4.19.0' },
    { name: '@types/node', version: '^22.10.0' },
  ],
  envVars: [],
  scripts: [
    { name: 'typeorm:seed', command: 'tsx src/db/seed-typeorm.ts', target: 'backend', description: 'Run TypeORM seed' },
  ],
  conflicts: ['prisma', 'drizzle', 'mongoose'],
  requires: [],
  showWhen: (draft) => {
    if (draft.backendFramework === 'django' || draft.backendFramework === 'fastapi') return false;
    if (draft.database === 'mongodb') return false;
    if (draft.database === 'none' || !draft.database) return false;
    return draft.needBackend === true && sqlDatabases.has(draft.database ?? '');
  },
  order: 3,
};

export default meta;
