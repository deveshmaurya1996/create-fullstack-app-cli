import type { PluginMeta } from '../../../shared/types.js';

const sqlDatabases = new Set(['postgres', 'mysql', 'sqlite']);

const meta: PluginMeta = {
  id: 'drizzle',
  label: 'Drizzle ORM',
  description: 'Lightweight TypeScript ORM with SQL-like syntax and Drizzle Kit',
  category: 'orm',
  platformSupport: 'backend-only',
  deps: [
    { name: 'drizzle-orm', version: '^0.38.0' },
    { name: 'pg', version: '^8.13.1' },
    { name: 'mysql2', version: '^3.11.0' },
    { name: 'better-sqlite3', version: '^11.6.0' },
  ],
  devDeps: [
    { name: 'drizzle-kit', version: '^0.30.0' },
    { name: 'tsx', version: '^4.19.0' },
    { name: '@types/better-sqlite3', version: '^7.6.11' },
    { name: '@types/node', version: '^22.10.0' },
  ],
  envVars: [],
  scripts: [
    { name: 'drizzle:generate', command: 'drizzle-kit generate', target: 'backend', description: 'Generate SQL migrations' },
    { name: 'drizzle:migrate', command: 'drizzle-kit migrate', target: 'backend', description: 'Apply migrations' },
    { name: 'drizzle:push', command: 'drizzle-kit push', target: 'backend', description: 'Push schema to database' },
    { name: 'drizzle:studio', command: 'drizzle-kit studio', target: 'backend', description: 'Open Drizzle Studio' },
    { name: 'drizzle:seed', command: 'tsx src/db/seed.ts', target: 'backend', description: 'Run seed script' },
  ],
  conflicts: ['prisma', 'typeorm', 'mongoose'],
  requires: [],
  showWhen: (draft) => {
    if (draft.backendFramework === 'django' || draft.backendFramework === 'fastapi') return false;
    if (draft.database === 'mongodb') return false;
    if (draft.database === 'none' || !draft.database) return false;
    return draft.needBackend === true && sqlDatabases.has(draft.database ?? '');
  },
  order: 2,
};

export default meta;
