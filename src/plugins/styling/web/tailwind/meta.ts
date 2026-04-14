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
    { name: 'tailwindcss', version: '^4.1.0' },
    { name: '@tailwindcss/postcss', version: '^4.1.0' },
    { name: 'postcss', version: '^8.4.49' },
  ],
  envVars: [],
  scripts: [],
  conflicts: ['styled-components', 'css-modules'],
  requires: [],
  showWhen: showWhenWebFrontend,
  order: 1,
};

export default meta;
