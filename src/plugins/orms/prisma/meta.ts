import type { PluginMeta } from '../../../shared/types.js';

const meta: PluginMeta = {
  id: 'prisma',
  label: 'Prisma',
  description: 'Type-safe ORM with auto-generated client, migrations, and studio',
  category: 'orm',
  platformSupport: 'backend-only',
  deps: [
    { name: '@prisma/client', version: '^7.7.0' },
    { name: '@prisma/adapter-pg', version: '^7.7.0' },
  ],
  devDeps: [
    { name: 'prisma', version: '^7.7.0' },
    { name: 'tsx', version: '^4.19.0' },
  ],
  envVars: [],
  scripts: [
    { name: 'db:generate', command: 'prisma generate', target: 'backend', description: 'Generate Prisma client' },
    { name: 'db:push', command: 'prisma db push', target: 'backend', description: 'Push schema to database' },
    { name: 'db:migrate', command: 'prisma migrate dev', target: 'backend', description: 'Run migrations' },
    {
      name: 'db:migrate:prod',
      command: 'prisma migrate deploy',
      target: 'backend',
      description: 'Deploy migrations in production',
    },
    { name: 'db:studio', command: 'prisma studio', target: 'backend', description: 'Open Prisma Studio GUI' },
    { name: 'db:seed', command: 'tsx prisma/seed.ts', target: 'backend', description: 'Seed the database' },
    {
      name: 'db:reset',
      command: 'prisma migrate reset',
      target: 'backend',
      description: 'Reset database and rerun migrations',
    },
  ],
  conflicts: ['drizzle', 'typeorm', 'mongoose'],
  requires: [],
  showWhen: (draft) => {
    if (draft.backendFramework === 'django' || draft.backendFramework === 'fastapi') return false;
    if (draft.database === 'mongodb') return false;
    if (draft.database === 'none' || !draft.database) return false;
    return draft.needBackend === true;
  },
  order: 1,
};

export default meta;
