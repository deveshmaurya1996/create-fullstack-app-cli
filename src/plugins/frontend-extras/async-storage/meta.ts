import type { PluginMeta } from '../../../shared/types.js';
import { showWhenMobileNonFlutter } from '../../helpers/show-when.js';

const meta: PluginMeta = {
  id: 'async-storage',
  label: 'Async Storage',
  description: 'Persistent key-value storage helpers for React Native using Async Storage.',
  category: 'frontend-extras',
  platformSupport: 'all',
  deps: [{ name: '@react-native-async-storage/async-storage', version: '^1.23.1' }],
  devDeps: [],
  envVars: [],
  scripts: [],
  conflicts: [],
  requires: [],
  showWhen: showWhenMobileNonFlutter,
  order: 5,
};

export default meta;
