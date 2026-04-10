import type { PluginMeta } from '../../../../shared/types.js';

const meta: PluginMeta = {
  id: 'next',
  label: 'Next.js',
  description: 'React framework with SSR, SSG, API routes, and App Router',
  category: 'frontend-web',
  platformSupport: 'web-only',
  deps: [
    { name: 'next', version: '^15.0.0' },
    { name: 'react', version: '^18.3.1' },
    { name: 'react-dom', version: '^18.3.1' },
  ],
  devDeps: [
    { name: 'typescript', version: '^5.7.2' },
    { name: '@types/react', version: '^18.3.12' },
    { name: '@types/react-dom', version: '^18.3.1' },
    { name: '@types/node', version: '^22.10.0' },
  ],
  envVars: [
    { key: 'NEXT_PUBLIC_API_URL', defaultValue: 'http://localhost:3000', comment: 'Backend API base URL', target: 'frontend' },
    { key: 'NEXT_PUBLIC_APP_NAME', defaultValue: 'My App', comment: 'Application display name', target: 'frontend' },
  ],
  scripts: [
    { name: 'dev', command: 'next dev', target: 'frontend', description: 'Start dev server' },
    { name: 'build', command: 'next build', target: 'frontend', description: 'Build for production' },
    { name: 'start', command: 'next start', target: 'frontend', description: 'Start production server' },
    { name: 'lint', command: 'next lint', target: 'frontend', description: 'Lint' },
    { name: 'type-check', command: 'tsc --noEmit', target: 'frontend', description: 'Type check' },
  ],
  conflicts: ['react-vite', 'vue', 'svelte', 'angular'],
  requires: [],
  showWhen: (draft) => draft.platform !== 'mobile',
  order: 2,
};

export default meta;