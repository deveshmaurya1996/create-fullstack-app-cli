import type { PluginMeta } from '../../../shared/types.js';
import { showWhenAuth } from '../../helpers/show-when.js';

const meta: PluginMeta = {
  id: 'lucia',
  label: 'Lucia',
  description: 'Session-based authentication using Lucia with backend middleware and routes.',
  category: 'auth',
  platformSupport: 'all',
  deps: [
    { name: 'lucia', version: '^3.2.0' },
    { name: 'oslo', version: '^1.2.1' },
  ],
  devDeps: [],
  envVars: [],
  scripts: [],
  conflicts: ['jwt-custom', 'next-auth', 'clerk'],
  requires: [],
  showWhen: showWhenAuth,
  order: 4,
};

export default meta;
