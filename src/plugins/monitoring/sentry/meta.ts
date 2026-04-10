import type { PluginMeta } from '../../../shared/types.js';
import { showAlways } from '../../helpers/show-when.js';

const meta: PluginMeta = {
  id: 'sentry',
  label: 'Sentry',
  description: 'Error and performance monitoring for web and backend with Sentry SDK setup files.',
  category: 'monitoring',
  platformSupport: 'all',
  deps: [
    { name: '@sentry/node', version: '^8.40.0' },
    { name: '@sentry/react', version: '^8.40.0' },
  ],
  devDeps: [],
  envVars: [
    {
      key: 'SENTRY_DSN',
      defaultValue: '',
      comment: 'Sentry DSN used by backend and frontend SDKs',
      target: 'root',
    },
  ],
  scripts: [],
  conflicts: ['datadog', 'sentry-react-native'],
  requires: [],
  showWhen: showAlways,
  order: 1,
};

export default meta;
