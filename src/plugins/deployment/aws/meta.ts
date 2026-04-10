import type { PluginMeta } from '../../../shared/types.js';
import { showAlways } from '../../helpers/show-when.js';

const meta: PluginMeta = {
  id: 'aws',
  label: 'AWS',
  description: 'AWS deployment config scaffolds for CodeBuild and environment setup.',
  category: 'deployment',
  platformSupport: 'all',
  deps: [],
  devDeps: [],
  envVars: [
    {
      key: 'AWS_REGION',
      defaultValue: 'us-east-1',
      comment: 'AWS region for deployment resources',
      target: 'root',
    },
    {
      key: 'AWS_ACCOUNT_ID',
      defaultValue: '',
      comment: 'AWS account identifier',
      target: 'root',
    },
  ],
  scripts: [],
  conflicts: [],
  requires: [],
  showWhen: showAlways,
  order: 3,
};

export default meta;
