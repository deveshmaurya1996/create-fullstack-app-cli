import type { WizardState, WizardPhase, NavigationAction } from './types.js';
import { WIZARD_PHASES } from './types.js';
import type { WizardDraft } from '../shared/types.js';
import { draftNeedsBackend } from './visibility.js';

export function createInitialState(): WizardState {
  return {
    currentPhase: 'project-shape',
    currentPromptIndex: 0,
    draft: {},
    history: [],
    completed: false,
    cancelled: false,
  };
}

export function getNextPhase(currentPhase: WizardPhase): WizardPhase | null {
  const currentIndex = WIZARD_PHASES.indexOf(currentPhase);
  if (currentIndex === -1 || currentIndex >= WIZARD_PHASES.length - 1) return null;
  return WIZARD_PHASES[currentIndex + 1];
}

export function getPreviousPhase(currentPhase: WizardPhase): WizardPhase | null {
  const currentIndex = WIZARD_PHASES.indexOf(currentPhase);
  if (currentIndex <= 0) return null;
  return WIZARD_PHASES[currentIndex - 1];
}

export function applyNavigation(
  state: WizardState,
  action: NavigationAction
): WizardState {
  switch (action.type) {
    case 'next': {
      const nextPhase = getNextPhase(state.currentPhase);
      if (!nextPhase) {
        return { ...state, completed: true };
      }
      return {
        ...state,
        currentPhase: nextPhase,
        currentPromptIndex: 0,
      };
    }

    case 'back': {
      if (state.currentPromptIndex > 0) {
        const lastEntry = state.history[state.history.length - 1];
        const newHistory = state.history.slice(0, -1);
        const newDraft = { ...state.draft };

        if (lastEntry) {
          delete (newDraft as Record<string, unknown>)[lastEntry.promptId];
        }

        newDraft.needBackend = draftNeedsBackend(newDraft);

        return {
          ...state,
          currentPromptIndex: state.currentPromptIndex - 1,
          history: newHistory,
          draft: newDraft,
        };
      }

      const prevPhase = getPreviousPhase(state.currentPhase);
      if (!prevPhase) return state;

      return {
        ...state,
        currentPhase: prevPhase,
        currentPromptIndex: 0,
      };
    }

    case 'restart':
      return createInitialState();

    case 'jump': {
      if (!action.targetPhase) return state;
      return {
        ...state,
        currentPhase: action.targetPhase,
        currentPromptIndex: 0,
      };
    }

    case 'cancel':
      return { ...state, cancelled: true };

    default:
      return state;
  }
}

export function recordAnswer(
  state: WizardState,
  promptId: string,
  value: unknown
): WizardState {
  const next = { ...state.draft, [promptId]: value } as WizardDraft;
  const merged: WizardDraft = {
    ...next,
    needBackend: draftNeedsBackend(next),
  };

  return {
    ...state,
    draft: merged,
    history: [
      ...state.history,
      {
        phase: state.currentPhase,
        promptId,
        value,
      },
    ],
    currentPromptIndex: state.currentPromptIndex + 1,
  };
}