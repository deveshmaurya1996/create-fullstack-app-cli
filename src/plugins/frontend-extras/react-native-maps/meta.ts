import type { PluginMeta } from '../../../shared/types.js';
import { showWhenMobileNonFlutter } from '../../helpers/show-when.js';

const meta: PluginMeta = {
  id: 'react-native-maps',
  label: 'React Native Maps',
  description: 'Map and marker UI components with example map screen for React Native.',
  category: 'frontend-extras',
  platformSupport: 'all',
  deps: [{ name: 'react-native-maps', version: '^1.18.0' }],
  devDeps: [],
  envVars: [],
  scripts: [],
  conflicts: [],
  requires: [],
  showWhen: showWhenMobileNonFlutter,
  order: 10,
};

export default meta;
