import type { PluginMeta } from '../../../../shared/types.js';

const meta: PluginMeta = {
  id: 'expo',
  label: 'Expo',
  description: 'Expo SDK with managed workflow, OTA updates, and EAS',
  category: 'frontend-mobile',
  platformSupport: 'mobile-only',
  deps: [
    { name: 'expo', version: '~52.0.0' },
    { name: 'expo-constants', version: '~17.0.0' },
    { name: 'expo-linking', version: '~7.0.0' },
    { name: 'expo-status-bar', version: '~2.0.0' },
    { name: 'react', version: '^18.3.1' },
    { name: 'react-native', version: '^0.76.0' },
    { name: 'react-native-safe-area-context', version: '^4.14.0' },
    { name: 'react-native-screens', version: '^4.3.0' },
    { name: 'expo-secure-store', version: '~14.0.0' },
  ],
  devDeps: [
    { name: 'typescript', version: '^5.7.2' },
    { name: '@types/react', version: '^18.3.12' },
    { name: '@babel/core', version: '^7.26.0' },
  ],
  envVars: [
    { key: 'EXPO_PUBLIC_API_URL', defaultValue: 'http://localhost:3000', comment: 'Backend API base URL', target: 'frontend' },
    { key: 'EXPO_PUBLIC_APP_NAME', defaultValue: 'My App', comment: 'Application display name', target: 'frontend' },
  ],
  scripts: [
    { name: 'start', command: 'expo start', target: 'frontend', description: 'Start Expo dev server' },
    { name: 'android', command: 'expo run:android', target: 'frontend', description: 'Run on Android' },
    { name: 'ios', command: 'expo run:ios', target: 'frontend', description: 'Run on iOS' },
    { name: 'web', command: 'expo start --web', target: 'frontend', description: 'Run on web' },
  ],
  conflicts: ['react-vite', 'next', 'vue', 'svelte', 'angular', 'react-native-cli', 'flutter'],
  requires: [],
  showWhen: (draft) => draft.platform === 'mobile' || draft.platform === 'both',
  order: 1,
};

export default meta;