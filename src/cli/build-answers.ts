import type {
  ApiTypeChoice,
  BackendChoice,
  BackendUtilityChoice,
  OrmChoice,
  PromptAnswers,
} from "../setup/types.js";
import {
  defaultBackendUtilitiesForBackend,
  defaultOrmForBackend,
  getApiTypesForBackend,
  getBackendUtilitiesForBackend,
  getOrmChoicesForBackend,
} from "./choices-registry.js";
import {
  getBackendBasicPackageDefaults,
  getFrontendBasicPackageDefaults,
} from "../setup/basic-package-catalog.js";
import {
  migrateLegacyBackendPackages,
  migrateLegacyFrontendPackages,
  splitLegacyBasicPackages,
} from "../setup/basic-packages.js";
import type { RawPromptAnswers } from "./types.js";
import { isFlutterFrontend, isMobileAppType, wantsBackend, wantsFrontend } from "./visibility.js";

function sanitizeOrm(backend: BackendChoice | undefined, raw: string | undefined): OrmChoice {
  const allowed = new Set(getOrmChoicesForBackend(backend));
  const v = raw ?? defaultOrmForBackend(backend);
  return (allowed.has(v) ? v : defaultOrmForBackend(backend)) as OrmChoice;
}

function sanitizeBackendUtilities(
  backend: BackendChoice | undefined,
  raw: BackendUtilityChoice[] | undefined
): BackendUtilityChoice[] {
  const allowed = new Set(getBackendUtilitiesForBackend(backend));
  const list = raw ?? defaultBackendUtilitiesForBackend(backend);
  return list.filter((u): u is BackendUtilityChoice => allowed.has(u));
}

function sanitizeApiType(backend: BackendChoice | undefined, raw: string | undefined): ApiTypeChoice | undefined {
  const allowed = new Set(getApiTypesForBackend(backend));
  const v = raw ?? "REST";
  return (allowed.has(v) ? v : "REST") as ApiTypeChoice;
}

function withMobileProjectOverrides(raw: RawPromptAnswers): RawPromptAnswers {
  if (raw.projectType !== "Mobile app") return raw;
  return {
    ...raw,
    projectStructure: "Single app",
    singleAppScope: "Frontend only",
    needBackend: false,
    frontendPlatform: "Mobile",
  };
}

function resolveBasicPackageSelections(raw: RawPromptAnswers): {
  basicPackagesFrontend: string[];
  basicPackagesBackend: string[];
} {
  const fe = raw.basicPackagesFrontend;
  const be = raw.basicPackagesBackend;
  const hasNew = fe !== undefined || be !== undefined;
  if (hasNew) {
    return {
      basicPackagesFrontend: fe ?? getFrontendBasicPackageDefaults(raw.frontend ?? "Next.js"),
      basicPackagesBackend: be ?? getBackendBasicPackageDefaults(raw.backend ?? "Express"),
    };
  }
  if (raw.basicPackages !== undefined && raw.basicPackages.length > 0) {
    const leg = splitLegacyBasicPackages(raw.basicPackages);
    return {
      basicPackagesFrontend: leg.frontend.includes("None")
        ? []
        : migrateLegacyFrontendPackages(leg.frontend),
      basicPackagesBackend: leg.backend.includes("None")
        ? []
        : migrateLegacyBackendPackages(leg.backend),
    };
  }
  return {
    basicPackagesFrontend: getFrontendBasicPackageDefaults(raw.frontend ?? "Next.js"),
    basicPackagesBackend: getBackendBasicPackageDefaults(raw.backend ?? "Express"),
  };
}

export function buildAnswers(rawAnswers: RawPromptAnswers): PromptAnswers {
  const raw = withMobileProjectOverrides(rawAnswers);
  const wb = wantsBackend(raw);
  const wf = wantsFrontend(raw);
  const basicPkgs = resolveBasicPackageSelections(raw);

  const implicitFullProduct =
    raw.projectStructure === "Single app" &&
    raw.singleAppScope === "Full stack (frontend + backend)";

  const isMobile = isMobileAppType(raw);

  const frontendResolved: PromptAnswers["frontend"] = wf
    ? isMobile
      ? raw.frontend ?? "Expo (React Native)"
      : raw.frontend ?? "Next.js"
    : "None";

  const isFlutter = isFlutterFrontend(frontendResolved);

  const frontendPlatform: PromptAnswers["frontendPlatform"] = wf
    ? isMobile
      ? "Mobile"
      : raw.frontendPlatform ??
        (raw.frontend === "Expo (React Native)" ||
        raw.frontend === "React Native (CLI)" ||
        raw.frontend === "Flutter"
          ? "Mobile"
          : "Web")
    : undefined;

  return {
    name: raw.name ?? "",
    projectType: implicitFullProduct
      ? "Full product (web + api)"
      : raw.projectType ?? "SaaS app",
    useRecommendedStack: false,
    packageManager: raw.packageManager ?? "npm",
    projectStructure: raw.projectStructure ?? "Monorepo (apps + packages)",
    singleAppScope:
      raw.projectStructure === "Single app"
        ? raw.singleAppScope ?? "Full stack (frontend + backend)"
        : undefined,
    monorepoTool:
      raw.projectStructure === "Monorepo (apps + packages)" ||
      raw.projectStructure === "Microservices (multiple backend services)"
        ? raw.monorepoTool ?? "Turborepo"
        : undefined,
    frontendPlatform,
    frontend: frontendResolved,
    frontendTypescript: isFlutter ? false : raw.frontendTypescript ?? true,
    frontendStyling: isMobile ? "Vanilla CSS" : raw.frontendStyling ?? "Tailwind CSS",
    stateData: isFlutter ? "None" : raw.stateData ?? "None",
    frontendForms: isFlutter ? "None" : raw.frontendForms ?? "None",
    frontendExtras: raw.frontendExtras ?? [],
    needBackend: wb,
    backend: wb
      ? raw.backend ?? (raw.projectType === "API only" ? "NestJS" : "Express")
      : undefined,
    backendTypescript: raw.backendTypescript ?? true,
    apiType: wb ? sanitizeApiType(raw.backend, raw.apiType) : undefined,
    backendUtilities: wb ? sanitizeBackendUtilities(raw.backend, raw.backendUtilities) : [],
    database: wb ? raw.database ?? "PostgreSQL" : "None",
    orm: wb ? sanitizeOrm(raw.backend, raw.orm) : "None",
    fileStorage: wf || wb ? raw.fileStorage ?? "Local storage" : "None",
    authentication: raw.authentication ?? "None",
    authFeatures: raw.authFeatures ?? [],
    apiClient: wf && !isFlutter ? raw.apiClient ?? "Axios" : "Fetch",
    devTools: raw.devTools ?? [],
    testing: raw.testing ?? "None",
    logging: wb ? raw.logging ?? "None" : "None",
    monitoring: raw.monitoring ?? "None",
    devops: raw.devops ?? [],
    deployment: isMobile ? "None" : raw.deployment ?? "None",
    advancedFeatures: raw.advancedFeatures ?? [],
    aiFeatures: raw.aiFeatures ?? [],
    basicPackagesFrontend: wf ? basicPkgs.basicPackagesFrontend : [],
    basicPackagesBackend: wb ? basicPkgs.basicPackagesBackend : [],
    confirmSetup: raw.setupAction === "Proceed setup" || raw.setupAction === undefined,
  };
}
