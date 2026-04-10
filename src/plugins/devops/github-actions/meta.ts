import type { PluginMeta } from '../../../shared/types.js';
import { showAlways } from '../../helpers/show-when.js';

const meta: PluginMeta = {
  id: 'github-actions',
  label: 'GitHub Actions',
  description: 'CI/CD workflow templates for testing, deployment, and mobile builds.',
  category: 'devops',
  platformSupport: 'all',
  deps: [],
  devDeps: [],
  envVars: [],
  scripts: [],
  conflicts: [],
  requires: [],
  showWhen: showAlways,
  order: 2,
};

export default meta;
