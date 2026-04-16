import {
  input,
  select,
  checkbox,
  confirm,
} from '@inquirer/prompts';
import type { PromptDefinition, PromptChoice } from './types.js';
import type { WizardDraft } from '../shared/types.js';
import { getChoicesForPrompt } from './choices-registry.js';
import { colors } from './ui/colors.js';

export const BACK_NAVIGATION_VALUE = '__wizard_back__';

export async function runPrompt(
  definition: PromptDefinition,
  draft: WizardDraft
): Promise<unknown> {
  const choices = definition.staticChoices || getChoicesForPrompt(definition.id, draft);

  switch (definition.type) {
    case 'text':
      return runTextPrompt(definition);

    case 'select':
      return runSelectPrompt(definition, choices);

    case 'multiselect':
      return runMultiselectPrompt(definition, choices);

    case 'confirm':
      return runConfirmPrompt(definition);

    default:
      throw new Error(`Unknown prompt type: ${definition.type}`);
  }
}

async function runTextPrompt(definition: PromptDefinition): Promise<string> {
  const value = await input({
    message: colors.label(definition.message),
    default: definition.defaultValue as string | undefined,
    validate: definition.validate
      ? (val: string) => {
          const result = definition.validate!(val);
          return result === true ? true : result;
        }
      : undefined,
  });

  return definition.transform
    ? (definition.transform(value, {} as WizardDraft) as string)
    : value;
}

async function runSelectPrompt(
  definition: PromptDefinition,
  choices: PromptChoice[]
): Promise<string> {
  const backChoice = {
    value: BACK_NAVIGATION_VALUE,
    name: '← Back',
    description: 'Return to the previous question',
  };

  if (choices.length === 0) {
    return 'none';
  }

  if (choices.length === 1) {
    return choices[0].value;
  }

  const value = await select({
    message: colors.label(definition.message),
    choices: [
      backChoice,
      ...choices.map((c) => ({
        value: c.value,
        name: c.label,
        description: c.description,
        disabled: c.disabled,
      })),
    ],
    default: definition.defaultValue as string | undefined,
  });

  return value;
}

async function runMultiselectPrompt(
  definition: PromptDefinition,
  choices: PromptChoice[]
): Promise<string[]> {
  const backChoice = {
    value: BACK_NAVIGATION_VALUE,
    name: '← Back',
    description: 'Return to the previous question',
  };

  if (choices.length === 0) {
    return [];
  }

  const value = await checkbox({
    message: colors.label(definition.message),
    choices: [
      backChoice,
      ...choices.map((c) => ({
        value: c.value,
        name: c.label,
        description: c.description,
        disabled: c.disabled,
      })),
    ],
  });

  if (value.includes(BACK_NAVIGATION_VALUE)) {
    return [BACK_NAVIGATION_VALUE];
  }

  return value;
}

async function runConfirmPrompt(definition: PromptDefinition): Promise<boolean> {
  const value = await confirm({
    message: colors.label(definition.message),
    default: definition.defaultValue as boolean | undefined,
  });

  return value;
}