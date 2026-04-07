#!/usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";
import fs from "fs-extra";
import { resolve } from "node:path";
import { $ } from "zx";
import { createProject } from "./setup.js";
import type { PromptAnswers } from "./setup.js";
import { buildAnswers } from "./cli/build-answers.js";
import { loadPreviousSelection, saveSelection } from "./cli/selection-store.js";
import { runWizard } from "./cli/run-wizard.js";
import type { RawPromptAnswers } from "./cli/types.js";

type EditOrProceed = "edit" | "proceed";

async function promptEditOrProceed(projectRoot: string): Promise<EditOrProceed> {
  const { choice } = await inquirer.prompt<{ choice: EditOrProceed }>([
    {
      type: "list",
      name: "choice",
      message: `This folder already exists:\n${chalk.cyan(projectRoot)}\n`,
      choices: [
        {
          name: "Edit — open the wizard with your choices saved (change name or options)",
          value: "edit",
        },
        {
          name: "Proceed — install into this folder (existing files may be merged or overwritten)",
          value: "proceed",
        },
      ],
      default: "edit",
    },
  ]);
  return choice;
}

if (process.platform === "win32") {
  $.shell = "cmd.exe";
  $.prefix = "";
}

console.log(chalk.cyan("\n🚀 Create Fullstack App\n"));

const previousSelection = await loadPreviousSelection();
let draft: Partial<RawPromptAnswers> = previousSelection ?? {};

let answers: PromptAnswers | undefined;
let allowExistingRoot = false;

if (previousSelection) {
  const mode = await inquirer.prompt<{ selectionMode: "Use previous selection" | "Start fresh" }>([
    {
      type: "list",
      name: "selectionMode",
      message: "Previous selection found. How do you want to continue?",
      choices: ["Use previous selection", "Start fresh"],
      default: "Use previous selection",
    },
  ]);
  if (mode.selectionMode === "Use previous selection") {
    const candidate = buildAnswers({ ...draft, setupAction: "Proceed setup" });
    const projectRoot = resolve(process.cwd(), candidate.name.trim());
    if (await fs.pathExists(projectRoot)) {
      const choice = await promptEditOrProceed(projectRoot);
      if (choice === "edit") {
        draft = { ...(previousSelection as Partial<RawPromptAnswers>) };
        answers = undefined;
        allowExistingRoot = false;
      } else {
        answers = candidate;
        allowExistingRoot = true;
      }
    } else {
      answers = candidate;
    }
  } else {
    draft = {};
  }
}

while (true) {
  while (!answers) {
    const raw = await runWizard(draft);
    const candidate = buildAnswers(raw);

    if (raw.setupAction === "Restart setup") {
      console.log(chalk.yellow("\nRestarting setup flow...\n"));
      draft = candidate as Partial<RawPromptAnswers>;
      continue;
    }

    if (raw.setupAction === "Cancel") {
      console.log(chalk.yellow("\nSetup cancelled. Re-run the command when ready.\n"));
      process.exit(0);
    }

    answers = candidate;
  }

  const projectRoot = resolve(process.cwd(), answers.name.trim());
  if (!(await fs.pathExists(projectRoot))) {
    allowExistingRoot = false;
    break;
  }

  if (allowExistingRoot) {
    break;
  }

  const choice = await promptEditOrProceed(projectRoot);
  if (choice === "edit") {
    draft = { ...answers } as Partial<RawPromptAnswers>;
    answers = undefined;
    allowExistingRoot = false;
    continue;
  }

  allowExistingRoot = true;
  break;
}

await saveSelection(answers);
await createProject(answers, { allowExistingRoot });

console.log("\n✅ Project ready!");
