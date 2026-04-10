import type { PluginMeta } from '../../../shared/types.js';
import { showAlways } from '../../helpers/show-when.js';

const meta: PluginMeta = {
  id: 'eas-build',
  label: 'EAS Build',
  description: 'Expo EAS Build profiles for development and production builds.',
  category: 'devops',
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
