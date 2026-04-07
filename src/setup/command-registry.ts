import { $ } from "zx";
import type { MonorepoToolChoice, PackageManagerChoice } from "./types.js";
import { runSpawn } from "./run-spawn.js";

if (process.platform === "win32") {
  $.shell = "cmd.exe";
  $.prefix = "";
}

type PackageManagerCommands = {
  add: string;
  addDev: string;
  install: string;
  runDev: string;
  workspaceDev: string;
};

const PM_COMMANDS: Record<PackageManagerChoice, PackageManagerCommands> = {
  pnpm: {
    add: "pnpm add",
    addDev: "pnpm add -D",
    install: "pnpm install",
    runDev: "pnpm dev",
    workspaceDev: "pnpm -r --parallel --if-present dev",
  },
  npm: {
    add: "npm install",
    addDev: "npm install -D",
    install: "npm install",
    runDev: "npm run dev",
    workspaceDev: "npm run dev --workspaces --if-present",
  },
  yarn: {
    add: "yarn add",
    addDev: "yarn add -D",
    install: "yarn",
    runDev: "yarn dev",
    workspaceDev: "yarn workspaces foreach -pt run dev",
  },
  bun: {
    add: "bun add",
    addDev: "bun add -d",
    install: "bun install",
    runDev: "bun run dev",
    workspaceDev: "bun run --workspaces dev",
  },
};

export function cliExecutable(bin: string): string {
  if (process.platform !== "win32") return bin;
  if (bin === "bun" || bin === "bunx") return bin;
  return `${bin}.cmd`;
}

function commandBin(bin: string): string {
  return cliExecutable(bin);
}

type ScaffoldKey = "nextApp" | "vite" | "nestCli";

export function getPackageManagerAddCommand(
  packageManager: PackageManagerChoice,
  dev = false
): string {
  return dev ? PM_COMMANDS[packageManager].addDev : PM_COMMANDS[packageManager].add;
}

export function getPackageManagerInstallCommand(packageManager: PackageManagerChoice): string {
  return PM_COMMANDS[packageManager].install;
}

export function getWorkspaceDevCommand(packageManager: PackageManagerChoice): string {
  return PM_COMMANDS[packageManager].workspaceDev;
}

export function getPackageManagerRunDevCommand(packageManager: PackageManagerChoice): string {
  return PM_COMMANDS[packageManager].runDev;
}

export function getScaffoldInvocation(
  command: ScaffoldKey,
  packageManager: PackageManagerChoice
): {
  command: string;
  args: string[];
} {
  if (command === "nextApp") {
    if (packageManager === "npm") {
      return { command: commandBin("npm"), args: ["create", "next-app@latest", "--"] };
    }
    if (packageManager === "pnpm") {
      return { command: commandBin("pnpm"), args: ["create", "next-app"] };
    }
    if (packageManager === "yarn") {
      return { command: commandBin("yarn"), args: ["create", "next-app"] };
    }
    return { command: commandBin("bunx"), args: ["create-next-app@latest"] };
  }

  if (command === "vite") {
    if (packageManager === "npm") {
      return { command: commandBin("npm"), args: ["create", "vite@latest", "--"] };
    }
    if (packageManager === "pnpm") {
      return { command: commandBin("pnpm"), args: ["create", "vite"] };
    }
    if (packageManager === "yarn") {
      return { command: commandBin("yarn"), args: ["create", "vite"] };
    }
    return { command: commandBin("bunx"), args: ["create-vite@latest"] };
  }

  if (packageManager === "npm") {
    return {
      command: commandBin("npm"),
      args: ["exec", "--yes", "@nestjs/cli@latest", "--", "new"],
    };
  }
  if (packageManager === "pnpm") {
    return { command: commandBin("pnpm"), args: ["dlx", "@nestjs/cli", "new"] };
  }
  if (packageManager === "yarn") {
    return { command: commandBin("yarn"), args: ["dlx", "@nestjs/cli", "new"] };
  }
  return { command: commandBin("bunx"), args: ["@nestjs/cli@latest", "new"] };
}

export function getCreateExpoAppInvocation(): { command: string; args: string[] } {
  return {
    command: commandBin("npx"),
    args: ["--yes", "create-expo-app@latest", ".", "--template", "tabs"],
  };
}

export function getReactNativeInitInvocation(safeAppName: string): { command: string; args: string[] } {
  const name = /^[A-Za-z][A-Za-z0-9]*$/.test(safeAppName) ? safeAppName : "App";
  return {
    command: commandBin("npx"),
    args: ["--yes", "@react-native-community/cli@latest", "init", name, "--directory", "."],
  };
}

export function getFlutterCreateInvocation(projectName: string): { command: string; args: string[] } {
  const slug = projectName.replace(/[^a-z0-9_]/gi, "_").toLowerCase() || "my_app";
  return {
    command: "flutter",
    args: ["create", ".", "--project-name", slug],
  };
}

export function getNextPackageManagerFlag(packageManager: PackageManagerChoice): string {
  if (packageManager === "pnpm") return "--use-pnpm";
  if (packageManager === "npm") return "--use-npm";
  if (packageManager === "yarn") return "--use-yarn";
  return "";
}

export function getNestPackageManager(packageManager: PackageManagerChoice): "pnpm" | "npm" | "yarn" {
  return packageManager === "bun" ? "npm" : packageManager;
}

export function getMonorepoBuildScript(monorepoTool: MonorepoToolChoice): string {
  if (monorepoTool === "Turborepo") return "turbo run build";
  if (monorepoTool === "Nx") return "nx run-many -t build";
  return "echo build";
}

export function getMonorepoDevScript(
  monorepoTool: MonorepoToolChoice,
  packageManager: PackageManagerChoice
): string {
  if (monorepoTool === "Turborepo") return "turbo run dev";
  if (monorepoTool === "Nx") return "nx run-many -t serve";
  return getWorkspaceDevCommand(packageManager);
}

export function getMonorepoToolInstallCommand(
  monorepoTool: MonorepoToolChoice,
  packageManager: PackageManagerChoice
): string | undefined {
  if (monorepoTool === "None (basic workspace)") return undefined;
  const tool = monorepoTool === "Turborepo" ? "turbo" : "nx";
  return `${getPackageManagerAddCommand(packageManager, true)} ${tool}`;
}

export function getPackageManagerAddInvocation(
  packageManager: PackageManagerChoice,
  dev = false
): { command: string; args: string[] } {
  if (packageManager === "pnpm") {
    return { command: commandBin("pnpm"), args: dev ? ["add", "-D"] : ["add"] };
  }
  if (packageManager === "npm") {
    return { command: commandBin("npm"), args: dev ? ["install", "-D"] : ["install"] };
  }
  if (packageManager === "yarn") {
    return { command: commandBin("yarn"), args: dev ? ["add", "-D"] : ["add"] };
  }
  return { command: commandBin("bun"), args: dev ? ["add", "-d"] : ["add"] };
}

export async function installPackageDeps(
  packageManager: PackageManagerChoice,
  cwd: string,
  deps: string[],
  dev = false
): Promise<void> {
  if (!deps.length) return;
  const add = getPackageManagerAddInvocation(packageManager, dev);
  await runSpawn(add.command, [...add.args, ...deps], { cwd });
}

export function getMonorepoToolInstallInvocation(
  monorepoTool: MonorepoToolChoice,
  packageManager: PackageManagerChoice
): { command: string; args: string[] } | undefined {
  if (monorepoTool === "None (basic workspace)") return undefined;
  const tool = monorepoTool === "Turborepo" ? "turbo" : "nx";
  const add = getPackageManagerAddInvocation(packageManager, true);
  return { command: add.command, args: [...add.args, tool] };
}

export function getFallbackFrontendScripts(): {
  dev: string;
  build: string;
  preview: string;
} {
  return {
    dev: "vite",
    build: "vite build",
    preview: "vite preview",
  };
}

export function getNodeBackendScripts(typescript: boolean): {
  dev: string;
  build?: string;
  start: string;
} {
  if (typescript) {
    return {
      dev: "tsx watch src/index.ts",
      build: "tsc -p tsconfig.json",
      start: "node dist/index.js",
    };
  }

  return {
    dev: "node src/index.js",
    start: "node src/index.js",
  };
}

