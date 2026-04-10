import type { WizardDraft } from '../shared/types.js';
import { SCOPES, STRUCTURES, PLATFORMS } from '../shared/constants.js';

export const visibilityRules: Record<string, (draft: WizardDraft) => boolean> = {
  projectName: () => true,
  structure: () => true,
  scope: (draft) =>
    draft.structure === STRUCTURES.SINGLE_APP,
  projectType: (draft) => {
    if (draft.structure === STRUCTURES.SINGLE_APP && draft.scope === SCOPES.FULLSTACK) return false;
    if (draft.structure === STRUCTURES.MICROSERVICES) return false;
    if (draft.scope === SCOPES.FRONTEND_ONLY || draft.scope === SCOPES.BACKEND_ONLY) return true;
    return true;
  },
  monorepoTool: (draft) =>
    draft.structure === STRUCTURES.MONOREPO || draft.structure === STRUCTURES.MICROSERVICES,
  packageManager: () => true,

  platform: (draft) => hasFrontend(draft),
  webFramework: (draft) =>
    hasFrontend(draft) && (draft.platform === PLATFORMS.WEB || draft.platform === PLATFORMS.BOTH),
  mobileFramework: (draft) =>
    hasFrontend(draft) &&
    (draft.platform === PLATFORMS.MOBILE || draft.platform === PLATFORMS.BOTH),
  webStyling: (draft) =>
    hasFrontend(draft) &&
    (draft.platform === PLATFORMS.WEB || draft.platform === PLATFORMS.BOTH) &&
    draft.mobileFramework !== 'flutter',
  mobileStyling: (draft) =>
    hasFrontend(draft) &&
    (draft.platform === PLATFORMS.MOBILE || draft.platform === PLATFORMS.BOTH) &&
    draft.mobileFramework !== 'flutter',
  stateManagement: (draft) =>
    hasFrontend(draft) && draft.mobileFramework !== 'flutter',
  formLibrary: (draft) =>
    hasFrontend(draft) &&
    draft.platform !== PLATFORMS.MOBILE,
  uiLibrary: (draft) =>
    hasFrontend(draft) &&
    draft.platform !== PLATFORMS.MOBILE,
  apiClient: (draft) =>
    hasFrontend(draft) && hasBackend(draft),
  mobileNavigation: (draft) =>
    hasFrontend(draft) &&
    (draft.platform === PLATFORMS.MOBILE || draft.platform === PLATFORMS.BOTH) &&
    draft.mobileFramework !== 'flutter',
  frontendExtras: (draft) =>
    hasFrontend(draft),

  backendFramework: (draft) => hasBackend(draft),
  backendTs: (draft) =>
    hasBackend(draft) &&
    draft.backendFramework !== 'django' &&
    draft.backendFramework !== 'fastapi',
  apiStyle: (draft) => hasBackend(draft),
  database: (draft) => hasBackend(draft),
  orm: (draft) =>
    hasBackend(draft) &&
    !!draft.database &&
    draft.database !== 'none' &&
    draft.backendFramework !== 'django' &&
    draft.backendFramework !== 'fastapi',
  redis: (draft) =>
    hasBackend(draft) && !!draft.database && draft.database !== 'none',
  backendExtras: (draft) => hasBackend(draft),

  auth: (draft) => hasFrontend(draft) || hasBackend(draft),
  testing: () => true,
  logging: (draft) => hasBackend(draft),
  monitoring: () => true,
  devtools: () => true,
  devops: () => true,
  deployment: () => true,
};

function hasFrontend(draft: WizardDraft): boolean {
  if (draft.structure === STRUCTURES.SINGLE_APP) {
    return draft.scope === SCOPES.FRONTEND_ONLY || draft.scope === SCOPES.FULLSTACK;
  }
  return true;
}

function hasBackend(draft: WizardDraft): boolean {
  if (draft.structure === STRUCTURES.SINGLE_APP) {
    return draft.scope === SCOPES.BACKEND_ONLY || draft.scope === SCOPES.FULLSTACK;
  }
  if (draft.structure === STRUCTURES.MICROSERVICES) return true;
  return true;
}

export function draftNeedsBackend(draft: WizardDraft): boolean {
  return hasBackend(draft);
}

export function isQuestionVisible(promptId: string, draft: WizardDraft): boolean {
  const rule = visibilityRules[promptId];
  if (!rule) return true;
  return rule(draft);
}

export function getVisiblePromptIds(
  allPromptIds: string[],
  draft: WizardDraft
): string[] {
  return allPromptIds.filter((id) => isQuestionVisible(id, draft));
}