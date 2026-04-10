import type { PluginMeta } from '../../../../shared/types.js';
import { showWhenMobileNonFlutter } from '../../../helpers/show-when.js';

const meta: PluginMeta = {
  id: 'rn-stylesheet',
  label: 'RN StyleSheet',
  description: 'Vanilla React Native StyleSheet setup with centralized theme and common styles.',
  category: 'styling-mobile',
  platformSupport: 'mobile-only',
  deps: [],
  devDeps: [],
  envVars: [],
  scripts: [],
  conflicts: ['nativewind', 'styled-components-rn'],
  requires: [],
  showWhen: showWhenMobileNonFlutter,
  order: 2,
};

export default meta;
