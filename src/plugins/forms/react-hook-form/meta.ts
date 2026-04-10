import type { PluginMeta } from '../../../shared/types.js';
import { showWhenWebFrontend } from '../../helpers/show-when.js';

const meta: PluginMeta = {
  id: 'react-hook-form',
  label: 'React Hook Form',
  description:
    'Lightweight performant form state with React Hook Form and reusable form helpers.',
  category: 'forms',
  platformSupport: 'web-only',
  deps: [{ name: 'react-hook-form', version: '^7.53.2' }],
  devDeps: [],
  envVars: [],
  scripts: [],
  conflicts: ['formik'],
  requires: [],
  showWhen: showWhenWebFrontend,
  order: 1,
};

export default meta;
