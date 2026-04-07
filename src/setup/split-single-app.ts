import fs from "fs-extra";
import { join } from "node:path";

export async function pruneSplitSingleAppRoot(projectRoot: string): Promise<void> {
  let names: string[];
  try {
    names = await fs.readdir(projectRoot);
  } catch {
    return;
  }
  for (const name of names) {
    if (name === "frontend" || name === "backend") continue;
    await fs.remove(join(projectRoot, name));
  }
}
