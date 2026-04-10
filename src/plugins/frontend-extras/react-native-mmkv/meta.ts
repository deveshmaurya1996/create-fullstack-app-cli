import type { PluginMeta } from '../../../shared/types.js';
import { showWhenMobileNonFlutter } from '../../helpers/show-when.js';

const meta: PluginMeta = {
  id: 'react-native-mmkv',
  label: 'React Native MMKV',
  description: 'Fast key-value storage utilities using MMKV for React Native apps.',
  category: 'frontend-extras',
  platformSupport: 'all',
  deps: [{ name: 'react-native-mmkv', version: '^2.12.2' }],
  devDeps: [],
  envVars: [],
  scripts: [],
  conflicts: [],
  requires: [],
  showWhen: showWhenMobileNonFlutter,
  order: 17,
};

export default meta;
