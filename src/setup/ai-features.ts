import fs from "fs-extra";
import { join } from "node:path";
import { appendPythonRequirements } from "./basic-packages.js";
import { isNodeBackend, isPythonBackend } from "./basic-package-catalog.js";
import { installPackageDeps } from "./command-registry.js";
import { getBackendPath, getFrontendPath } from "./paths.js";
import type { BackendChoice, CreateProjectAnswers } from "./types.js";

async function appendOpenAiSpringNote(apiPath: string): Promise<void> {
  const file = join(apiPath, "suggested-spring-dependencies.txt");
  const block =
    "\n# OpenAI integration — add an HTTP client or community SDK to call the OpenAI API from your service.\n";
  if (await fs.pathExists(file)) {
    await fs.appendFile(file, block, "utf8");
  } else {
    await fs.writeFile(
      file,
      `# Suggested Maven-style artifact ids (add with your preferred BOM / Gradle catalog)\n${block}`,
      "utf8"
    );
  }
}

export async function setupOpenAiIntegrationPackage(
  answers: CreateProjectAnswers,
  projectRoot: string,
  monorepo: boolean,
  splitLayout: boolean
): Promise<void> {
  if (!answers.aiFeatures.includes("OpenAI integration")) return;

  const hasBackend = Boolean(answers.needBackend && answers.backend);
  const hasFrontend = answers.frontend !== "None";

  const frontendTarget = getFrontendPath(projectRoot, monorepo, splitLayout, answers.projectType);
  const backendTarget = getBackendPath(projectRoot, monorepo);

  if (hasBackend && answers.backend) {
    if (!(await fs.pathExists(backendTarget))) return;
    const bk = answers.backend as BackendChoice;
    if (isNodeBackend(bk)) {
      await installPackageDeps(answers.packageManager, backendTarget, ["openai"], false);
    } else if (isPythonBackend(bk)) {
      await appendPythonRequirements(backendTarget, ["openai"], bk);
    } else if (bk === "Spring Boot (Java)") {
      await appendOpenAiSpringNote(backendTarget);
    }
    return;
  }

  if (
    hasFrontend &&
    answers.frontend !== "Flutter" &&
    (await fs.pathExists(frontendTarget))
  ) {
    await installPackageDeps(answers.packageManager, frontendTarget, ["openai"], false);
  }
}
