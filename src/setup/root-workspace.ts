import fs from "fs-extra";
import { join } from "node:path";
import type { PackageManagerChoice } from "./types.js";

const CONCURRENTLY_VERSION = "^9.1.0";

function devScriptsForSplit(
  packageManager: PackageManagerChoice
): { dev: string; devFrontend: string; devBackend: string } {
  switch (packageManager) {
    case "pnpm":
      return {
        dev: `concurrently -n web,api "pnpm --filter frontend dev" "pnpm --filter backend dev"`,
        devFrontend: "pnpm --filter frontend dev",
        devBackend: "pnpm --filter backend dev",
      };
    case "yarn":
      return {
        dev: `concurrently -n web,api "yarn workspace frontend dev" "yarn workspace backend dev"`,
        devFrontend: "yarn workspace frontend dev",
        devBackend: "yarn workspace backend dev",
      };
    case "bun":
      return {
        dev: `concurrently -n web,api "bun run --filter frontend dev" "bun run --filter backend dev"`,
        devFrontend: "bun run --filter frontend dev",
        devBackend: "bun run --filter backend dev",
      };
    case "npm":
    default:
      return {
        dev: `concurrently -n web,api "npm run dev -w frontend" "npm run dev -w backend"`,
        devFrontend: "npm run dev -w frontend",
        devBackend: "npm run dev -w backend",
      };
  }
}

export async function writeSplitRepoRootPackage(
  projectRoot: string,
  projectName: string,
  packageManager: PackageManagerChoice
): Promise<void> {
  const scripts = devScriptsForSplit(packageManager);

  if (packageManager === "pnpm") {
    await fs.writeFile(
      join(projectRoot, "pnpm-workspace.yaml"),
      `packages:\n  - 'frontend'\n  - 'backend'\n`,
      "utf8"
    );
  }

  const pkg: Record<string, unknown> = {
    name: projectName,
    private: true,
    scripts: {
      dev: scripts.dev,
      "dev:frontend": scripts.devFrontend,
      "dev:backend": scripts.devBackend,
    },
    devDependencies: {
      concurrently: CONCURRENTLY_VERSION,
    },
  };

  if (packageManager !== "pnpm") {
    pkg.workspaces = ["frontend", "backend"];
  }

  await fs.writeJSON(join(projectRoot, "package.json"), pkg, { spaces: 2 });
}

export async function writeApiOnlyRootPackage(
  projectRoot: string,
  projectName: string,
  packageManager: PackageManagerChoice
): Promise<void> {
  if (packageManager === "pnpm") {
    await fs.writeFile(
      join(projectRoot, "pnpm-workspace.yaml"),
      `packages:\n  - 'backend'\n`,
      "utf8"
    );
  }

  const pkg: Record<string, unknown> = {
    name: projectName,
    private: true,
    scripts: {
      dev:
        packageManager === "pnpm"
          ? "pnpm --filter backend dev"
          : packageManager === "yarn"
            ? "yarn workspace backend dev"
            : packageManager === "bun"
              ? "bun run --filter backend dev"
              : "npm run dev -w backend",
    },
  };

  if (packageManager !== "pnpm") {
    pkg.workspaces = ["backend"];
  }

  await fs.writeJSON(join(projectRoot, "package.json"), pkg, { spaces: 2 });
}
