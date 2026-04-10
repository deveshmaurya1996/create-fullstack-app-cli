import type { PluginMeta } from '../../../shared/types.js';
import { showWhenAuth } from '../../helpers/show-when.js';

const meta: PluginMeta = {
  id: 'clerk',
  label: 'Clerk',
  description: 'Managed auth integration with Clerk providers for web/mobile and route protection.',
  category: 'auth',
  platformSupport: 'all',
  deps: [
    { name: '@clerk/nextjs', version: '^6.6.0' },
    { name: '@clerk/clerk-react', version: '^5.19.0' },
  ],
  devDeps: [],
  envVars: [
    { key: 'CLERK_PUBLISHABLE_KEY', defaultValue: '', comment: 'Clerk publishable key', target: 'root' },
    { key: 'CLERK_SECRET_KEY', defaultValue: '', comment: 'Clerk secret key', target: 'root' },
  ],
  scripts: [],
  conflicts: ['jwt-custom', 'next-auth', 'lucia'],
  requires: [],
  showWhen: showWhenAuth,
  order: 3,
};

export default meta;
