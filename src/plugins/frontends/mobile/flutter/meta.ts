import type { PluginMeta } from '../../../../shared/types.js';

const meta: PluginMeta = {
  id: 'flutter',
  label: 'Flutter',
  description: 'Flutter with Dart, Material Design, and go_router',
  category: 'frontend-mobile',
  platformSupport: 'mobile-only',
  deps: [],
  devDeps: [],
  envVars: [
    { key: 'API_URL', defaultValue: 'http://localhost:3000', comment: 'Backend API URL', target: 'frontend' },
  ],
  scripts: [
    { name: 'start', command: 'flutter run', target: 'frontend', description: 'Run app' },
    { name: 'build:android', command: 'flutter build apk', target: 'frontend', description: 'Build Android APK' },
    { name: 'build:ios', command: 'flutter build ios', target: 'frontend', description: 'Build iOS' },
    { name: 'test', command: 'flutter test', target: 'frontend', description: 'Run tests' },
  ],
  conflicts: ['expo', 'react-native-cli', 'react-vite', 'next', 'vue', 'svelte', 'angular'],
  requires: [],
  showWhen: (draft) => draft.platform === 'mobile' || draft.platform === 'both',
  skipStylingQuestion: true,
  skipNavigationQuestion: true,
  order: 3,
};

export default meta;