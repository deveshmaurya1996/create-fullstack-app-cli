import type { PluginMeta } from '../../../shared/types.js';
import { showWhenMobileNonFlutter } from '../../helpers/show-when.js';

const meta: PluginMeta = {
  id: 'expo-haptics',
  label: 'Expo Haptics',
  description: 'Haptic feedback helper utilities for Expo mobile interactions.',
  category: 'frontend-extras',
  platformSupport: 'all',
  deps: [{ name: 'expo-haptics', version: '^14.0.1' }],
  devDeps: [],
  envVars: [],
  scripts: [],
  conflicts: [],
  requires: [],
  showWhen: showWhenMobileNonFlutter,
  order: 16,
};

export default meta;
