import type { PluginMeta } from '../../../../shared/types.js';
import { showWhenWebFrontend } from '../../../helpers/show-when.js';

const meta: PluginMeta = {
  id: 'styled-components',
  label: 'Styled Components',
  description: 'CSS-in-JS styling setup for web apps with theme provider and global styles.',
  category: 'styling-web',
  platformSupport: 'web-only',
  deps: [{ name: 'styled-components', version: '^6.1.13' }],
  devDeps: [],
  envVars: [],
  scripts: [],
  conflicts: ['tailwind', 'css-modules'],
  requires: [],
  showWhen: showWhenWebFrontend,
  order: 2,
};

export default meta;
