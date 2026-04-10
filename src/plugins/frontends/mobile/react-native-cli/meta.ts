import type { PluginMeta } from '../../../../shared/types.js';

const meta: PluginMeta = {
  id: 'react-native-cli',
  label: 'React Native CLI',
  description: 'Bare React Native with full native control',
  category: 'frontend-mobile',
  platformSupport: 'mobile-only',
  deps: [
    { name: 'react', version: '^18.3.1' },
    { name: 'react-native', version: '^0.76.0' },
    { name: 'react-native-safe-area-context', version: '^4.14.0' },
    { name: 'react-native-screens', version: '^4.3.0' },
    { name: 'react-native-gesture-handler', version: '^2.20.2' },
    { name: '@react-navigation/native', version: '^7.0.14' },
    { name: '@react-navigation/native-stack', version: '^7.1.1' },
    { name: '@react-navigation/bottom-tabs', version: '^7.2.0' },
    { name: '@react-native-async-storage/async-storage', version: '^2.1.0' },
  ],
  devDeps: [
    { name: 'typescript', version: '^5.7.2' },
    { name: '@types/react', version: '^18.3.12' },
    { name: '@react-native/metro-config', version: '^0.76.0' },
    { name: '@react-native/typescript-config', version: '^0.76.0' },
    { name: '@babel/core', version: '^7.26.0' },
    { name: '@babel/runtime', version: '^7.26.0' },
    { name: 'react-native-dotenv', version: '^3.4.11' },
  ],
  envVars: [
    { key: 'RN_API_URL', defaultValue: 'http://localhost:3000', comment: 'Backend API URL', target: 'frontend' },
  ],
  scripts: [
    { name: 'start', command: 'react-native start', target: 'frontend', description: 'Start Metro' },
    { name: 'android', command: 'react-native run-android', target: 'frontend', description: 'Run on Android' },
    { name: 'ios', command: 'react-native run-ios', target: 'frontend', description: 'Run on iOS' },
  ],
  conflicts: ['expo', 'flutter', 'react-vite', 'next', 'vue', 'svelte', 'angular'],
  requires: [],
  showWhen: (draft) => draft.platform === 'mobile' || draft.platform === 'both',
  order: 2,
};

export default meta;