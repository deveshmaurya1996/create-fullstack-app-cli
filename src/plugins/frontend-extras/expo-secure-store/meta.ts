import type { PluginMeta } from '../../../shared/types.js';
import { showWhenMobileNonFlutter } from '../../helpers/show-when.js';

const meta: PluginMeta = {
  id: 'expo-secure-store',
  label: 'Expo Secure Store',
  description: 'Encrypted key-value secure storage helpers for Expo mobile apps.',
  category: 'frontend-extras',
  platformSupport: 'all',
  deps: [{ name: 'expo-secure-store', version: '~14.0.0' }],
  devDeps: [],
  envVars: [],
  scripts: [],
  conflicts: [],
  requires: [],
  showWhen: showWhenMobileNonFlutter,
  order: 6,
};

export default meta;
