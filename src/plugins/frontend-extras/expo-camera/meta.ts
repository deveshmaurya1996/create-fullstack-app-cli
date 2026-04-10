import type { PluginMeta } from '../../../shared/types.js';
import { showWhenMobileNonFlutter } from '../../helpers/show-when.js';

const meta: PluginMeta = {
  id: 'expo-camera',
  label: 'Expo Camera',
  description: 'Camera capture utilities and reusable camera component for Expo mobile apps.',
  category: 'frontend-extras',
  platformSupport: 'all',
  deps: [{ name: 'expo-camera', version: '^16.0.12' }],
  devDeps: [],
  envVars: [],
  scripts: [],
  conflicts: [],
  requires: [],
  showWhen: showWhenMobileNonFlutter,
  order: 12,
};

export default meta;
