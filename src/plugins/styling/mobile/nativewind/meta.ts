import type { PluginMeta } from '../../../../shared/types.js';
import { showWhenMobileNonFlutter } from '../../../helpers/show-when.js';

const meta: PluginMeta = {
  id: 'nativewind',
  label: 'Nativewind',
  description: 'Tailwind-style utility classes for React Native using NativeWind.',
  category: 'styling-mobile',
  platformSupport: 'mobile-only',
  deps: [{ name: 'nativewind', version: '^4.1.23' }],
  devDeps: [{ name: 'tailwindcss', version: '^3.4.16' }],
  envVars: [],
  scripts: [],
  conflicts: ['rn-stylesheet', 'styled-components-rn'],
  requires: [],
  showWhen: showWhenMobileNonFlutter,
  order: 1,
};

export default meta;
