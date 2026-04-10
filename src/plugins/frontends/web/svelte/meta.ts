import type { PluginMeta } from '../../../../shared/types.js';

const meta: PluginMeta = {
  id: 'svelte',
  label: 'SvelteKit',
  description: 'SvelteKit with file-based routing, SSR, and Vite',
  category: 'frontend-web',
  platformSupport: 'web-only',
  deps: [
    { name: '@sveltejs/kit', version: '^2.8.0' },
    { name: 'svelte', version: '^5.1.0' },
  ],
  devDeps: [
    { name: 'vite', version: '^6.0.0' },
    { name: '@sveltejs/adapter-auto', version: '^3.3.0' },
    { name: '@sveltejs/vite-plugin-svelte', version: '^4.0.0' },
    { name: 'typescript', version: '^5.7.2' },
    { name: 'svelte-check', version: '^4.1.0' },
  ],
  envVars: [
    { key: 'PUBLIC_API_URL', defaultValue: 'http://localhost:3000', comment: 'Backend API base URL', target: 'frontend' },
  ],
  scripts: [
    { name: 'dev', command: 'vite dev', target: 'frontend', description: 'Start dev server' },
    { name: 'build', command: 'vite build', target: 'frontend', description: 'Build for production' },
    { name: 'preview', command: 'vite preview', target: 'frontend', description: 'Preview build' },
    { name: 'check', command: 'svelte-kit sync && svelte-check --tsconfig ./tsconfig.json', target: 'frontend', description: 'Type check' },
  ],
  conflicts: ['react-vite', 'next', 'vue', 'angular'],
  requires: [],
  showWhen: (draft) => draft.platform !== 'mobile',
  order: 4,
};

export default meta;