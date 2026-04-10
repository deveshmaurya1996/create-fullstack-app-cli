import type { PluginMeta } from '../../../shared/types.js';
import { showAlways } from '../../helpers/show-when.js';

const meta: PluginMeta = {
  id: 'fastlane',
  label: 'Fastlane',
  description: 'Mobile release automation setup using Fastlane configuration files.',
  category: 'devops',
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
