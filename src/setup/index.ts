import fs from "fs-extra";
import { resolve } from "node:path";
import { setupBackend } from "./backend.js";
import { setupFrontend } from "./frontend.js";
import { setupMonorepo } from "./monorepo.js";
import { setupProjectBasics } from "./project-basics.js";
import { setupBasicPackages } from "./basic-packages.js";
import { setupProjectStructure } from "./structure.js";
import type { CreateProjectAnswers } from "./types.js";
import { setupOpenAiIntegrationPackage } from "./ai-features.js";
import { getBackendPath, getFrontendPath, isSplitLayout } from "./paths.js";
import { writeApiOnlyRootPackage, writeSplitRepoRootPackage } from "./root-workspace.js";
import { pruneSplitSingleAppRoot } from "./split-single-app.js";
import { setupDockerArtifacts } from "./docker.js";

export type CreateProjectOptions = {
  allowExistingRoot?: boolean;
};

export async function createProject(
  answers: CreateProjectAnswers,
  options?: CreateProjectOptions
): Promise<void> {
  const projectName = answers.name.trim();
  const projectStructure = answers.projectStructure ?? "Single app";
  const monorepo =
    projectStructure === "Monorepo (apps + packages)" ||
    projectStructure === "Microservices (multiple backend services)";
  const splitLayout = isSplitLayout(answers.needBackend, answers.frontend);
  const splitSingleAppFullStack =
    projectStructure === "Single app" &&
    splitLayout &&
    answers.frontend !== "None" &&
    Boolean(answers.needBackend && answers.backend);

  if (!projectName) {
    throw new Error("Project name is required.");
  }

  const projectRoot = resolve(process.cwd(), projectName);
  const exists = await fs.pathExists(projectRoot);

  if (exists && !options?.allowExistingRoot) {
    throw new Error(
      `Directory already exists: ${projectRoot}\nRemove or rename it, or run the wizard and pick a different project name.`
    );
  }

  if (!exists) {
    await fs.ensureDir(projectRoot);
  }

  const webPath = getFrontendPath(projectRoot, monorepo, splitLayout, answers.projectType);
  const apiPath = answers.needBackend ? getBackendPath(projectRoot, monorepo) : "";

  await setupFrontend(
    {
      frontend: answers.frontend,
      packageManager: answers.packageManager,
      typescript: answers.frontendTypescript ?? true,
      styling: answers.frontendStyling,
      stateData: answers.stateData,
      forms: answers.frontendForms,
      apiClient: answers.apiClient,
      extras: answers.frontendExtras,
      authFeatures: answers.authFeatures,
      testing: answers.testing,
    },
    webPath
  );

  if (answers.needBackend && answers.backend) {
    await setupBackend(
      {
        backend: answers.backend,
        packageManager: answers.packageManager,
        typescript: answers.backendTypescript ?? true,
        apiType: answers.apiType ?? "REST",
        utilities: answers.backendUtilities,
        database: answers.database,
        orm: answers.orm,
        auth: answers.authentication,
        authFeatures: answers.authFeatures,
        logging: answers.logging,
        advancedFeatures: answers.advancedFeatures,
        testing: answers.testing,
      },
      apiPath
    );
  }

  if (monorepo) {
    await setupMonorepo(
      projectRoot,
      answers.monorepoTool ?? "None (basic workspace)",
      answers.packageManager,
      {
        hasFrontend: answers.frontend !== "None",
        hasBackend: Boolean(answers.needBackend && answers.backend),
      },
      {
        skipInfraDockerComposePlaceholder: answers.devops.includes("Docker Compose"),
      }
    );
  } else if (splitLayout && answers.frontend !== "None" && !splitSingleAppFullStack) {
    await writeSplitRepoRootPackage(projectRoot, projectName, answers.packageManager);
  } else if (answers.needBackend && answers.frontend === "None") {
    await writeApiOnlyRootPackage(projectRoot, projectName, answers.packageManager);
  }

  const appBasePath =
    answers.frontend !== "None"
      ? webPath
      : answers.needBackend
        ? apiPath
        : projectRoot;

  await setupProjectStructure(projectStructure, answers.projectType, projectRoot, appBasePath, splitLayout);
  await setupProjectBasics(answers, projectRoot, monorepo, splitLayout, splitSingleAppFullStack);

  await setupBasicPackages(
    answers.basicPackagesFrontend,
    answers.basicPackagesBackend,
    projectRoot,
    monorepo,
    answers.needBackend,
    answers.frontend !== "None",
    answers.packageManager,
    answers.backend,
    answers.projectType,
    answers.frontend
  );

  await setupOpenAiIntegrationPackage(answers, projectRoot, monorepo, splitLayout);

  if (splitSingleAppFullStack) {
    await pruneSplitSingleAppRoot(projectRoot);
  }

  await setupDockerArtifacts(answers, projectRoot, {
    webPath,
    apiPath,
  });
}
