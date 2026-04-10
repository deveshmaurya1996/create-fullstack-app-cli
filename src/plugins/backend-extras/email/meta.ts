import type { PluginMeta } from '../../../shared/types.js';
import { showWhenNodeBackend } from '../../helpers/show-when.js';

const meta: PluginMeta = {
  id: 'email',
  label: 'Email',
  description: 'Transactional email service setup with reusable templates and API routes.',
  category: 'backend-extras',
  platformSupport: 'backend-only',
  deps: [{ name: 'nodemailer', version: '^6.9.16' }],
  devDeps: [],
  envVars: [
    { key: 'SMTP_HOST', defaultValue: 'smtp.example.com', comment: 'SMTP server host', target: 'root' },
    { key: 'SMTP_PORT', defaultValue: '587', comment: 'SMTP server port', target: 'root' },
    { key: 'SMTP_USER', defaultValue: '', comment: 'SMTP username', target: 'root' },
    { key: 'SMTP_PASS', defaultValue: '', comment: 'SMTP password', target: 'root' },
    { key: 'EMAIL_FROM', defaultValue: 'no-reply@example.com', comment: 'Default from email', target: 'root' },
  ],
  scripts: [],
  conflicts: [],
  requires: [],
  showWhen: showWhenNodeBackend,
  order: 9,
};

export default meta;
