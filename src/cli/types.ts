import type { BasicPackageChoice, PromptAnswers } from "../setup/types.js";

export type RawPromptAnswers = Partial<PromptAnswers> & {
  setupAction?: "Proceed setup" | "Restart setup" | "Cancel";
  basicPackages?: BasicPackageChoice[];
};

export const BACK_VALUE = "__BACK__";
