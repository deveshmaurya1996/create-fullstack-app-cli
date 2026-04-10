import type { PluginMeta } from '../../../shared/types.js';
import { showWhenMobileNonFlutter } from '../../helpers/show-when.js';

const meta: PluginMeta = {
  id: 'expo-router',
  label: 'Expo Router',
  description:
    'File-based routes under `app/` and `expo-router` (default for Expo when React Navigation is not chosen).',
  category: 'mobile-navigation',
  platformSupport: 'mobile-only',
  deps: [{ name: 'expo-router', version: '^4.0.9' }],
  devDeps: [],
  envVars: [],
  scripts: [],
  conflicts: ['react-navigation'],
  requires: [],
  showWhen: (draft) =>
    showWhenMobileNonFlutter(draft) &&
    draft.mobileFramework === 'expo' &&
    draft.mobileNavigation !== 'react-navigation',
  order: 2,
};

export default meta;
