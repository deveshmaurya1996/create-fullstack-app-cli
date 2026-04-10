import type { PluginMeta } from '../../../../shared/types.js';
import { showWhenWebFrontend } from '../../../helpers/show-when.js';

const meta: PluginMeta = {
  id: 'tailwind',
  label: 'Tailwind',
  description: 'Utility-first styling setup for web apps using Tailwind CSS.',
  category: 'styling-web',
  platformSupport: 'web-only',
  deps: [],
  devDeps: [
    { name: 'tailwindcss', version: '^3.4.16' },
    { name: 'postcss', version: '^8.4.49' },
    { name: 'autoprefixer', version: '^10.4.20' },
  ],
  envVars: [],
  scripts: [],
  conflicts: ['styled-components', 'css-modules'],
  requires: [],
  showWhen: showWhenWebFrontend,
  order: 1,
};

export default meta;
