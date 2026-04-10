import type { PluginMeta } from '../../../shared/types.js';
import { showWhenMobileNonFlutter } from '../../helpers/show-when.js';

const meta: PluginMeta = {
  id: 'react-navigation',
  label: 'React Navigation',
  description:
    'Stack and tabs navigation setup for React Native apps with typed routes and linking config.',
  category: 'mobile-navigation',
  platformSupport: 'mobile-only',
  deps: [
    { name: '@react-navigation/native', version: '^7.0.14' },
    { name: '@react-navigation/native-stack', version: '^7.1.1' },
    { name: '@react-navigation/bottom-tabs', version: '^7.2.0' },
    { name: 'react-native-screens', version: '^4.3.0' },
    { name: 'react-native-safe-area-context', version: '^4.12.0' },
  ],
  devDeps: [],
  envVars: [],
  scripts: [],
  conflicts: ['expo-router'],
  requires: [],
  showWhen: (draft) =>
    showWhenMobileNonFlutter(draft) &&
    (draft.mobileFramework === 'react-native-cli' ||
      (draft.mobileFramework === 'expo' && draft.mobileNavigation === 'react-navigation')),
  order: 1,
};

export default meta;
