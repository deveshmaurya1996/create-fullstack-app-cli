import type { PluginMeta } from '../../../shared/types.js';
import { showWhenWebFrontend } from '../../helpers/show-when.js';

const meta: PluginMeta = {
  id: 'testing-library-react',
  label: 'Testing Library React',
  description: 'DOM-focused React component testing setup using Testing Library.',
  category: 'testing',
  platformSupport: 'all',
  deps: [],
  devDeps: [
    { name: '@testing-library/react', version: '^16.1.0' },
    { name: '@testing-library/jest-dom', version: '^6.6.3' },
  ],
  envVars: [],
  scripts: [],
  conflicts: ['testing-library-react-native'],
  requires: [],
  showWhen: showWhenWebFrontend,
  order: 7,
};

export default meta;
