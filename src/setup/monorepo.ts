import fs from "fs-extra";
import path from "path";
import type { MonorepoToolChoice, PackageManagerChoice } from "./types.js";
import {
  getMonorepoBuildScript,
  getMonorepoDevScript,
  getMonorepoToolInstallInvocation,
} from "./command-registry.js";
import { runSpawn } from "./run-spawn.js";
import { linkWorkspacePackagesToApps, setupWorkspacePackages } from "./workspace-packages.js";

export async function setupMonorepo(
  root: string,
  monorepoTool: MonorepoToolChoice,
  packageManager: PackageManagerChoice,
  linkOptions: { hasFrontend: boolean; hasBackend: boolean },
  options?: { skipInfraDockerComposePlaceholder?: boolean }
): Promise<void> {
  await fs.ensureDir(path.join(root, "apps"));
  await fs.ensureDir(path.join(root, "apps", "services"));
  await fs.ensureDir(path.join(root, "packages"));
  await fs.ensureDir(path.join(root, "infrastructure", "docker"));
  await fs.ensureDir(path.join(root, "infrastructure", "k8s"));
  await fs.ensureDir(path.join(root, "infrastructure", "terraform"));
  await fs.ensureDir(path.join(root, "scripts"));

  await fs.writeFile(
    path.join(root, "pnpm-workspace.yaml"),
    `packages:
  - "apps/*"
  - "apps/services/*"
  - "packages/*"
`
  );

  const devScript = getMonorepoDevScript(monorepoTool, packageManager);
  const buildScript = getMonorepoBuildScript(monorepoTool);

  const rootPkg: Record<string, unknown> = {
    name: path.basename(root),
    private: true,
    scripts: {
      dev: devScript,
      build: buildScript,
    },
  };
  if (packageManager !== "pnpm") {
    rootPkg.workspaces = ["apps/*", "apps/services/*", "packages/*"];
  }

  await fs.writeFile(path.join(root, "package.json"), JSON.stringify(rootPkg, null, 2));

  await setupWorkspacePackages(root);
  await linkWorkspacePackagesToApps(root, linkOptions);

  if (!options?.skipInfraDockerComposePlaceholder) {
    await fs.writeFile(
      path.join(root, "infrastructure", "docker", "docker-compose.yml"),
      `# Local stack — add services (Postgres, Redis, Kafka, etc.) as services grow.
version: "3.9"
services: {}
`,
      "utf8"
    );
  } else {
    await fs.writeFile(
      path.join(root, "infrastructure", "docker", "README.md"),
      `# Docker

When **Docker Compose** was selected in DevOps, the generator writes a root \`docker-compose.yml\` next to \`package.json\`. Use that file for app services; keep infra-only services (Postgres, Redis, etc.) here or merge into the root compose as you prefer.
`,
      "utf8"
    );
  }
  await fs.writeFile(
    path.join(root, "infrastructure", "k8s", ".gitkeep"),
    "",
    "utf8"
  );
  await fs.writeFile(
    path.join(root, "infrastructure", "terraform", ".gitkeep"),
    "",
    "utf8"
  );
  await fs.writeFile(
    path.join(root, "scripts", "README.md"),
    "# Scripts\n\nAutomation scripts (migrations, codegen, seed data) live here.\n",
    "utf8"
  );

  if (monorepoTool === "Turborepo") {
    await fs.writeFile(
      path.join(root, "turbo.json"),
      JSON.stringify(
        {
          $schema: "https://turbo.build/schema.json",
          tasks: {
            dev: {
              cache: false,
            },
            build: {
              dependsOn: ["^build"],
              outputs: ["dist/**"],
            },
          },
        },
        null,
        2
      )
    );
    const installTool = getMonorepoToolInstallInvocation(monorepoTool, packageManager);
    if (installTool) {
      await runSpawn(installTool.command, installTool.args, { cwd: root });
    }
  }

  if (monorepoTool === "Nx") {
    await fs.writeFile(
      path.join(root, "nx.json"),
      JSON.stringify(
        {
          extends: "nx/presets/npm.json",
          npmScope: "app",
        },
        null,
        2
      )
    );
    const installTool = getMonorepoToolInstallInvocation(monorepoTool, packageManager);
    if (installTool) {
      await runSpawn(installTool.command, installTool.args, { cwd: root });
    }
  }
}