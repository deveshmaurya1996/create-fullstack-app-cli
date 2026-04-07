import fs from "fs-extra";
import { join } from "node:path";
import {
  isNodeBackend,
  isPythonBackend,
} from "./basic-package-catalog.js";
import { installPackageDeps } from "./command-registry.js";
import { runSpawn } from "./run-spawn.js";
import { getBackendPath, getFrontendPath } from "./paths.js";
import type {
  BackendChoice,
  BasicPackageChoice,
  FrontendChoice,
  PackageManagerChoice,
  ProjectTypeChoice,
} from "./types.js";

const legacyFrontendPackageMap: Partial<Record<BasicPackageChoice, string>> = {
  Axios: "axios",
  Lodash: "lodash",
  "Day.js": "dayjs",
  "Date-fns": "date-fns",
  UUID: "uuid",
  "React Icons": "react-icons",
  "React Hot Toast": "react-hot-toast",
  "Framer Motion": "framer-motion",
  Recharts: "recharts",
  "TanStack Table": "@tanstack/react-table",
  clsx: "clsx",
};

const legacyBackendPackageMap: Partial<Record<BasicPackageChoice, string>> = {
  Lodash: "lodash",
  UUID: "uuid",
  Zod: "zod",
  dotenv: "dotenv",
  CORS: "cors",
  Helmet: "helmet",
  bcrypt: "bcrypt",
  jsonwebtoken: "jsonwebtoken",
  nodemon: "nodemon",
  Pino: "pino",
  Winston: "winston",
  "Socket.IO": "socket.io",
  BullMQ: "bullmq",
  Agenda: "agenda",
  ioredis: "ioredis",
};

export function splitLegacyBasicPackages(
  selected: BasicPackageChoice[]
): { frontend: BasicPackageChoice[]; backend: BasicPackageChoice[] } {
  if (!selected.length || selected.includes("None")) {
    return { frontend: ["None"], backend: ["None"] };
  }
  const frontend = selected.filter((c) => c in legacyFrontendPackageMap);
  const backend = selected.filter((c) => c in legacyBackendPackageMap);
  return {
    frontend: frontend.length ? frontend : ["None"],
    backend: backend.length ? backend : ["None"],
  };
}

async function installNpmDeps(
  packageManager: PackageManagerChoice,
  targetPath: string,
  deps: string[]
): Promise<void> {
  return installPackageDeps(packageManager, targetPath, deps, false);
}

async function installFlutterPubDeps(targetPath: string, deps: string[]): Promise<void> {
  if (!deps.length) return;
  await runSpawn("flutter", ["pub", "add", ...deps], { cwd: targetPath });
}

function legacyChoiceToNpm(c: BasicPackageChoice, map: Partial<Record<BasicPackageChoice, string>>): string | undefined {
  return map[c];
}

function legacyFrontendToNpm(selected: BasicPackageChoice[]): string[] {
  return selected
    .filter((c) => c !== "None")
    .map((c) => legacyChoiceToNpm(c, legacyFrontendPackageMap))
    .filter((dep): dep is string => Boolean(dep));
}

function legacyBackendToNpm(selected: BasicPackageChoice[]): string[] {
  return selected
    .filter((c) => c !== "None")
    .map((c) => legacyChoiceToNpm(c, legacyBackendPackageMap))
    .filter((dep): dep is string => Boolean(dep));
}

export function migrateLegacyFrontendPackages(leg: BasicPackageChoice[]): string[] {
  return legacyFrontendToNpm(leg);
}

export function migrateLegacyBackendPackages(leg: BasicPackageChoice[]): string[] {
  return legacyBackendToNpm(leg);
}

function normalizeSelected(selected: string[]): string[] {
  if (!selected.length) return [];
  if (selected.includes("None")) return [];
  return [...new Set(selected.filter((c) => c !== "None"))];
}

export async function appendPythonRequirements(
  apiPath: string,
  lines: string[],
  backend: BackendChoice
): Promise<void> {
  if (!lines.length) return;
  const reqPath = join(apiPath, "requirements.txt");
  const exists = await fs.pathExists(reqPath);
  if (!exists && backend === "Django (Python)") {
    await fs.writeFile(reqPath, "django\n", "utf8");
  } else if (!exists) {
    await fs.writeFile(reqPath, "", "utf8");
  }
  const block = `\n# create-fullstack-app extras\n${lines.join("\n")}\n`;
  await fs.appendFile(reqPath, block, "utf8");
  for (const pkg of lines) {
    try {
      await runSpawn("python", ["-m", "pip", "install", pkg], { cwd: apiPath });
    } catch {
    }
  }
}

async function appendSpringSuggestions(apiPath: string, coordinates: string[]): Promise<void> {
  if (!coordinates.length) return;
  const file = join(apiPath, "suggested-spring-dependencies.txt");
  const body =
    `# Suggested Maven-style artifact ids (add with your preferred BOM / Gradle catalog)\n${coordinates.map((c) => `- ${c}`).join("\n")}\n`;
  await fs.writeFile(file, body, "utf8");
}

export async function setupBasicPackages(
  frontendSelected: string[],
  backendSelected: string[],
  projectRoot: string,
  monorepo: boolean,
  needBackend: boolean,
  frontendEnabled: boolean,
  packageManager: PackageManagerChoice,
  backend: BackendChoice | undefined,
  projectType: ProjectTypeChoice | undefined,
  frontend: FrontendChoice
): Promise<void> {
  const fe = normalizeSelected(frontendSelected);
  const be = normalizeSelected(backendSelected);
  if (!fe.length && !be.length) return;

  const splitLayout = Boolean(needBackend && frontendEnabled);
  const frontendTarget = getFrontendPath(projectRoot, monorepo, splitLayout, projectType);
  const backendTarget = getBackendPath(projectRoot, monorepo);

  if (fe.length && frontendEnabled && (await fs.pathExists(frontendTarget))) {
    if (frontend === "Flutter") {
      try {
        await installFlutterPubDeps(frontendTarget, fe);
      } catch {
      }
    } else {
      await installNpmDeps(packageManager, frontendTarget, fe);
    }
  }

  if (!be.length || !needBackend || !backend || !(await fs.pathExists(backendTarget))) return;

  if (isNodeBackend(backend)) {
    await installNpmDeps(packageManager, backendTarget, be);
  } else if (isPythonBackend(backend)) {
    await appendPythonRequirements(backendTarget, be, backend);
  } else if (backend === "Spring Boot (Java)") {
    await appendSpringSuggestions(backendTarget, be);
  }
}
