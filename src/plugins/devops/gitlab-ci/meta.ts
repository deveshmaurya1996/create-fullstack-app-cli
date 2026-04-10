import type { PluginMeta } from '../../../shared/types.js';
import { showAlways } from '../../helpers/show-when.js';

const meta: PluginMeta = {
  id: 'gitlab-ci',
  label: 'GitLab CI',
  description: 'GitLab pipeline template for install, test, and build stages.',
  category: 'devops',
  platformSupport: 'all',
  deps: [],
  devDeps: [],
  envVars: [],
  scripts: [],
  conflicts: [],
  requires: [],
  showWhen: showAlways,
  order: 3,
};

export default meta;
