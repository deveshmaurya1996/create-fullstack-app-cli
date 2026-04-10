import type { PluginMeta } from '../../../shared/types.js';
import { showWhenMobileNonFlutter } from '../../helpers/show-when.js';

const meta: PluginMeta = {
  id: 'react-native-reanimated',
  label: 'React Native Reanimated',
  description: 'High-performance animation primitives and starter animated component for React Native.',
  category: 'frontend-extras',
  platformSupport: 'all',
  deps: [{ name: 'react-native-reanimated', version: '^3.16.1' }],
  devDeps: [],
  envVars: [],
  scripts: [],
  conflicts: [],
  requires: [],
  showWhen: showWhenMobileNonFlutter,
  order: 8,
};

export default meta;
