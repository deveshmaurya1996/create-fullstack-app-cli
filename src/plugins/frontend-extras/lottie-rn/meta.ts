import type { PluginMeta } from '../../../shared/types.js';
import { showWhenMobileNonFlutter } from '../../helpers/show-when.js';

const meta: PluginMeta = {
  id: 'lottie-rn',
  label: 'Lottie RN',
  description: 'Lottie animation component and sample animation asset for React Native.',
  category: 'frontend-extras',
  platformSupport: 'all',
  deps: [{ name: 'lottie-react-native', version: '^7.1.0' }],
  devDeps: [],
  envVars: [],
  scripts: [],
  conflicts: [],
  requires: [],
  showWhen: showWhenMobileNonFlutter,
  order: 9,
};

export default meta;
