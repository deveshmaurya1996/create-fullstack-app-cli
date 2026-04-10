import type { PluginMeta } from '../../../shared/types.js';
import { showWhenMobileNonFlutter } from '../../helpers/show-when.js';

const meta: PluginMeta = {
  id: 'react-native-svg',
  label: 'React Native SVG',
  description: 'SVG rendering support with reusable icon component for React Native.',
  category: 'frontend-extras',
  platformSupport: 'all',
  deps: [{ name: 'react-native-svg', version: '^15.8.0' }],
  devDeps: [],
  envVars: [],
  scripts: [],
  conflicts: [],
  requires: [],
  showWhen: showWhenMobileNonFlutter,
  order: 15,
};

export default meta;
