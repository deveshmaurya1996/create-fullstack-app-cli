import type { PluginMeta } from '../../../../shared/types.js';
import { showWhenMobileNonFlutter } from '../../../helpers/show-when.js';

const meta: PluginMeta = {
  id: 'styled-components-rn',
  label: 'Styled Components RN',
  description: 'React Native styling with styled-components and theme provider setup.',
  category: 'styling-mobile',
  platformSupport: 'mobile-only',
  deps: [{ name: 'styled-components', version: '^6.1.13' }],
  devDeps: [],
  envVars: [],
  scripts: [],
  conflicts: ['nativewind', 'rn-stylesheet'],
  requires: [],
  showWhen: showWhenMobileNonFlutter,
  order: 3,
};

export default meta;
