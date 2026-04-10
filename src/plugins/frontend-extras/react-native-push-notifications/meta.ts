import type { PluginMeta } from '../../../shared/types.js';
import { showWhenMobileNonFlutter } from '../../helpers/show-when.js';

const meta: PluginMeta = {
  id: 'react-native-push-notifications',
  label: 'React Native Push Notifications',
  description: 'Push notification setup helpers and hook for React Native mobile apps.',
  category: 'frontend-extras',
  platformSupport: 'all',
  deps: [{ name: 'react-native-push-notification', version: '^8.1.1' }],
  devDeps: [],
  envVars: [],
  scripts: [],
  conflicts: [],
  requires: [],
  showWhen: showWhenMobileNonFlutter,
  order: 11,
};

export default meta;
