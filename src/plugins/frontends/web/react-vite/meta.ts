import type { PluginMeta } from '../../../../shared/types.js';

const meta: PluginMeta = {
  id: 'react-vite',
  label: 'React (Vite)',
  description: 'React with Vite bundler — fast HMR, modern tooling',
  category: 'frontend-web',
  platformSupport: 'web-only',
  deps: [
    { name: 'react', version: '^18.3.1' },
    { name: 'react-dom', version: '^18.3.1' },
    { name: 'react-router-dom', version: '^6.28.0' },
  ],
  devDeps: [
    { name: 'vite', version: '^6.0.0' },
    { name: '@vitejs/plugin-react', version: '^4.3.4' },
    { name: 'typescript', version: '^5.7.2' },
    { name: '@types/react', version: '^18.3.12' },
    { name: '@types/react-dom', version: '^18.3.1' },
  ],
  envVars: [
    {
      key: 'VITE_API_URL',
      defaultValue: 'http://localhost:3000',
      comment: 'Backend API base URL',
      target: 'frontend',
    },
    {
      key: 'VITE_APP_NAME',
      defaultValue: 'My App',
      comment: 'Application display name',
      target: 'frontend',
    },
  ],
  scripts: [
    { name: 'dev', command: 'vite', target: 'frontend', description: 'Start dev server' },
    { name: 'build', command: 'tsc -b && vite build', target: 'frontend', description: 'Build for production' },
    { name: 'preview', command: 'vite preview', target: 'frontend', description: 'Preview production build' },
    { name: 'type-check', command: 'tsc --noEmit', target: 'frontend', description: 'Type check' },
  ],
  conflicts: ['next', 'vue', 'svelte', 'angular'],
  requires: [],
  showWhen: (draft) => {
    if (draft.platform === 'mobile') return false;
    return true;
  },
  order: 1,
};

export default meta;