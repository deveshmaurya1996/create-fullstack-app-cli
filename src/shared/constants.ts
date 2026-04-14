import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const packageJson = require('../package.json') as { version: string };

export const VERSION = packageJson.version;
export const CLI_NAME = 'create-fullstack-app';

export const TARGETS = {
  FRONTEND: 'frontend',
  BACKEND: 'backend',
  ROOT: 'root',
  SHARED: 'shared',
} as const;

export const STRUCTURES = {
  SINGLE_APP: 'single-app',
  MONOREPO: 'monorepo',
  MICROSERVICES: 'microservices',
} as const;

export const PLATFORMS = {
  WEB: 'web',
  MOBILE: 'mobile',
  BOTH: 'both',
} as const;

export const SCOPES = {
  FRONTEND_ONLY: 'frontend-only',
  BACKEND_ONLY: 'backend-only',
  FULLSTACK: 'fullstack',
} as const;

export const PLUGIN_CATEGORIES = {
  FRONTEND_WEB: 'frontend-web',
  FRONTEND_MOBILE: 'frontend-mobile',
  BACKEND: 'backend',
  API_STYLE: 'api-style',
  DATABASE: 'database',
  ORM: 'orm',
  AUTH: 'auth',
  STYLING_WEB: 'styling-web',
  STYLING_MOBILE: 'styling-mobile',
  STATE: 'state',
  FORMS: 'forms',
  UI_LIBRARY: 'ui-library',
  API_CLIENT: 'api-client',
  MOBILE_NAVIGATION: 'mobile-navigation',
  FRONTEND_EXTRAS: 'frontend-extras',
  BACKEND_EXTRAS: 'backend-extras',
  TESTING: 'testing',
  LOGGING: 'logging',
  MONITORING: 'monitoring',
  DEVTOOLS: 'devtools',
  DEVOPS: 'devops',
  DEPLOYMENT: 'deployment',
} as const;

export const ENV_PREFIXES: Record<string, string> = {
  'react-vite': 'VITE_',
  'next': 'NEXT_PUBLIC_',
  'expo': 'EXPO_PUBLIC_',
  'react-native-cli': 'EXPO_PUBLIC_',
  'vue': 'VITE_',
  'svelte': 'PUBLIC_',
  'angular': 'NG_APP_',
};

export const INJECTION_MARKERS = {
  ROUTE_IMPORTS: '// ROUTE_IMPORTS',
  ROUTE_REGISTRATIONS: '// ROUTE_REGISTRATIONS',
  MIDDLEWARE_IMPORTS: '// MIDDLEWARE_IMPORTS',
  MIDDLEWARE_REGISTRATIONS: '// MIDDLEWARE_REGISTRATIONS',
  PROVIDER_IMPORTS: '// PROVIDER_IMPORTS',
  PROVIDER_WRAPPERS_START: '{/* PROVIDER_WRAPPERS_START */}',
  PROVIDER_WRAPPERS_END: '{/* PROVIDER_WRAPPERS_END */}',
  PLUGIN_IMPORTS: '// PLUGIN_IMPORTS',
  PLUGIN_REGISTRATIONS: '// PLUGIN_REGISTRATIONS',
} as const;

export const PACKAGE_MANAGERS = ['pnpm', 'npm', 'yarn', 'bun'] as const;

export const PROJECT_TYPES = [
  'saas',
  'admin',
  'ecommerce',
  'api-only',
  'mobile-app',
  'landing-page',
  'blog',
] as const;

export const CATEGORY_LABELS: Record<string, string> = {
  [PLUGIN_CATEGORIES.FRONTEND_WEB]: 'Web Frontend',
  [PLUGIN_CATEGORIES.FRONTEND_MOBILE]: 'Mobile Frontend',
  [PLUGIN_CATEGORIES.BACKEND]: 'Backend Framework',
  [PLUGIN_CATEGORIES.API_STYLE]: 'API Style',
  [PLUGIN_CATEGORIES.DATABASE]: 'Database',
  [PLUGIN_CATEGORIES.ORM]: 'ORM / ODM',
  [PLUGIN_CATEGORIES.AUTH]: 'Authentication',
  [PLUGIN_CATEGORIES.STYLING_WEB]: 'Web Styling',
  [PLUGIN_CATEGORIES.STYLING_MOBILE]: 'Mobile Styling',
  [PLUGIN_CATEGORIES.STATE]: 'State Management',
  [PLUGIN_CATEGORIES.FORMS]: 'Form Library',
  [PLUGIN_CATEGORIES.UI_LIBRARY]: 'UI Component Library',
  [PLUGIN_CATEGORIES.API_CLIENT]: 'API Client',
  [PLUGIN_CATEGORIES.MOBILE_NAVIGATION]: 'Mobile Navigation',
  [PLUGIN_CATEGORIES.FRONTEND_EXTRAS]: 'Frontend Extras',
  [PLUGIN_CATEGORIES.BACKEND_EXTRAS]: 'Backend Extras',
  [PLUGIN_CATEGORIES.TESTING]: 'Testing',
  [PLUGIN_CATEGORIES.LOGGING]: 'Logging',
  [PLUGIN_CATEGORIES.MONITORING]: 'Monitoring',
  [PLUGIN_CATEGORIES.DEVTOOLS]: 'Developer Tools',
  [PLUGIN_CATEGORIES.DEVOPS]: 'DevOps & CI/CD',
  [PLUGIN_CATEGORIES.DEPLOYMENT]: 'Deployment',
};