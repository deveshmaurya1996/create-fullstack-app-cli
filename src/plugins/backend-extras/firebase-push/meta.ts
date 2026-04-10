import type { PluginMeta } from '../../../shared/types.js';
import { showWhenNodeBackend } from '../../helpers/show-when.js';

const meta: PluginMeta = {
  id: 'firebase-push',
  label: 'Firebase Push',
  description: 'Firebase Cloud Messaging push notification setup for backend-triggered sends.',
  category: 'backend-extras',
  platformSupport: 'backend-only',
  deps: [{ name: 'firebase-admin', version: '^12.7.0' }],
  devDeps: [],
  envVars: [
    {
      key: 'FIREBASE_SERVICE_ACCOUNT_JSON',
      defaultValue: '',
      comment: 'Serialized Firebase service account credentials JSON',
      target: 'root',
    },
  ],
  scripts: [],
  conflicts: [],
  requires: [],
  showWhen: showWhenNodeBackend,
  order: 8,
};

export default meta;
