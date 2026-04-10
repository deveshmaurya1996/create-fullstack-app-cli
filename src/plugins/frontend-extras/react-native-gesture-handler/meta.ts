import type { PluginMeta } from '../../../shared/types.js';
import { showWhenMobileNonFlutter } from '../../helpers/show-when.js';

const meta: PluginMeta = {
  id: 'react-native-gesture-handler',
  label: 'React Native Gesture Handler',
  description: 'Gesture-driven interactions with swipeable card starter component for React Native.',
  category: 'frontend-extras',
  platformSupport: 'all',
  deps: [{ name: 'react-native-gesture-handler', version: '^2.20.2' }],
  devDeps: [],
  envVars: [],
  scripts: [],
  conflicts: [],
  requires: [],
  showWhen: showWhenMobileNonFlutter,
  order: 14,
};

export default meta;
