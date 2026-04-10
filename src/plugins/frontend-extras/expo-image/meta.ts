import type { PluginMeta } from '../../../shared/types.js';
import { showWhenMobileNonFlutter } from '../../helpers/show-when.js';

const meta: PluginMeta = {
  id: 'expo-image',
  label: 'Expo Image',
  description: 'Optimized image loading component wrapper for Expo apps.',
  category: 'frontend-extras',
  platformSupport: 'all',
  deps: [{ name: 'expo-image', version: '^2.0.5' }],
  devDeps: [],
  envVars: [],
  scripts: [],
  conflicts: [],
  requires: [],
  showWhen: showWhenMobileNonFlutter,
  order: 7,
};

export default meta;
