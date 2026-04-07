export { createProject } from "./setup/index.js";
export type { CreateProjectOptions } from "./setup/index.js";
export { setupBackend } from "./setup/backend.js";
export { setupFrontend } from "./setup/frontend.js";
export { setupMonorepo } from "./setup/monorepo.js";
export { setupProjectStructure } from "./setup/structure.js";
export { setupProjectBasics } from "./setup/project-basics.js";
export { setupBasicPackages } from "./setup/basic-packages.js";
export type {
  AdvancedFeatureChoice,
  AiFeatureChoice,
  ApiClientChoice,
  ApiTypeChoice,
  AuthenticationChoice,
  AuthFeatureChoice,
  BackendChoice,
  BackendConfig,
  BackendUtilityChoice,
  BasicPackageChoice,
  CreateProjectAnswers,
  DatabaseChoice,
  DeploymentChoice,
  DevOpsChoice,
  DevToolChoice,
  FileStorageChoice,
  FrontendChoice,
  FrontendPlatformChoice,
  FrontendConfig,
  FrontendExtraChoice,
  FrontendFormChoice,
  FrontendStylingChoice,
  LoggingChoice,
  MonorepoToolChoice,
  MonitoringChoice,
  OrmChoice,
  PackageManagerChoice,
  ProjectTypeChoice,
  ProjectStructureChoice,
  SingleAppScopeChoice,
  PromptAnswers,
  StateDataChoice,
  TestingChoice,
} from "./setup/types.js";
