import fs from "fs-extra";
import { homedir } from "node:os";
import { dirname, join, resolve } from "node:path";
import type { PromptAnswers } from "../setup/types.js";

const LEGACY_SELECTION = resolve(process.cwd(), ".create-fullstack-app.last-selection.json");

export function getSelectionFilePath(): string {
  return join(homedir(), ".config", "create-fullstack-app", "last-selection.json");
}

export async function loadPreviousSelection(): Promise<Partial<PromptAnswers> | undefined> {
  const hidden = getSelectionFilePath();
  if (await fs.pathExists(hidden)) {
    return fs.readJSON(hidden) as Promise<Partial<PromptAnswers>>;
  }
  if (await fs.pathExists(LEGACY_SELECTION)) {
    const data = (await fs.readJSON(LEGACY_SELECTION)) as Partial<PromptAnswers>;
    await saveSelection(data as PromptAnswers);
    try {
      await fs.remove(LEGACY_SELECTION);
    } catch {
    }
    return data;
  }
  return undefined;
}

export async function saveSelection(answers: PromptAnswers): Promise<void> {
  const file = getSelectionFilePath();
  await fs.ensureDir(dirname(file));
  await fs.writeJSON(file, answers, { spaces: 2 });
}
