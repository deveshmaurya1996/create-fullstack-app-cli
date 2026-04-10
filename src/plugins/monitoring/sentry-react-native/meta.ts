import type { PluginMeta } from '../../../shared/types.js';
import { showWhenMobileNonFlutter } from '../../helpers/show-when.js';

const meta: PluginMeta = {
  id: 'sentry-react-native',
  label: 'Sentry React Native',
  description:
    'Mobile-focused Sentry setup for React Native/Expo apps with helper wrappers.',
  category: 'monitoring',
  platformSupport: 'all',
  deps: [{ name: '@sentry/react-native', version: '^6.19.0' }],
  devDeps: [],
  envVars: [
    {
      key: 'SENTRY_DSN',
      defaultValue: '',
      comment: 'Sentry DSN for mobile app and backend',
      target: 'root',
    },
  ],
  scripts: [],
  conflicts: ['sentry', 'datadog'],
  requires: [],
  showWhen: showWhenMobileNonFlutter,
  order: 2,
};

export default meta;
