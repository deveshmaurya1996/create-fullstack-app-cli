import inquirer from "inquirer";
import {
  QUESTION_DEFS,
  type ListChoiceItem,
  type QuestionDef,
} from "./prompt-definitions.js";
import { BACK_VALUE, type RawPromptAnswers } from "./types.js";

function normalizeListChoices(raw: readonly ListChoiceItem[]): { name: string; value: string }[] {
  return raw.map((c) =>
    typeof c === "string" ? { name: c, value: c } : { name: c.name, value: c.value }
  );
}

function stepBackToVisibleIndex(draft: RawPromptAnswers, startIndex: number): number {
  let i = startIndex;
  while (i >= 0) {
    const def = QUESTION_DEFS[i];
    if (def.when?.(draft) ?? true) return i;
    i--;
  }
  return 0;
}

function clearDraftFromIndex(draft: RawPromptAnswers, fromIndexInclusive: number): void {
  for (let j = fromIndexInclusive; j < QUESTION_DEFS.length; j++) {
    const k = QUESTION_DEFS[j].key;
    delete draft[k];
  }
}

async function promptOne(
  def: QuestionDef,
  draft: RawPromptAnswers,
  canAddBack: boolean
): Promise<unknown | typeof BACK_VALUE> {
  const defDefault = def.getDefault?.(draft);
  const message = typeof def.message === "function" ? def.message(draft) : def.message;

  if (def.type === "input") {
    const res = await inquirer.prompt([
      {
        type: "input",
        name: def.key,
        message,
        default: defDefault as string,
        validate: def.validate,
      },
    ]);
    return res[def.key];
  }

  if (def.type === "confirm") {
    const choices: { name: string; value: boolean | typeof BACK_VALUE }[] = [
      { name: "Yes", value: true },
      { name: "No", value: false },
    ];
    if (canAddBack) {
      choices.push({ name: "← Back", value: BACK_VALUE });
    }
    const res = await inquirer.prompt([
      {
        type: "list",
        name: def.key,
        message,
        choices,
        default: defDefault === false ? false : true,
      },
    ]);
    return res[def.key];
  }

  if (def.type === "list") {
    const rawChoices = typeof def.choices === "function" ? def.choices(draft) : def.choices ?? [];
    const choices = normalizeListChoices(rawChoices as ListChoiceItem[]);
    if (canAddBack) {
      choices.push({ name: "← Back", value: BACK_VALUE });
    }
    const res = await inquirer.prompt([
      {
        type: "list",
        name: def.key,
        message,
        choices,
        default: defDefault as string,
      },
    ]);
    return res[def.key];
  }

  if (def.type === "checkbox") {
    const rawChoices = (typeof def.choices === "function" ? def.choices(draft) : def.choices ?? []) as
      | string[]
      | readonly string[];
    const choices: { name: string; value: string }[] = [];
    for (const c of rawChoices) {
      choices.push({ name: c, value: c });
    }
    if (canAddBack) {
      choices.push({ name: "← Back", value: BACK_VALUE });
    }
    if (rawChoices.length === 0) {
      return [];
    }
    const res = await inquirer.prompt([
      {
        type: "checkbox",
        name: def.key,
        message,
        choices,
        default: defDefault as string[],
        validate: (selected: string[]) => {
          if (selected.includes(BACK_VALUE) && selected.length > 1) {
            return "Select only ← Back, or pick other options without ← Back.";
          }
          return true;
        },
      },
    ]);
    const arr = res[def.key] as string[];
    if (arr.includes(BACK_VALUE)) {
      return BACK_VALUE;
    }
    return arr;
  }

  throw new Error(`Unsupported prompt type: ${(def as QuestionDef).type}`);
}

export async function runWizard(initialDraft: Partial<RawPromptAnswers>): Promise<RawPromptAnswers> {
  const draft = { ...initialDraft } as RawPromptAnswers;
  const stack: { index: number }[] = [];
  let i = 0;

  while (i < QUESTION_DEFS.length) {
    const def = QUESTION_DEFS[i];
    if (!def.when?.(draft)) {
      i++;
      continue;
    }

    const canAddBack = stack.length > 0;
    const result = await promptOne(def, draft, canAddBack);

    if (result === BACK_VALUE) {
      const prev = stack.pop();
      if (!prev) {
        i = 0;
        continue;
      }
      clearDraftFromIndex(draft, prev.index);
      i = stepBackToVisibleIndex(draft, prev.index);
      continue;
    }

    draft[def.key] = result as never;
    stack.push({ index: i });
    i++;
  }

  return draft;
}
