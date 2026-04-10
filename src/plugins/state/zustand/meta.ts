import type { PluginMeta } from '../../../shared/types.js';
import { showWhenFrontend } from '../../helpers/show-when.js';

const meta: PluginMeta = {
  id: 'zustand',
  label: 'Zustand',
  description:
    'Minimal global client state with Zustand — starter auth and app stores you can extend.',
  category: 'state',
  platformSupport: 'all',
  deps: [{ name: 'zustand', version: '^5.0.3' }],
  devDeps: [],
  envVars: [],
  scripts: [],
  conflicts: ['redux-toolkit', 'mobx'],
  requires: [],
  showWhen: showWhenFrontend,
  order: 1,
};

export default meta;
