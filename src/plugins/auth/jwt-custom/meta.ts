import type { PluginMeta } from '../../../shared/types.js';
import { showWhenAuth } from '../../helpers/show-when.js';

const meta: PluginMeta = {
  id: 'jwt-custom',
  label: 'JWT Custom',
  description: 'Custom JWT authentication flow with backend token issuance and frontend auth helpers.',
  category: 'auth',
  platformSupport: 'all',
  deps: [
    { name: 'jsonwebtoken', version: '^9.0.2' },
    { name: 'bcryptjs', version: '^2.4.3' },
  ],
  devDeps: [],
  envVars: [
    { key: 'JWT_SECRET', defaultValue: 'change-me', comment: 'JWT signing secret', target: 'root' },
    { key: 'JWT_EXPIRES_IN', defaultValue: '7d', comment: 'JWT expiration time', target: 'root' },
  ],
  scripts: [],
  conflicts: ['next-auth', 'clerk', 'lucia'],
  requires: [],
  showWhen: showWhenAuth,
  order: 1,
};

export default meta;
