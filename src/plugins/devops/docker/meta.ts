import type { PluginMeta } from '../../../shared/types.js';
import { showAlways } from '../../helpers/show-when.js';

const meta: PluginMeta = {
  id: 'docker',
  label: 'Docker',
  description: 'Dockerfiles and compose stacks for local, test, and production workflows.',
  category: 'devops',
  platformSupport: 'all',
  deps: [],
  devDeps: [],
  envVars: [],
  scripts: [],
  conflicts: [],
  requires: [],
  showWhen: showAlways,
  order: 1,
};

export default meta;
