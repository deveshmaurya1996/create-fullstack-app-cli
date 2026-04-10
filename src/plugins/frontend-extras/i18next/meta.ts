import type { PluginMeta } from '../../../shared/types.js';
import { showWhenFrontend } from '../../helpers/show-when.js';

const meta: PluginMeta = {
  id: 'i18next',
  label: 'i18next',
  description: 'Internationalization setup with i18next and starter locale files.',
  category: 'frontend-extras',
  platformSupport: 'all',
  deps: [
    { name: 'i18next', version: '^24.0.5' },
    { name: 'react-i18next', version: '^15.1.1' },
  ],
  devDeps: [],
  envVars: [],
  scripts: [],
  conflicts: [],
  requires: [],
  showWhen: showWhenFrontend,
  order: 4,
};

export default meta;
