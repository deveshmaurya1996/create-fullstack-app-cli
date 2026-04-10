import type { PluginMeta } from '../../../shared/types.js';
import { showWhenFrontend } from '../../helpers/show-when.js';

const meta: PluginMeta = {
  id: 'redux-toolkit',
  label: 'Redux Toolkit',
  description:
    'Predictable client state with Redux Toolkit — configured store, sample slices, typed hooks, and a provider.',
  category: 'state',
  platformSupport: 'all',
  deps: [
    { name: '@reduxjs/toolkit', version: '^2.5.0' },
    { name: 'react-redux', version: '^9.2.0' },
  ],
  devDeps: [],
  envVars: [],
  scripts: [],
  conflicts: ['zustand', 'mobx'],
  requires: [],
  showWhen: showWhenFrontend,
  order: 2,
};

export default meta;
