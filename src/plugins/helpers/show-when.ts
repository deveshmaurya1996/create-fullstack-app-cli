import type { ShowWhenFn, WizardDraft } from '../../shared/types.js';
import { PLATFORMS, SCOPES, STRUCTURES } from '../../shared/constants.js';

export function hasFrontend(draft: WizardDraft): boolean {
  if (draft.structure === STRUCTURES.SINGLE_APP) {
    return draft.scope === SCOPES.FRONTEND_ONLY || draft.scope === SCOPES.FULLSTACK;
  }
  return true;
}

export function needBackend(draft: WizardDraft): boolean {
  if (draft.structure === STRUCTURES.SINGLE_APP) {
    return draft.scope === SCOPES.BACKEND_ONLY || draft.scope === SCOPES.FULLSTACK;
  }
  if (draft.structure === STRUCTURES.MICROSERVICES) return true;
  return true;
}

export const showAlways: ShowWhenFn = () => true;

export const showWhenWebFrontend: ShowWhenFn = (draft) =>
  hasFrontend(draft) && (draft.platform === PLATFORMS.WEB || draft.platform === PLATFORMS.BOTH);

export const showWhenMobileFrontend: ShowWhenFn = (draft) =>
  hasFrontend(draft) && (draft.platform === PLATFORMS.MOBILE || draft.platform === PLATFORMS.BOTH);

export const showWhenMobileNonFlutter: ShowWhenFn = (draft) =>
  showWhenMobileFrontend(draft) && draft.mobileFramework !== 'flutter';

export const showWhenFrontend: ShowWhenFn = (draft) => hasFrontend(draft);

export const showWhenAuth: ShowWhenFn = (draft) => hasFrontend(draft) || needBackend(draft);

export const showWhenNeedBackend: ShowWhenFn = (draft) => draft.needBackend === true;

export const showWhenNodeBackend: ShowWhenFn = (draft) =>
  draft.needBackend === true &&
  draft.backendFramework !== 'django' &&
  draft.backendFramework !== 'fastapi';

export const showWhenApiClient: ShowWhenFn = (draft) =>
  hasFrontend(draft) &&
  (needBackend(draft) ||
    draft.scope === SCOPES.FRONTEND_ONLY ||
    draft.structure !== STRUCTURES.SINGLE_APP);

export const showWhenMobileNativeTesting: ShowWhenFn = (draft) =>
  showWhenMobileNonFlutter(draft) && draft.mobileFramework !== undefined;
