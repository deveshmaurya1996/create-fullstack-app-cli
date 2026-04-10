import type { PluginMeta } from '../../../shared/types.js';
import { showWhenWebFrontend } from '../../helpers/show-when.js';

const meta: PluginMeta = {
  id: 'recharts',
  label: 'Recharts',
  description: 'Composable React charting components with starter bar/line chart examples.',
  category: 'frontend-extras',
  platformSupport: 'all',
  deps: [{ name: 'recharts', version: '^2.13.3' }],
  devDeps: [],
  envVars: [],
  scripts: [],
  conflicts: [],
  requires: [],
  showWhen: showWhenWebFrontend,
  order: 1,
};

export default meta;
