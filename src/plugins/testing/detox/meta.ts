import type { PluginMeta } from '../../../shared/types.js';
import { showWhenMobileNativeTesting } from '../../helpers/show-when.js';

const meta: PluginMeta = {
  id: 'detox',
  label: 'Detox',
  description: 'Gray-box end-to-end mobile testing setup using Detox.',
  category: 'testing',
  platformSupport: 'all',
  deps: [],
  devDeps: [{ name: 'detox', version: '^20.20.0' }],
  envVars: [],
  scripts: [],
  conflicts: ['maestro'],
  requires: [],
  showWhen: showWhenMobileNativeTesting,
  order: 5,
};

export default meta;
