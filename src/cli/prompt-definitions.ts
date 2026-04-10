import type { PromptDefinition } from './types.js';
import { visibilityRules } from './visibility.js';
import { sanitizeProjectName } from '../shared/utils.js';

export const promptDefinitions: PromptDefinition[] = [
  // ─── Phase 1: Project Shape ─────────────────────────────
  {
    id: 'projectName',
    phase: 'project-shape',
    type: 'text',
    message: 'What is your project name?',
    defaultValue: 'my-app',
    visible: visibilityRules.projectName!,
    validate: (value: unknown) => {
      const name = String(value).trim();
      if (!name) return 'Project name is required';
      if (!/^[a-zA-Z0-9-_]+$/.test(name)) return 'Only letters, numbers, hyphens, and underscores';
      if (name.length > 100) return 'Name too long (max 100 characters)';
      return true;
    },
    transform: (value: unknown) => sanitizeProjectName(String(value)),
  },
  {
    id: 'structure',
    phase: 'project-shape',
    type: 'select',
    message: 'Project structure:',
    defaultValue: 'single-app',
    visible: visibilityRules.structure!,
  },
  {
    id: 'scope',
    phase: 'project-shape',
    type: 'select',
    message: 'Project scope:',
    defaultValue: 'fullstack',
    visible: visibilityRules.scope!,
  },
  {
    id: 'projectType',
    phase: 'project-shape',
    type: 'select',
    message: 'What type of project?',
    defaultValue: 'saas',
    visible: visibilityRules.projectType!,
  },
  {
    id: 'monorepoTool',
    phase: 'project-shape',
    type: 'select',
    message: 'Monorepo tool:',
    defaultValue: 'turborepo',
    visible: visibilityRules.monorepoTool!,
  },
  {
    id: 'packageManager',
    phase: 'project-shape',
    type: 'select',
    message: 'Package manager:',
    defaultValue: 'pnpm',
    visible: visibilityRules.packageManager!,
  },

  // ─── Phase 2: Frontend ──────────────────────────────────
  {
    id: 'platform',
    phase: 'frontend',
    type: 'select',
    message: 'Target platform:',
    defaultValue: 'web',
    visible: visibilityRules.platform!,
  },
  {
    id: 'webFramework',
    phase: 'frontend',
    type: 'select',
    message: 'Web framework:',
    choicesRef: 'frontend-web',
    visible: visibilityRules.webFramework!,
  },
  {
    id: 'mobileFramework',
    phase: 'frontend',
    type: 'select',
    message: 'Mobile framework:',
    choicesRef: 'frontend-mobile',
    visible: visibilityRules.mobileFramework!,
  },
  {
    id: 'webStyling',
    phase: 'frontend',
    type: 'select',
    message: 'Web styling solution:',
    choicesRef: 'styling-web',
    visible: visibilityRules.webStyling!,
  },
  {
    id: 'mobileStyling',
    phase: 'frontend',
    type: 'select',
    message: 'Mobile styling solution:',
    choicesRef: 'styling-mobile',
    visible: visibilityRules.mobileStyling!,
  },
  {
    id: 'stateManagement',
    phase: 'frontend',
    type: 'multiselect',
    message: 'State management (select multiple):',
    choicesRef: 'state',
    visible: visibilityRules.stateManagement!,
  },
  {
    id: 'formLibrary',
    phase: 'frontend',
    type: 'select',
    message: 'Form library:',
    choicesRef: 'forms',
    visible: visibilityRules.formLibrary!,
  },
  {
    id: 'uiLibrary',
    phase: 'frontend',
    type: 'select',
    message: 'UI component library:',
    choicesRef: 'ui-library',
    visible: visibilityRules.uiLibrary!,
  },
  {
    id: 'apiClient',
    phase: 'frontend',
    type: 'select',
    message: 'API client:',
    choicesRef: 'api-client',
    visible: visibilityRules.apiClient!,
  },
  {
    id: 'mobileNavigation',
    phase: 'frontend',
    type: 'select',
    message: 'Mobile navigation:',
    choicesRef: 'mobile-navigation',
    visible: visibilityRules.mobileNavigation!,
  },
  {
    id: 'frontendExtras',
    phase: 'frontend',
    type: 'multiselect',
    message: 'Frontend extras (select multiple):',
    choicesRef: 'frontend-extras',
    visible: visibilityRules.frontendExtras!,
  },

  // ─── Phase 3: Backend ───────────────────────────────────
  {
    id: 'backendFramework',
    phase: 'backend',
    type: 'select',
    message: 'Backend framework:',
    choicesRef: 'backend',
    visible: visibilityRules.backendFramework!,
  },
  {
    id: 'backendTs',
    phase: 'backend',
    type: 'select',
    message: 'TypeScript for backend?',
    defaultValue: 'yes',
    visible: visibilityRules.backendTs!,
    transform: (value: unknown) => value === 'yes',
  },
  {
    id: 'apiStyle',
    phase: 'backend',
    type: 'select',
    message: 'API style:',
    defaultValue: 'rest',
    visible: visibilityRules.apiStyle!,
  },
  {
    id: 'database',
    phase: 'backend',
    type: 'select',
    message: 'Database:',
    choicesRef: 'database',
    visible: visibilityRules.database!,
  },
  {
    id: 'orm',
    phase: 'backend',
    type: 'select',
    message: 'ORM / ODM:',
    choicesRef: 'orm',
    visible: visibilityRules.orm!,
  },
  {
    id: 'redis',
    phase: 'backend',
    type: 'select',
    message: 'Redis cache?',
    defaultValue: 'no',
    visible: visibilityRules.redis!,
    transform: (value: unknown) => value === 'yes',
  },
  {
    id: 'backendExtras',
    phase: 'backend',
    type: 'multiselect',
    message: 'Backend extras (select multiple):',
    choicesRef: 'backend-extras',
    visible: visibilityRules.backendExtras!,
  },

  // ─── Phase 4: Shared Concerns ───────────────────────────
  {
    id: 'auth',
    phase: 'shared-concerns',
    type: 'select',
    message: 'Authentication:',
    choicesRef: 'auth',
    visible: visibilityRules.auth!,
  },
  {
    id: 'testing',
    phase: 'shared-concerns',
    type: 'multiselect',
    message: 'Testing tools (select multiple):',
    choicesRef: 'testing',
    visible: visibilityRules.testing!,
  },
  {
    id: 'logging',
    phase: 'shared-concerns',
    type: 'select',
    message: 'Logging:',
    choicesRef: 'logging',
    visible: visibilityRules.logging!,
  },
  {
    id: 'monitoring',
    phase: 'shared-concerns',
    type: 'select',
    message: 'Monitoring:',
    choicesRef: 'monitoring',
    visible: visibilityRules.monitoring!,
  },
  {
    id: 'devtools',
    phase: 'shared-concerns',
    type: 'multiselect',
    message: 'Dev tools (select multiple):',
    choicesRef: 'devtools',
    visible: visibilityRules.devtools!,
  },
  {
    id: 'devops',
    phase: 'shared-concerns',
    type: 'multiselect',
    message: 'DevOps & CI/CD (select multiple):',
    choicesRef: 'devops',
    visible: visibilityRules.devops!,
  },
  {
    id: 'deployment',
    phase: 'shared-concerns',
    type: 'multiselect',
    message: 'Deployment (select multiple):',
    choicesRef: 'deployment',
    visible: visibilityRules.deployment!,
  },
];

export function getPromptsForPhase(phase: string): PromptDefinition[] {
  return promptDefinitions.filter((p) => p.phase === phase);
}

export function getPromptById(id: string): PromptDefinition | undefined {
  return promptDefinitions.find((p) => p.id === id);
}

export function getAllPromptIds(): string[] {
  return promptDefinitions.map((p) => p.id);
}