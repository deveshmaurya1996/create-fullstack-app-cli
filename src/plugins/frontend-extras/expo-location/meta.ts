import type { PluginMeta } from '../../../shared/types.js';
import { showWhenMobileNonFlutter } from '../../helpers/show-when.js';

const meta: PluginMeta = {
  id: 'expo-location',
  label: 'Expo Location',
  description: 'Location permission/request helpers and hook for Expo mobile apps.',
  category: 'frontend-extras',
  platformSupport: 'all',
  deps: [{ name: 'expo-location', version: '^18.0.2' }],
  devDeps: [],
  envVars: [],
  scripts: [],
  conflicts: [],
  requires: [],
  showWhen: showWhenMobileNonFlutter,
  order: 13,
};

export default meta;
