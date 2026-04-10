import type { PluginMeta } from '../../../../shared/types.js';

const meta: PluginMeta = {
  id: 'angular',
  label: 'Angular',
  description: 'Angular 17+ with standalone components and signals',
  category: 'frontend-web',
  platformSupport: 'web-only',
  deps: [
    { name: '@angular/core', version: '^17.3.0' },
    { name: '@angular/common', version: '^17.3.0' },
    { name: '@angular/router', version: '^17.3.0' },
    { name: '@angular/forms', version: '^17.3.0' },
    { name: '@angular/platform-browser', version: '^17.3.0' },
    { name: '@angular/platform-browser-dynamic', version: '^17.3.0' },
    { name: '@angular/compiler', version: '^17.3.0' },
    { name: 'rxjs', version: '^7.8.0' },
    { name: 'zone.js', version: '^0.14.0' },
    { name: 'tslib', version: '^2.7.0' },
  ],
  devDeps: [
    { name: '@angular/cli', version: '^17.3.0' },
    { name: '@angular/compiler-cli', version: '^17.3.0' },
    { name: '@angular-devkit/build-angular', version: '^17.3.0' },
    { name: 'typescript', version: '^5.4.0' },
  ],
  envVars: [
    { key: 'NG_APP_API_URL', defaultValue: 'http://localhost:3000', comment: 'Backend API URL', target: 'frontend' },
  ],
  scripts: [
    { name: 'dev', command: 'ng serve', target: 'frontend', description: 'Start dev server' },
    { name: 'build', command: 'ng build', target: 'frontend', description: 'Build for production' },
    { name: 'test', command: 'ng test', target: 'frontend', description: 'Run tests' },
    { name: 'lint', command: 'ng lint', target: 'frontend', description: 'Lint' },
  ],
  conflicts: ['react-vite', 'next', 'vue', 'svelte'],
  requires: [],
  showWhen: (draft) => draft.platform !== 'mobile',
  order: 5,
};

export default meta;