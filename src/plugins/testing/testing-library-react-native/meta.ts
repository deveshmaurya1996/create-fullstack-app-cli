import type { PluginMeta } from '../../../shared/types.js';
import { showWhenMobileNativeTesting } from '../../helpers/show-when.js';

const meta: PluginMeta = {
  id: 'testing-library-react-native',
  label: 'Testing Library React Native',
  description: 'React Native component testing setup using Testing Library.',
  category: 'testing',
  platformSupport: 'all',
  deps: [],
  devDeps: [{ name: '@testing-library/react-native', version: '^13.0.0' }],
  envVars: [],
  scripts: [],
  conflicts: ['testing-library-react'],
  requires: [],
  showWhen: showWhenMobileNativeTesting,
  order: 8,
};

export default meta;
