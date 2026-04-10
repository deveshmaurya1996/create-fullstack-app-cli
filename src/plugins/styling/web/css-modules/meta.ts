import type { PluginMeta } from '../../../../shared/types.js';
import { showWhenWebFrontend } from '../../../helpers/show-when.js';

const meta: PluginMeta = {
  id: 'css-modules',
  label: 'CSS Modules',
  description: 'Scoped CSS modules setup for component-level web styling.',
  category: 'styling-web',
  platformSupport: 'web-only',
  deps: [],
  devDeps: [],
  envVars: [],
  scripts: [],
  conflicts: ['tailwind', 'styled-components'],
  requires: [],
  showWhen: showWhenWebFrontend,
  order: 3,
};

export default meta;
