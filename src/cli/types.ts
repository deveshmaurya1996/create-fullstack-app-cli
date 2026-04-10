export type PromptType = 'text' | 'select' | 'multiselect' | 'confirm' | 'toggle';

export interface PromptChoice {
  value: string;
  label: string;
  description?: string;
  disabled?: boolean;
}

export interface PromptDefinition {
  id: string;
  phase: WizardPhase;
  type: PromptType;
  message: string;
  defaultValue?: unknown;
  choicesRef?: string; 
  staticChoices?: PromptChoice[];
  visible: (draft: import('../shared/types.js').WizardDraft) => boolean;
  transform?: (value: unknown, draft: import('../shared/types.js').WizardDraft) => unknown;
  validate?: (value: unknown) => string | true;
}

export type WizardPhase =
  | 'project-shape'
  | 'frontend'
  | 'backend'
  | 'shared-concerns'
  | 'review';

export const WIZARD_PHASES: WizardPhase[] = [
  'project-shape',
  'frontend',
  'backend',
  'shared-concerns',
  'review',
];

export interface WizardState {
  currentPhase: WizardPhase;
  currentPromptIndex: number;
  draft: import('../shared/types.js').WizardDraft
  history: Array<{
    phase: WizardPhase;
    promptId: string;
    value: unknown;
  }>;
  completed: boolean;
  cancelled: boolean;
}

export interface NavigationAction {
  type: 'next' | 'back' | 'restart' | 'jump' | 'cancel';
  targetPhase?: WizardPhase;
}