import type { PluginMeta } from '../../../shared/types.js';

const meta: PluginMeta = {
  id: 'mysql',
  label: 'MySQL',
  description: 'Popular open-source relational database',
  category: 'database',
  platformSupport: 'backend-only',
  deps: [{ name: 'mysql2', version: '^3.11.0' }],
  devDeps: [{ name: '@types/node', version: '^22.10.0' }],
  envVars: [
    {
      key: 'DATABASE_URL',
      defaultValue: 'mysql://root:password@localhost:3306/mydb',
      comment: 'MySQL connection string',
      target: 'backend',
    },
    { key: 'DB_HOST', defaultValue: 'localhost', comment: 'MySQL host', target: 'backend' },
    { key: 'DB_PORT', defaultValue: '3306', comment: 'MySQL port', target: 'backend' },
    { key: 'DB_USER', defaultValue: 'root', comment: 'MySQL user', target: 'backend' },
    { key: 'DB_PASSWORD', defaultValue: 'password', comment: 'MySQL password', target: 'backend' },
    { key: 'DB_NAME', defaultValue: 'mydb', comment: 'MySQL database name', target: 'backend' },
  ],
  scripts: [],
  conflicts: [],
  requires: [],
  showWhen: (draft) => draft.needBackend === true,
  order: 3,
};

export default meta;
