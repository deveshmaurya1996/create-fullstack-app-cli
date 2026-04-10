import type { WizardDraft, PluginCategory } from '../shared/types.js';
import type { PromptChoice } from './types.js';
import { pluginRegistry } from '../plugins/registry.js';
import { PLUGIN_CATEGORIES, SCOPES } from '../shared/constants.js';

export const staticChoices: Record<string, PromptChoice[]> = {
  structure: [
    { value: 'single-app', label: 'Single App', description: 'One application, one repository' },
    { value: 'monorepo', label: 'Monorepo', description: 'Multiple packages in one repository' },
    { value: 'microservices', label: 'Microservices', description: 'Distributed services architecture' },
  ],

  scope: [
    { value: 'frontend-only', label: 'Frontend Only', description: 'Client-side application' },
    { value: 'backend-only', label: 'Backend Only', description: 'Server / API only' },
    { value: 'fullstack', label: 'Full Stack', description: 'Frontend + Backend' },
  ],

  projectType: [
    { value: 'saas', label: 'SaaS', description: 'Software as a service product' },
    { value: 'admin', label: 'Admin Dashboard', description: 'Internal admin panel' },
    { value: 'ecommerce', label: 'E-commerce', description: 'Online store' },
    { value: 'api-only', label: 'API Only', description: 'REST/GraphQL API service' },
    { value: 'mobile-app', label: 'Mobile App', description: 'Mobile application with backend' },
    { value: 'landing-page', label: 'Landing Page', description: 'Marketing landing page' },
    { value: 'blog', label: 'Blog', description: 'Blog or content site' },
  ],

  monorepoTool: [
    { value: 'turborepo', label: 'Turborepo', description: 'Fast, incremental builds' },
    { value: 'nx', label: 'Nx', description: 'Smart, extensible build framework' },
    { value: 'pnpm-workspaces', label: 'pnpm Workspaces', description: 'Simple workspace management' },
  ],

  packageManager: [
    { value: 'pnpm', label: 'pnpm', description: 'Fast, disk space efficient' },
    { value: 'npm', label: 'npm', description: 'Default Node.js package manager' },
    { value: 'yarn', label: 'yarn', description: 'Classic yarn package manager' },
    { value: 'bun', label: 'bun', description: 'All-in-one JavaScript runtime' },
  ],

  platform: [
    { value: 'web', label: 'Web', description: 'Browser-based application' },
    { value: 'mobile', label: 'Mobile', description: 'iOS / Android application' },
    { value: 'both', label: 'Both (Web + Mobile)', description: 'Web and mobile applications' },
  ],

  apiStyle: [
    { value: 'rest', label: 'REST', description: 'RESTful API endpoints' },
    { value: 'graphql', label: 'GraphQL', description: 'Query language for APIs' },
    { value: 'trpc', label: 'tRPC', description: 'End-to-end typesafe APIs' },
  ],

  backendTs: [
    { value: 'yes', label: 'Yes', description: 'TypeScript for type safety' },
    { value: 'no', label: 'No', description: 'Plain JavaScript' },
  ],

  redis: [
    { value: 'yes', label: 'Yes', description: 'In-memory data store for caching' },
    { value: 'no', label: 'No', description: 'Skip Redis' },
  ],
};

// ─── Dynamic Choices (from Plugin Registry) ──────────────────

export function getPluginChoices(
  category: PluginCategory,
  draft: WizardDraft
): PromptChoice[] {
  const plugins = pluginRegistry.getVisiblePlugins(category, draft);

  return plugins.map((plugin) => ({
    value: plugin.meta.id,
    label: plugin.meta.label,
    description: plugin.meta.description,
  }));
}

export function getChoicesForPrompt(
  promptId: string,
  draft: WizardDraft
): PromptChoice[] {
  const choiceMap: Record<string, () => PromptChoice[]> = {
    structure: () => staticChoices.structure,
    scope: () => filterScopeChoices(draft),
    projectType: () => filterProjectTypeChoices(draft),
    monorepoTool: () => staticChoices.monorepoTool,
    packageManager: () => staticChoices.packageManager,
    platform: () => staticChoices.platform,
    webFramework: () => getPluginChoices(PLUGIN_CATEGORIES.FRONTEND_WEB, draft),
    mobileFramework: () => getPluginChoices(PLUGIN_CATEGORIES.FRONTEND_MOBILE, draft),
    webStyling: () => getPluginChoices(PLUGIN_CATEGORIES.STYLING_WEB, draft),
    mobileStyling: () => getPluginChoices(PLUGIN_CATEGORIES.STYLING_MOBILE, draft),
    stateManagement: () => getPluginChoices(PLUGIN_CATEGORIES.STATE, draft),
    formLibrary: () => addNoneOption(getPluginChoices(PLUGIN_CATEGORIES.FORMS, draft)),
    uiLibrary: () => addNoneOption(getPluginChoices(PLUGIN_CATEGORIES.UI_LIBRARY, draft)),
    apiClient: () => getPluginChoices(PLUGIN_CATEGORIES.API_CLIENT, draft),
    mobileNavigation: () => getPluginChoices(PLUGIN_CATEGORIES.MOBILE_NAVIGATION, draft),
    frontendExtras: () => getPluginChoices(PLUGIN_CATEGORIES.FRONTEND_EXTRAS, draft),
    backendFramework: () => getPluginChoices(PLUGIN_CATEGORIES.BACKEND, draft),
    backendTs: () => staticChoices.backendTs,
    apiStyle: () => filterApiStyleChoices(draft),
    database: () => addNoneOption(getPluginChoices(PLUGIN_CATEGORIES.DATABASE, draft)),
    orm: () => addNoneOption(getPluginChoices(PLUGIN_CATEGORIES.ORM, draft)),
    redis: () => staticChoices.redis,
    backendExtras: () => getPluginChoices(PLUGIN_CATEGORIES.BACKEND_EXTRAS, draft),
    auth: () => addNoneOption(getPluginChoices(PLUGIN_CATEGORIES.AUTH, draft)),
    testing: () => getPluginChoices(PLUGIN_CATEGORIES.TESTING, draft),
    logging: () => addNoneOption(getPluginChoices(PLUGIN_CATEGORIES.LOGGING, draft)),
    monitoring: () => addNoneOption(getPluginChoices(PLUGIN_CATEGORIES.MONITORING, draft)),
    devtools: () => getPluginChoices(PLUGIN_CATEGORIES.DEVTOOLS, draft),
    devops: () => getPluginChoices(PLUGIN_CATEGORIES.DEVOPS, draft),
    deployment: () => addNoneOption(getPluginChoices(PLUGIN_CATEGORIES.DEPLOYMENT, draft)),
  };

  const getter = choiceMap[promptId];
  if (!getter) return [];
  return getter();
}

// ─── Choice Filters ──────────────────────────────────────────

function addNoneOption(choices: PromptChoice[]): PromptChoice[] {
  return [...choices, { value: 'none', label: 'None', description: 'Skip this option' }];
}

function filterScopeChoices(_draft: WizardDraft): PromptChoice[] {
  return staticChoices.scope;
}

function filterProjectTypeChoices(draft: WizardDraft): PromptChoice[] {
  let choices = [...staticChoices.projectType];

  if (draft.scope === SCOPES.FULLSTACK || draft.scope === SCOPES.FRONTEND_ONLY) {
    choices = choices.filter((c) => c.value !== 'api-only');
  }

  if (draft.scope === SCOPES.BACKEND_ONLY) {
    choices = choices.filter((c) =>
      !['landing-page', 'mobile-app', 'blog'].includes(c.value)
    );
  }

  if (draft.scope === SCOPES.BACKEND_ONLY) {
    choices = choices.filter((c) => c.value !== 'mobile-app');
  }

  return choices;
}

function filterApiStyleChoices(draft: WizardDraft): PromptChoice[] {
  let choices = [...staticChoices.apiStyle];

  const reactBasedFrameworks = ['react-vite', 'next', 'expo', 'react-native-cli'];
  const frontendFramework = draft.webFramework || draft.mobileFramework;
  const isReactFrontend = frontendFramework ? reactBasedFrameworks.includes(frontendFramework) : false;

  if (!isReactFrontend || draft.backendTs === false) {
    choices = choices.filter((c) => c.value !== 'trpc');
  }

  if (draft.backendFramework === 'django' || draft.backendFramework === 'fastapi') {
    choices = choices.filter((c) => c.value === 'rest');
  }

  return choices;
}