import type { PluginMeta } from '../../../shared/types.js';
import { showWhenWebFrontend } from '../../helpers/show-when.js';

const meta: PluginMeta = {
  id: 'next-auth',
  label: 'NextAuth',
  description: 'Authentication setup for Next.js using NextAuth with session provider and middleware.',
  category: 'auth',
  platformSupport: 'all',
  deps: [{ name: 'next-auth', version: '^5.0.0-beta.25' }],
  devDeps: [],
  envVars: [
    { key: 'AUTH_SECRET', defaultValue: 'change-me', comment: 'Auth.js secret', target: 'root' },
    { key: 'AUTH_URL', defaultValue: 'http://localhost:3000', comment: 'Auth.js base URL', target: 'root' },
  ],
  scripts: [],
  conflicts: ['jwt-custom', 'clerk', 'lucia'],
  requires: [],
  showWhen: showWhenWebFrontend,
  order: 2,
};

export default meta;
