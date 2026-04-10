import type { PluginMeta } from '../../../shared/types.js';
import { showWhenNodeBackend } from '../../helpers/show-when.js';

const meta: PluginMeta = {
  id: 's3-upload',
  label: 'S3 Upload',
  description: 'AWS S3 upload service and route scaffolding for backend file storage.',
  category: 'backend-extras',
  platformSupport: 'backend-only',
  deps: [{ name: '@aws-sdk/client-s3', version: '^3.699.0' }],
  devDeps: [],
  envVars: [
    { key: 'AWS_REGION', defaultValue: 'us-east-1', comment: 'AWS region', target: 'root' },
    { key: 'AWS_ACCESS_KEY_ID', defaultValue: '', comment: 'AWS access key id', target: 'root' },
    { key: 'AWS_SECRET_ACCESS_KEY', defaultValue: '', comment: 'AWS secret access key', target: 'root' },
    { key: 'AWS_S3_BUCKET', defaultValue: '', comment: 'S3 bucket name for uploads', target: 'root' },
  ],
  scripts: [],
  conflicts: [],
  requires: [],
  showWhen: showWhenNodeBackend,
  order: 2,
};

export default meta;
