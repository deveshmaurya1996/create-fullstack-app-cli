import type { PluginMeta } from '../../../shared/types.js';
import { showWhenNodeBackend } from '../../helpers/show-when.js';

const meta: PluginMeta = {
  id: 'rate-limit',
  label: 'Rate Limit',
  description: 'Request rate limiting middleware/configuration for supported Node backends.',
  category: 'backend-extras',
  platformSupport: 'backend-only',
  deps: [
    { name: 'express-rate-limit', version: '^7.4.1' },
    { name: '@nestjs/throttler', version: '^6.2.0' },
  ],
  devDeps: [],
  envVars: [],
  scripts: [],
  conflicts: [],
  requires: [],
  showWhen: showWhenNodeBackend,
  order: 3,
};

export default meta;
