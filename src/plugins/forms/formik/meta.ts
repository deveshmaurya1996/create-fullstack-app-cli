import type { PluginMeta } from '../../../shared/types.js';
import { showWhenWebFrontend } from '../../helpers/show-when.js';

const meta: PluginMeta = {
  id: 'formik',
  label: 'Formik',
  description:
    'Schema-friendly React form handling with Formik and starter validators for common fields.',
  category: 'forms',
  platformSupport: 'web-only',
  deps: [{ name: 'formik', version: '^2.4.6' }],
  devDeps: [],
  envVars: [],
  scripts: [],
  conflicts: ['react-hook-form'],
  requires: [],
  showWhen: showWhenWebFrontend,
  order: 2,
};

export default meta;
