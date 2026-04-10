import type { PluginMeta } from '../../../../shared/types.js';

const meta: PluginMeta = {
  id: 'vue',
  label: 'Vue 3',
  description: 'Vue 3 with Vite, Composition API, and Vue Router',
  category: 'frontend-web',
  platformSupport: 'web-only',
  deps: [
    { name: 'vue', version: '^3.5.0' },
    { name: 'vue-router', version: '^4.4.0' },
    { name: 'pinia', version: '^2.2.0' },
  ],
  devDeps: [
    { name: 'vite', version: '^6.0.0' },
    { name: '@vitejs/plugin-vue', version: '^5.2.0' },
    { name: 'typescript', version: '^5.7.2' },
    { name: 'vue-tsc', version: '^2.1.0' },
  ],
  envVars: [
    { key: 'VITE_API_URL', defaultValue: 'http://localhost:3000', comment: 'Backend API base URL', target: 'frontend' },
    { key: 'VITE_APP_NAME', defaultValue: 'My App', comment: 'Application display name', target: 'frontend' },
  ],
  scripts: [
    { name: 'dev', command: 'vite', target: 'frontend', description: 'Start dev server' },
    { name: 'build', command: 'vue-tsc -b && vite build', target: 'frontend', description: 'Build for production' },
    { name: 'preview', command: 'vite preview', target: 'frontend', description: 'Preview build' },
    { name: 'type-check', command: 'vue-tsc --noEmit', target: 'frontend', description: 'Type check' },
  ],
  conflicts: ['react-vite', 'next', 'svelte', 'angular'],
  requires: [],
  showWhen: (draft) => draft.platform !== 'mobile',
  order: 3,
};

export default meta;