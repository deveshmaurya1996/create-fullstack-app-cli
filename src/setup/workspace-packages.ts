import fs from "fs-extra";
import { join } from "node:path";

export const PKG_TYPES = "@repo/types";
export const PKG_UTILS = "@repo/utils";
export const PKG_LOGGER = "@repo/logger";
export const PKG_CONFIG = "@repo/config";

const baseTsconfig = {
  compilerOptions: {
    target: "ES2022",
    module: "ESNext",
    moduleResolution: "Bundler",
    strict: true,
    skipLibCheck: true,
    noEmit: true,
    rootDir: "./src",
  },
  include: ["src"],
};

async function writeLibPackage(
  root: string,
  name: string,
  indexBody: string,
  extraDevDeps?: Record<string, string>
): Promise<void> {
  const dir = join(root, "packages", name);
  await fs.ensureDir(join(dir, "src"));
  await fs.writeJSON(
    join(dir, "package.json"),
    {
      name: `@repo/${name}`,
      version: "0.1.0",
      private: true,
      type: "module",
      types: "./src/index.ts",
      exports: {
        ".": {
          types: "./src/index.ts",
          import: "./src/index.ts",
          default: "./src/index.ts",
        },
      },
      scripts: {
        typecheck: "tsc -p tsconfig.json --noEmit",
      },
      devDependencies: {
        typescript: "^5.7.0",
        ...extraDevDeps,
      },
    },
    { spaces: 2 }
  );
  await fs.writeJSON(join(dir, "tsconfig.json"), baseTsconfig, { spaces: 2 });
  await fs.writeFile(join(dir, "src", "index.ts"), indexBody, "utf8");
}

export async function setupWorkspacePackages(projectRoot: string): Promise<void> {
  await writeLibPackage(
    projectRoot,
    "types",
    `/**
 * Shared TypeScript types across apps. Import from "${PKG_TYPES}".
 */
export const API_VERSION = "0.1.0" as const;

export type HealthResponse = { status: "ok" };
`
  );

  await writeLibPackage(
    projectRoot,
    "utils",
    `/**
 * Shared utilities. Import from "${PKG_UTILS}".
 */
export function assertDefined<T>(value: T | null | undefined, message?: string): T {
  if (value === null || value === undefined) {
    throw new Error(message ?? "Expected value to be defined");
  }
  return value;
}
`
  );

  await writeLibPackage(
    projectRoot,
    "logger",
    `/**
 * Logging facade — swap implementation for pino/winston in production.
 * Import from "${PKG_LOGGER}".
 */
export function createLogger(scope: string) {
  return {
    info: (...args: unknown[]) => console.log(\`[\${scope}]\`, ...args),
    warn: (...args: unknown[]) => console.warn(\`[\${scope}]\`, ...args),
    error: (...args: unknown[]) => console.error(\`[\${scope}]\`, ...args),
  };
}
`
  );

  const configDir = join(projectRoot, "packages", "config");
  await fs.ensureDir(configDir);
  await fs.writeJSON(
    join(configDir, "package.json"),
    {
      name: PKG_CONFIG,
      version: "0.1.0",
      private: true,
      description: "Shared ESLint, TypeScript, and Prettier base configs for workspace packages.",
    },
    { spaces: 2 }
  );
  await fs.writeFile(
    join(configDir, "README.md"),
    `# @repo/config

Place shared \`eslint\`, \`tsconfig\`, and \`prettier\` base fragments here and extend them from apps and packages.
`,
    "utf8"
  );
}

export async function linkWorkspacePackagesToApps(
  projectRoot: string,
  options: { hasFrontend: boolean; hasBackend: boolean }
): Promise<void> {
  const webDeps: Record<string, string> = {
    [PKG_TYPES]: "workspace:*",
    [PKG_UTILS]: "workspace:*",
  };
  const gatewayDeps: Record<string, string> = {
    [PKG_TYPES]: "workspace:*",
    [PKG_UTILS]: "workspace:*",
    [PKG_LOGGER]: "workspace:*",
  };

  if (options.hasFrontend) {
    const pjPath = join(projectRoot, "apps", "web", "package.json");
    if (await fs.pathExists(pjPath)) {
      const pj = (await fs.readJSON(pjPath)) as {
        dependencies?: Record<string, string>;
        devDependencies?: Record<string, string>;
      };
      pj.dependencies = { ...pj.dependencies, ...webDeps };
      await fs.writeJSON(pjPath, pj, { spaces: 2 });
      await patchNextConfigTranspile(join(projectRoot, "apps", "web"), [PKG_TYPES, PKG_UTILS]);
    }
  }

  if (options.hasBackend) {
    const pjPath = join(projectRoot, "apps", "gateway", "package.json");
    if (await fs.pathExists(pjPath)) {
      const pj = (await fs.readJSON(pjPath)) as { dependencies?: Record<string, string> };
      pj.dependencies = { ...pj.dependencies, ...gatewayDeps };
      await fs.writeJSON(pjPath, pj, { spaces: 2 });
    }
  }
}

async function patchNextConfigTranspile(frontendDir: string, packages: string[]): Promise<void> {
  const candidates = ["next.config.ts", "next.config.mjs", "next.config.js", "next.config.cjs"];
  const arrayLiteral = packages.map((p) => `"${p}"`).join(", ");
  for (const name of candidates) {
    const configPath = join(frontendDir, name);
    if (!(await fs.pathExists(configPath))) continue;

    let content = await fs.readFile(configPath, "utf8");
    if (content.includes("transpilePackages")) return;

    const patched = content.replace(
      /(const\s+nextConfig(?::\s*NextConfig)?\s*=\s*\{)/,
      `$1\n  transpilePackages: [${arrayLiteral}],`
    );
    if (patched !== content) {
      await fs.writeFile(configPath, patched, "utf8");
      return;
    }
  }
}
