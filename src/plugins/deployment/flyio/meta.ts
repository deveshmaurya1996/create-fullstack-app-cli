import type { PluginMeta } from '../../../shared/types.js';
import { showAlways } from '../../helpers/show-when.js';

const meta: PluginMeta = {
  id: 'flyio',
  label: 'Fly.io',
  description: 'Fly.io deployment manifest template for containerized services.',
  category: 'deployment',
  platformSupport: 'all',
  deps: [],
  devDeps: [],
  envVars: [],
  scripts: [],
  conflicts: [],
  requires: [],
  showWhen: showAlways,
  order: 4,
};

export default meta;
