import type { PluginMeta } from '../../../shared/types.js';

const meta: PluginMeta = {
  id: 'mongoose',
  label: 'Mongoose',
  description: 'MongoDB object modeling for Node.js',
  category: 'orm',
  platformSupport: 'backend-only',
  deps: [{ name: 'mongoose', version: '^8.8.0' }],
  devDeps: [
    { name: 'tsx', version: '^4.19.0' },
    { name: '@types/node', version: '^22.10.0' },
  ],
  envVars: [],
  scripts: [
    { name: 'mongoose:seed', command: 'tsx src/db/seed-mongoose.ts', target: 'backend', description: 'Run Mongoose seed' },
  ],
  conflicts: ['prisma', 'drizzle', 'typeorm'],
  requires: ['mongodb'],
  showWhen: (draft) =>
    draft.needBackend === true &&
    draft.database === 'mongodb' &&
    draft.backendFramework !== 'django' &&
    draft.backendFramework !== 'fastapi',
  order: 4,
};

export default meta;
