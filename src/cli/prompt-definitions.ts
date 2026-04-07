import * as C from "./choices-registry.js";
import type { RawPromptAnswers } from "./types.js";
import {
  STACK_PACKAGE_LIMIT,
  getBackendBasicPackageChoices,
  getBackendBasicPackageDefaults,
  getFrontendBasicPackageChoices,
  getFrontendBasicPackageDefaults,
} from "../setup/basic-package-catalog.js";
import {
  isFlutterFrontend,
  isMobileAppType,
  wantsBackend,
  wantsFrontend,
  wantsReactNativeStylePackages,
  wantsWebFrontendStack,
} from "./visibility.js";

export type ListChoiceItem = string | { name: string; value: string };

export type QuestionDef = {
  key: keyof RawPromptAnswers;
  type: "input" | "list" | "confirm" | "checkbox";
  message: string | ((ctx: RawPromptAnswers) => string);
  choices?:
    | readonly ListChoiceItem[]
    | ((ctx: RawPromptAnswers) => readonly ListChoiceItem[]);
  when?: (ctx: RawPromptAnswers) => boolean;
  getDefault?: (draft: RawPromptAnswers) => unknown;
  validate?: (v: string) => true | string;
};

export const QUESTION_DEFS: QuestionDef[] = [
  {
    key: "name",
    type: "input",
    message: "Project name:",
    when: () => true,
    getDefault: (d) => d.name ?? "",
    validate: (v) => v.trim().length > 0 || "Project name is required.",
  },
  {
    key: "projectStructure",
    type: "list",
    message: "Project structure:",
    choices: (a) =>
      a.projectType === "Mobile app" ? (["Single app"] as const) : C.PROJECT_STRUCTURES,
    when: () => true,
    getDefault: (d) =>
      d.projectType === "Mobile app" ? "Single app" : d.projectStructure ?? "Monorepo (apps + packages)",
  },
  {
    key: "singleAppScope",
    type: "list",
    message: "What should this single repo contain?",
    choices: C.SINGLE_APP_SCOPES,
    when: (a) => a.projectStructure === "Single app",
    getDefault: (d) => d.singleAppScope ?? "Full stack (frontend + backend)",
  },
  {
    key: "projectType",
    type: "list",
    message: "Project type:",
    choices: C.PROJECT_TYPES,
    when: (a) =>
      !(
        a.projectStructure === "Single app" &&
        a.singleAppScope === "Full stack (frontend + backend)"
      ),
    getDefault: (d) => d.projectType ?? "SaaS app",
  },
  {
    key: "monorepoTool",
    type: "list",
    message: "Monorepo tool:",
    choices: C.MONOREPO_TOOLS,
    when: (a) =>
      a.projectStructure === "Monorepo (apps + packages)" ||
      a.projectStructure === "Microservices (multiple backend services)",
    getDefault: (d) => d.monorepoTool ?? "Turborepo",
  },
  {
    key: "packageManager",
    type: "list",
    message: "Package manager:",
    choices: C.PACKAGE_MANAGERS,
    when: () => true,
    getDefault: (d) => d.packageManager ?? "npm",
  },
  {
    key: "frontendPlatform",
    type: "list",
    message: "Frontend platform:",
    choices: C.FRONTEND_PLATFORMS,
    when: (a) => wantsFrontend(a) && !isMobileAppType(a),
    getDefault: (d) => d.frontendPlatform ?? "Web",
  },
  {
    key: "frontend",
    type: "list",
    message: (a) => {
      if (isMobileAppType(a) || a.frontendPlatform === "Mobile") return "Mobile app framework:";
      return "Web framework:";
    },
    choices: (a) => {
      if (isMobileAppType(a)) return [...C.MOBILE_FRAMEWORKS];
      if (a.frontendPlatform === "Web") return [...C.WEB_FRAMEWORKS];
      if (a.frontendPlatform === "Mobile") return [...C.MOBILE_FRAMEWORKS];
      return [];
    },
    when: (a) =>
      wantsFrontend(a) &&
      (isMobileAppType(a) || a.frontendPlatform === "Web" || a.frontendPlatform === "Mobile"),
    getDefault: (d) => {
      if (isMobileAppType(d)) return d.frontend ?? "Expo (React Native)";
      if (d.frontendPlatform === "Web") return d.frontend ?? "Next.js";
      if (d.frontendPlatform === "Mobile") return d.frontend ?? "Expo (React Native)";
      return d.frontend ?? "Next.js";
    },
  },
  {
    key: "frontendTypescript",
    type: "confirm",
    message: "Use TypeScript for frontend?",
    when: (a) =>
      wantsFrontend(a) &&
      (isMobileAppType(a) || (a.frontend !== undefined && a.frontend !== "None")) &&
      !isFlutterFrontend(a.frontend),
    getDefault: (d) => d.frontendTypescript ?? true,
  },
  {
    key: "frontendStyling",
    type: "list",
    message: "Styling/UI:",
    choices: C.FRONTEND_STYLING,
    when: (a) => wantsWebFrontendStack(a),
    getDefault: (d) => d.frontendStyling ?? "Tailwind CSS",
  },
  {
    key: "stateData",
    type: "list",
    message: (a) =>
      wantsReactNativeStylePackages(a)
        ? "State/Data (Expo / React Native — same options as web, all work in RN):"
        : "State/Data:",
    choices: (a) =>
      wantsReactNativeStylePackages(a) ? [...C.STATE_DATA_EXPO_LABELS] : C.STATE_DATA,
    when: (a) =>
      wantsFrontend(a) &&
      (isMobileAppType(a) || (a.frontend !== undefined && a.frontend !== "None")) &&
      !isFlutterFrontend(a.frontend),
    getDefault: (d) => d.stateData ?? "React Query",
  },
  {
    key: "frontendForms",
    type: "list",
    message: (a) =>
      wantsReactNativeStylePackages(a) ? "Forms (Expo / React Native):" : "Forms:",
    choices: (a) =>
      wantsReactNativeStylePackages(a) ? [...C.FRONTEND_FORMS_EXPO_LABELS] : C.FRONTEND_FORMS,
    when: (a) =>
      wantsFrontend(a) &&
      (isMobileAppType(a) || (a.frontend !== undefined && a.frontend !== "None")) &&
      !isFlutterFrontend(a.frontend),
    getDefault: (d) => d.frontendForms ?? "React Hook Form",
  },
  {
    key: "frontendExtras",
    type: "checkbox",
    message: "Frontend extras (multiple):",
    choices: C.FRONTEND_EXTRAS,
    when: (a) => wantsWebFrontendStack(a),
    getDefault: (d) => d.frontendExtras ?? [],
  },
  {
    key: "apiClient",
    type: "list",
    message: (a) =>
      wantsReactNativeStylePackages(a) ? "API client (Expo / React Native):" : "API client:",
    choices: (a) =>
      wantsReactNativeStylePackages(a) ? [...C.API_CLIENTS_EXPO_LABELS] : C.API_CLIENTS,
    when: (a) =>
      wantsFrontend(a) &&
      (isMobileAppType(a) || (a.frontend !== undefined && a.frontend !== "None")) &&
      !isFlutterFrontend(a.frontend),
    getDefault: (d) => d.apiClient ?? "Axios",
  },
  {
    key: "needBackend",
    type: "confirm",
    message: "Do you need backend?",
    when: (a) =>
      !isMobileAppType(a) &&
      a.projectStructure !== "Single app" &&
      a.projectType !== "API only" &&
      a.projectType !== "Full product (web + api)",
    getDefault: (d) => d.needBackend ?? true,
  },
  {
    key: "basicPackagesFrontend",
    type: "checkbox",
    message: (d) =>
      `Recommended packages — ${d.frontend ?? "Next.js"} frontend (npm, top ${STACK_PACKAGE_LIMIT}; toggle off what you do not need):`,
    choices: (d) =>
      getFrontendBasicPackageChoices(
        isMobileAppType(d) ? d.frontend ?? "Expo (React Native)" : d.frontend ?? "Next.js"
      ),
    when: (a) =>
      wantsFrontend(a) &&
      (isMobileAppType(a) || (a.frontend !== undefined && a.frontend !== "None")),
    getDefault: (d) => {
      const fw = isMobileAppType(d) ? d.frontend ?? "Expo (React Native)" : d.frontend ?? "Next.js";
      const choices = getFrontendBasicPackageChoices(fw);
      const prior = d.basicPackagesFrontend ?? getFrontendBasicPackageDefaults(fw);
      return prior.filter((c) => choices.includes(c));
    },
  },
  {
    key: "backend",
    type: "list",
    message: "Backend:",
    choices: C.BACKENDS,
    when: (a) => wantsBackend(a),
    getDefault: (d) => d.backend ?? "NestJS",
  },
  {
    key: "backendTypescript",
    type: "confirm",
    message: "Use TypeScript for backend?",
    when: (a) =>
      wantsBackend(a) &&
      a.backend !== "FastAPI" &&
      a.backend !== "Django (Python)" &&
      a.backend !== "Spring Boot (Java)",
    getDefault: (d) => d.backendTypescript ?? true,
  },
  {
    key: "apiType",
    type: "list",
    message: "API type:",
    choices: (a) => [...C.getApiTypesForBackend(a.backend)],
    when: (a) => wantsBackend(a),
    getDefault: (d) => {
      const allowed = new Set(C.getApiTypesForBackend(d.backend));
      const v = d.apiType ?? "REST";
      return allowed.has(v) ? v : "REST";
    },
  },
  {
    key: "backendUtilities",
    type: "checkbox",
    message: "Backend features (multiple):",
    choices: (a) => [...C.getBackendUtilitiesForBackend(a.backend)],
    when: (a) => wantsBackend(a),
    getDefault: (d) => {
      const b = d.backend ?? "Express";
      const allowed = new Set(C.getBackendUtilitiesForBackend(b));
      const prior = d.backendUtilities ?? C.defaultBackendUtilitiesForBackend(b);
      return prior.filter((u) => allowed.has(u));
    },
  },
  {
    key: "database",
    type: "list",
    message: "Database:",
    choices: C.DATABASES,
    when: (a) => wantsBackend(a),
    getDefault: (d) => d.database ?? "PostgreSQL",
  },
  {
    key: "orm",
    type: "list",
    message: "ORM / query layer:",
    choices: (a) => [...C.getOrmChoicesForBackend(a.backend)],
    when: (a) => wantsBackend(a),
    getDefault: (d) => {
      const allowed = new Set(C.getOrmChoicesForBackend(d.backend));
      const v = d.orm ?? C.defaultOrmForBackend(d.backend);
      return allowed.has(v) ? v : C.defaultOrmForBackend(d.backend);
    },
  },
  {
    key: "basicPackagesBackend",
    type: "checkbox",
    message: (d) =>
      `Recommended packages — ${d.backend ?? "Express"} backend (top ${STACK_PACKAGE_LIMIT}; toggle off what you do not need):`,
    choices: (d) => getBackendBasicPackageChoices(d.backend ?? "Express"),
    when: (a) => wantsBackend(a),
    getDefault: (d) => {
      const bk = d.backend ?? "Express";
      const choices = getBackendBasicPackageChoices(bk);
      const prior = d.basicPackagesBackend ?? getBackendBasicPackageDefaults(bk);
      return prior.filter((c) => choices.includes(c));
    },
  },
  {
    key: "fileStorage",
    type: "list",
    message: "File storage:",
    choices: C.FILE_STORAGE,
    when: (a) => wantsFrontend(a) || wantsBackend(a),
    getDefault: (d) => d.fileStorage ?? "Local storage",
  },
  {
    key: "authentication",
    type: "list",
    message: "Authentication:",
    choices: (a) => {
      if (!wantsFrontend(a) && wantsBackend(a)) {
        return C.AUTH_METHODS.filter((m) => m !== "NextAuth");
      }
      return C.AUTH_METHODS;
    },
    when: () => true,
    getDefault: (d) => d.authentication ?? "JWT",
  },
  {
    key: "authFeatures",
    type: "checkbox",
    message: "Auth features (multiple):",
    choices: C.AUTH_FEATURES,
    when: (a) => a.authentication !== "None",
    getDefault: (d) => d.authFeatures ?? ["Email/password", "Role-based access (RBAC)"],
  },
  {
    key: "devTools",
    type: "checkbox",
    message: "Dev tools (multiple):",
    choices: C.DEV_TOOLS,
    when: () => true,
    getDefault: (d) => d.devTools ?? ["ESLint", "Prettier", "EditorConfig"],
  },
  {
    key: "testing",
    type: "list",
    message: "Testing:",
    choices: (a) => {
      if (!wantsFrontend(a)) {
        return C.TESTING.filter((t) => t !== "Cypress (E2E)" && t !== "Playwright");
      }
      return C.TESTING;
    },
    when: () => true,
    getDefault: (d) => d.testing ?? "Vitest",
  },
  {
    key: "logging",
    type: "list",
    message: "Logging:",
    choices: C.LOGGING,
    when: (a) => wantsBackend(a),
    getDefault: (d) => d.logging ?? "Pino",
  },
  {
    key: "monitoring",
    type: "list",
    message: "Monitoring:",
    choices: (a) => {
      if (!wantsFrontend(a)) {
        return C.MONITORING.filter((m) => m !== "LogRocket");
      }
      return C.MONITORING;
    },
    when: () => true,
    getDefault: (d) => d.monitoring ?? "Sentry",
  },
  {
    key: "devops",
    type: "checkbox",
    message: "DevOps (multiple):",
    choices: C.DEVOPS,
    when: () => true,
    getDefault: (d) => d.devops ?? ["Docker", "GitHub Actions"],
  },
  {
    key: "deployment",
    type: "list",
    message: "Deployment target:",
    choices: (a) => {
      if (!wantsFrontend(a) && wantsBackend(a)) {
        return C.DEPLOYMENT.filter((x) => x !== "Vercel");
      }
      return C.DEPLOYMENT;
    },
    when: (a) => !isMobileAppType(a),
    getDefault: (d) => d.deployment ?? "Vercel",
  },
  {
    key: "advancedFeatures",
    type: "checkbox",
    message: "Advanced features (multiple):",
    choices: C.ADVANCED_FEATURES,
    when: (a) => wantsBackend(a),
    getDefault: (d) => d.advancedFeatures ?? [],
  },
  {
    key: "aiFeatures",
    type: "checkbox",
    message: "AI features (multiple):",
    choices: C.AI_FEATURES,
    when: (a) => wantsFrontend(a) || wantsBackend(a),
    getDefault: (d) => d.aiFeatures ?? [],
  },
  {
    key: "setupAction",
    type: "list",
    message: "Review action:",
    choices: C.SETUP_ACTIONS,
    when: () => true,
    getDefault: () => "Proceed setup",
  },
];
