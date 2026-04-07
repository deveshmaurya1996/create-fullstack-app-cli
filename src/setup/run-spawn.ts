import { spawn } from "node:child_process";
import { existsSync } from "node:fs";
import { dirname, join } from "node:path";

function spawnPromise(
  command: string,
  args: string[],
  options: { cwd?: string; shell?: boolean }
): Promise<void> {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      cwd: options.cwd,
      stdio: "inherit",
      shell: options.shell ?? false,
      windowsHide: true,
    });
    child.on("error", reject);
    child.on("exit", (code) => {
      if (code === 0) resolve();
      else
        reject(
          new Error(
            `Command "${command} ${args.join(" ")}" exited with code ${code ?? "null"}`
          )
        );
    });
  });
}

export function runSpawn(
  command: string,
  args: string[],
  options: { cwd?: string } = {}
): Promise<void> {
  const argv = args.filter((a) => a.length > 0);
  const cwd = options.cwd;

  if (process.platform === "win32") {
    const nodeExe = process.execPath;
    const nodeDir = dirname(nodeExe);
    const base = command.replace(/\.cmd$/i, "").toLowerCase();

    if (base === "npm") {
      const npmCli = join(nodeDir, "node_modules", "npm", "bin", "npm-cli.js");
      if (existsSync(npmCli)) {
        return spawnPromise(nodeExe, [npmCli, ...argv], { cwd, shell: false });
      }
    }
    if (base === "npx") {
      const npxCli = join(nodeDir, "node_modules", "npm", "bin", "npx-cli.js");
      if (existsSync(npxCli)) {
        return spawnPromise(nodeExe, [npxCli, ...argv], { cwd, shell: false });
      }
    }

    const useShell = /\.cmd$/i.test(command) || /pnpm|yarn/i.test(command);
    return spawnPromise(command, argv, { cwd, shell: useShell });
  }

  return spawnPromise(command, argv, { cwd, shell: false });
}
