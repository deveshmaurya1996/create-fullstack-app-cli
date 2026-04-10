import type { PluginMeta } from '../../../shared/types.js';
import { showAlways } from '../../helpers/show-when.js';

const meta: PluginMeta = {
  id: 'eas-submit',
  label: 'EAS Submit',
  description: 'Expo EAS Submit profile template for mobile app store submissions.',
  category: 'deployment',
  platformSupport: 'all',
  deps: [],
  devDeps: [],
  envVars: [],
  scripts: [],
  conflicts: [],
  requires: [],
  showWhen: showAlways,
  order: 5,
};

export default meta;
