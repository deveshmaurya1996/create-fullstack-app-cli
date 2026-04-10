import type { PluginMeta } from '../../../shared/types.js';
import { showWhenMobileNonFlutter } from '../../helpers/show-when.js';

const meta: PluginMeta = {
  id: 'react-native-bottom-sheet',
  label: 'React Native Bottom Sheet',
  description: 'Bottom sheet UI integration with starter component for React Native.',
  category: 'frontend-extras',
  platformSupport: 'all',
  deps: [{ name: '@gorhom/bottom-sheet', version: '^5.1.0' }],
  devDeps: [],
  envVars: [],
  scripts: [],
  conflicts: [],
  requires: [],
  showWhen: showWhenMobileNonFlutter,
  order: 18,
};

export default meta;
