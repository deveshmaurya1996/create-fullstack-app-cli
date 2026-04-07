import fs from "fs-extra";
import { join } from "node:path";
import type { ProjectStructureChoice, ProjectTypeChoice } from "./types.js";

export async function setupProjectStructure(
  projectStructure: ProjectStructureChoice,
  projectType: ProjectTypeChoice,
  projectRoot: string,
  appBasePath: string,
  splitLayout: boolean
): Promise<void> {

  if (splitLayout && projectStructure === "Single app") {
    return;
  }

  if (projectStructure === "Microservices (multiple backend services)") {
    const services = [
      "auth-service",
      "user-service",
      "payment-service",
      "notification-service",
      "order-service",
    ];
    for (const name of services) {
      const dir = join(projectRoot, "apps", "services", name);
      await fs.ensureDir(dir);
      await fs.writeFile(join(dir, ".gitkeep"), "", "utf8");
    }
  }

  if (projectType === "Admin dashboard") {
    await fs.ensureDir(join(appBasePath, "src", "dashboard"));
  }

  if (projectType === "Mobile app") {
    await fs.ensureDir(join(projectRoot, "mobile"));
  }
}
