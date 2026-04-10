import type { WizardDraft, WizardAnswers, Scope, Structure, Platform, PackageManager } from '../shared/types.js';
import { SCOPES, STRUCTURES, PLATFORMS } from '../shared/constants.js';
import { draftNeedsBackend } from './visibility.js';

export function buildAnswers(draft: WizardDraft): WizardAnswers {
  const structure = (draft.structure || STRUCTURES.SINGLE_APP) as Structure;
  const scope = resolveScope(draft);
  const platform = resolvePlatform(draft);

  return {
    projectName: draft.projectName || 'my-app',
    structure,
    scope,
    projectType: draft.projectType || null,
    monorepoTool: draft.monorepoTool || null,
    packageManager: (draft.packageManager || 'pnpm') as PackageManager,
    platform,

    // Frontend
    webFramework: draft.webFramework || null,
    mobileFramework: draft.mobileFramework || null,
    webStyling: draft.webStyling || null,
    mobileStyling: draft.mobileStyling || null,
    stateManagement: draft.stateManagement || [],
    formLibrary: draft.formLibrary || null,
    uiLibrary: draft.uiLibrary || null,
    apiClient: draft.apiClient || null,
    mobileNavigation: draft.mobileNavigation || null,
    frontendExtras: draft.frontendExtras || [],

    // Backend
    backendFramework: draft.backendFramework || null,
    backendTs:
      draft.backendFramework === 'django' || draft.backendFramework === 'fastapi'
        ? false
        : (draft.backendTs ?? true),
    apiStyle:
      draft.backendFramework === 'django' || draft.backendFramework === 'fastapi'
        ? 'rest'
        : draft.apiStyle || null,
    database: draft.database || null,
    orm:
      draft.backendFramework === 'django' || draft.backendFramework === 'fastapi'
        ? null
        : (draft.orm || null),
    redis: draft.redis ?? false,
    backendExtras: draft.backendExtras || [],

    // Shared
    auth: draft.auth || null,
    testing: draft.testing || [],
    logging: draft.logging || null,
    monitoring: draft.monitoring || null,
    devtools: draft.devtools || [],
    devops: draft.devops || [],
    deployment: draft.deployment || [],

    needBackend: draft.needBackend ?? draftNeedsBackend(draft),
  };
}

function resolveScope(draft: WizardDraft): Scope {
  if (draft.scope) return draft.scope as Scope;

  // Microservices implies fullstack
  if (draft.structure === STRUCTURES.MICROSERVICES) return SCOPES.FULLSTACK as Scope;

  // Monorepo defaults to fullstack
  if (draft.structure === STRUCTURES.MONOREPO) return SCOPES.FULLSTACK as Scope;

  return SCOPES.FULLSTACK as Scope;
}

function resolvePlatform(draft: WizardDraft): Platform {
  if (draft.platform) return draft.platform as Platform;

  // If mobile framework is set, it's mobile
  if (draft.mobileFramework) return PLATFORMS.MOBILE as Platform;

  // If web framework is set, it's web
  if (draft.webFramework) return PLATFORMS.WEB as Platform;

  // Default
  return PLATFORMS.WEB as Platform;
}

/**
 * Collects all active plugin IDs from the answers.
 */
export function collectActivePluginIds(answers: WizardAnswers): string[] {
  const ids: string[] = [];

  // Frameworks
  if (answers.webFramework) ids.push(answers.webFramework);
  if (answers.mobileFramework) ids.push(answers.mobileFramework);
  if (answers.backendFramework) ids.push(answers.backendFramework);

  // API style server plugins
  if (answers.apiStyle === 'graphql') ids.push('graphql-server');
  if (answers.apiStyle === 'trpc') ids.push('trpc-server');

  // Database
  if (answers.database && answers.database !== 'none') ids.push(answers.database);
  if (answers.redis) ids.push('redis');

  // ORM
  if (answers.orm && answers.orm !== 'none') ids.push(answers.orm);

  // Auth
  if (answers.auth && answers.auth !== 'none') ids.push(answers.auth);

  // Styling
  if (answers.webStyling && answers.webStyling !== 'none') ids.push(answers.webStyling);
  if (answers.mobileStyling && answers.mobileStyling !== 'none') ids.push(answers.mobileStyling);

  // State
  ids.push(...(answers.stateManagement || []));

  // Forms
  if (answers.formLibrary && answers.formLibrary !== 'none') ids.push(answers.formLibrary);

  // UI Library
  if (answers.uiLibrary && answers.uiLibrary !== 'none') ids.push(answers.uiLibrary);

  // API Client
  if (answers.apiClient && answers.apiClient !== 'none') ids.push(answers.apiClient);

  // Navigation — default Expo → expo-router; React Native CLI → react-navigation
  if (answers.mobileNavigation && answers.mobileNavigation !== 'none') {
    ids.push(answers.mobileNavigation);
  } else if (answers.mobileFramework === 'expo') {
    ids.push('expo-router');
  } else if (answers.mobileFramework === 'react-native-cli') {
    ids.push('react-navigation');
  }

  // Extras
  ids.push(...(answers.frontendExtras || []));
  ids.push(...(answers.backendExtras || []));

  // Testing
  ids.push(...(answers.testing || []));

  // Logging
  if (answers.logging && answers.logging !== 'none') ids.push(answers.logging);

  // Monitoring
  if (answers.monitoring && answers.monitoring !== 'none') ids.push(answers.monitoring);

  // Dev Tools
  ids.push(...(answers.devtools || []));

  // DevOps
  ids.push(...(answers.devops || []));

  // Deployment
  ids.push(...(answers.deployment || []));

  // Remove "none" values and duplicates
  return [...new Set(ids.filter((id) => id && id !== 'none'))];
}