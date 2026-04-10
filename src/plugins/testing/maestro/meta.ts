import type { PluginMeta } from '../../../shared/types.js';
import { showWhenMobileNativeTesting } from '../../helpers/show-when.js';

const meta: PluginMeta = {
  id: 'maestro',
  label: 'Maestro',
  description: 'YAML-driven mobile UI flow testing setup using Maestro.',
  category: 'testing',
  platformSupport: 'all',
  deps: [],
  devDeps: [],
  envVars: [],
  scripts: [],
  conflicts: ['detox'],
  requires: [],
  showWhen: showWhenMobileNativeTesting,
  order: 6,
};

export default meta;
