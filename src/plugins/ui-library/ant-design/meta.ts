import type { PluginMeta } from '../../../shared/types.js';
import { showWhenWebFrontend } from '../../helpers/show-when.js';

const meta: PluginMeta = {
  id: 'ant-design',
  label: 'Ant Design',
  description: 'Enterprise-ready UI components with Ant Design provider and theme token setup.',
  category: 'ui-library',
  platformSupport: 'web-only',
  deps: [{ name: 'antd', version: '^5.21.6' }],
  devDeps: [],
  envVars: [],
  scripts: [],
  conflicts: ['shadcn', 'mui'],
  requires: [],
  showWhen: showWhenWebFrontend,
  order: 3,
};

export default meta;
