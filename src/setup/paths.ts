import { join } from "node:path";
import type { FrontendChoice, ProjectTypeChoice } from "./types.js";

export const MONOREPO_APPS_WEB = join("apps", "web");
export const MONOREPO_APPS_GATEWAY = join("apps", "gateway");
export const MONOREPO_APPS_SERVICES = join("apps", "services");

export const DIR_FRONTEND = "frontend";
export const DIR_BACKEND = "backend";

export function getFrontendPath(
  projectRoot: string,
  monorepo: boolean,
  splitLayout: boolean,
  projectType?: ProjectTypeChoice
): string {
  if (monorepo) return join(projectRoot, MONOREPO_APPS_WEB);
  if (splitLayout) return join(projectRoot, DIR_FRONTEND);
  if (projectType === "Mobile app") return join(projectRoot, "mobile");
  return projectRoot;
}

export function getBackendPath(projectRoot: string, monorepo: boolean): string {
  if (monorepo) return join(projectRoot, MONOREPO_APPS_GATEWAY);
  return join(projectRoot, DIR_BACKEND);
}

export function isSplitLayout(needBackend: boolean, frontend: FrontendChoice): boolean {
  return needBackend && frontend !== "None";
}
