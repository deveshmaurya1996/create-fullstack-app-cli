import type { PluginMeta } from '../../../shared/types.js';
import { showWhenFrontend } from '../../helpers/show-when.js';

const meta: PluginMeta = {
  id: 'mobx',
  label: 'MobX',
  description:
    'Observable client state with MobX and React bindings, with starter stores and a provider.',
  category: 'state',
  platformSupport: 'all',
  deps: [
    { name: 'mobx', version: '^6.13.5' },
    { name: 'mobx-react-lite', version: '^4.0.7' },
  ],
  devDeps: [],
  envVars: [],
  scripts: [],
  conflicts: ['zustand', 'redux-toolkit'],
  requires: [],
  showWhen: showWhenFrontend,
  order: 4,
};

export default meta;
