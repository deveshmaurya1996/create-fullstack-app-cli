import type { PluginMeta } from '../../../shared/types.js';

const meta: PluginMeta = {
  id: 'postgres',
  label: 'PostgreSQL',
  description: 'Relational database with strong ACID guarantees',
  category: 'database',
  platformSupport: 'backend-only',
  deps: [{ name: 'pg', version: '^8.13.1' }],
  devDeps: [
    { name: '@types/pg', version: '^8.11.10' },
    { name: '@types/node', version: '^22.10.0' },
  ],
  envVars: [
    {
      key: 'DATABASE_URL',
      defaultValue: 'postgresql://postgres:postgres@localhost:5432/myapp',
      comment: 'PostgreSQL connection URL',
      target: 'backend',
    },
    { key: 'PGHOST', defaultValue: 'localhost', comment: 'PostgreSQL host', target: 'backend' },
    { key: 'PGPORT', defaultValue: '5432', comment: 'PostgreSQL port', target: 'backend' },
    { key: 'PGUSER', defaultValue: 'postgres', comment: 'PostgreSQL user', target: 'backend' },
    { key: 'PGPASSWORD', defaultValue: 'postgres', comment: 'PostgreSQL password', target: 'backend' },
    { key: 'PGDATABASE', defaultValue: 'myapp', comment: 'PostgreSQL database name', target: 'backend' },
  ],
  scripts: [],
  conflicts: [],
  requires: [],
  showWhen: (draft) => draft.needBackend === true,
  order: 1,
};

export default meta;
