import type { PluginMeta } from '../../../shared/types.js';
import { showWhenWebFrontend } from '../../helpers/show-when.js';

const meta: PluginMeta = {
  id: 'shadcn',
  label: 'shadcn/ui',
  description:
    'Composable Tailwind-based UI primitives with utility helpers and starter component set.',
  category: 'ui-library',
  platformSupport: 'web-only',
  deps: [
    { name: 'clsx', version: '^2.1.1' },
    { name: 'class-variance-authority', version: '^0.7.1' },
    { name: 'tailwind-merge', version: '^2.5.5' },
    { name: 'lucide-react', version: '^0.468.0' },
  ],
  devDeps: [],
  envVars: [],
  scripts: [],
  conflicts: ['mui', 'ant-design'],
  requires: [],
  showWhen: showWhenWebFrontend,
  order: 1,
};

export default meta;
