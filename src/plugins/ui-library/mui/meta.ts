import type { PluginMeta } from '../../../shared/types.js';
import { showWhenWebFrontend } from '../../helpers/show-when.js';

const meta: PluginMeta = {
  id: 'mui',
  label: 'MUI',
  description: 'Material UI setup with theme configuration and app-level theme provider.',
  category: 'ui-library',
  platformSupport: 'web-only',
  deps: [
    { name: '@mui/material', version: '^6.1.8' },
    { name: '@emotion/react', version: '^11.13.5' },
    { name: '@emotion/styled', version: '^11.13.5' },
  ],
  devDeps: [],
  envVars: [],
  scripts: [],
  conflicts: ['shadcn', 'ant-design'],
  requires: [],
  showWhen: showWhenWebFrontend,
  order: 2,
};

export default meta;
