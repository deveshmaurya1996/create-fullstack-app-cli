import type { PluginMeta } from '../../../shared/types.js';
import { showAlways } from '../../helpers/show-when.js';

const meta: PluginMeta = {
  id: 'datadog',
  label: 'Datadog',
  description: 'Infrastructure and application monitoring setup for server and mobile telemetry.',
  category: 'monitoring',
  platformSupport: 'all',
  deps: [
    { name: 'dd-trace', version: '^5.26.0' },
    { name: '@datadog/mobile-react-native', version: '^2.2.0' },
  ],
  devDeps: [],
  envVars: [
    {
      key: 'DD_SERVICE',
      defaultValue: 'app-service',
      comment: 'Datadog service name',
      target: 'root',
    },
    {
      key: 'DD_ENV',
      defaultValue: 'development',
      comment: 'Datadog environment',
      target: 'root',
    },
  ],
  scripts: [],
  conflicts: ['sentry', 'sentry-react-native'],
  requires: [],
  showWhen: showAlways,
  order: 3,
};

export default meta;
