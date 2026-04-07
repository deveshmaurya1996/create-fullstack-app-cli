export type PackageManagerChoice = "pnpm" | "npm" | "yarn" | "bun";
export type ProjectTypeChoice =
  | "SaaS app"
  | "API only"
  | "Admin dashboard"
  | "Mobile app"
  | "Full product (web + api)";
export type ProjectStructureChoice =
  | "Monorepo (apps + packages)"
  | "Single app"
  | "Microservices (multiple backend services)";

export type SingleAppScopeChoice =
  | "Full stack (frontend + backend)"
  | "Frontend only"
  | "Backend only";
export type MonorepoToolChoice = "Turborepo" | "Nx" | "None (basic workspace)";

export type FrontendPlatformChoice = "Web" | "Mobile";

export type FrontendChoice =
  | "Next.js"
  | "Vite (React)"
  | "Remix"
  | "Astro"
  | "SvelteKit"
  | "Vue (Vite)"
  | "Expo (React Native)"
  | "React Native (CLI)"
  | "Flutter"
  | "None";
export type FrontendStylingChoice =
  | "Tailwind CSS"
  | "Shadcn UI"
  | "Material UI"
  | "Chakra UI"
  | "Ant Design"
  | "Styled Components"
  | "Vanilla CSS";
export type StateDataChoice =
  | "React Query"
  | "Zustand"
  | "Redux Toolkit"
  | "Jotai"
  | "MobX"
  | "None";
export type FrontendFormChoice = "React Hook Form" | "Formik" | "None";
export type FrontendExtraChoice =
  | "React Charts"
  | "TanStack Table"
  | "Framer Motion"
  | "Date-fns"
  | "React Icons";
export type BasicPackageChoice =
  | "None"
  | "Axios"
  | "Lodash"
  | "Day.js"
  | "Date-fns"
  | "UUID"
  | "Zod"
  | "React Icons"
  | "React Hot Toast"
  | "Framer Motion"
  | "Recharts"
  | "TanStack Table"
  | "clsx"
  | "dotenv"
  | "CORS"
  | "Helmet"
  | "bcrypt"
  | "jsonwebtoken"
  | "nodemon"
  | "Pino"
  | "Winston"
  | "Socket.IO"
  | "BullMQ"
  | "Agenda"
  | "ioredis";

export type BackendChoice =
  | "NestJS"
  | "Express"
  | "Fastify"
  | "FastAPI"
  | "Hono (Edge)"
  | "Koa"
  | "Django (Python)"
  | "Spring Boot (Java)";
export type ApiTypeChoice =
  | "REST"
  | "tRPC"
  | "GraphQL (Apollo)"
  | "GraphQL (Strawberry)"
  | "gRPC";
export type BackendUtilityChoice =
  | "Zod (validation)"
  | "class-validator (Nest)"
  | "Swagger (API docs)"
  | "Rate limiting"
  | "CORS"
  | "Helmet (security)"
  | "python-multipart"
  | "slowapi (rate limit)"
  | "django-cors-headers"
  | "drf-spectacular (OpenAPI)";

export type DatabaseChoice =
  | "PostgreSQL"
  | "MySQL"
  | "MongoDB"
  | "SQLite"
  | "Redis (cache)"
  | "None";
  
export type OrmChoice =
  | "Prisma"
  | "Drizzle"
  | "TypeORM"
  | "Mongoose"
  | "SQLModel"
  | "SQLAlchemy"
  | "Tortoise ORM"
  | "Beanie (Mongo)"
  | "Django ORM (built-in)"
  | "Spring Data JPA"
  | "None";
export type FileStorageChoice = "AWS S3" | "Cloudflare R2" | "Local storage" | "None";

export type AuthenticationChoice =
  | "JWT"
  | "NextAuth"
  | "Clerk"
  | "Auth0"
  | "Firebase Auth"
  | "Supabase Auth"
  | "None";
export type AuthFeatureChoice =
  | "Email/password"
  | "Google login"
  | "GitHub login"
  | "Role-based access (RBAC)"
  | "Session management";
export type ApiClientChoice = "Axios" | "Fetch" | "tRPC client" | "GraphQL client (Apollo)";

export type DevToolChoice =
  | "ESLint"
  | "Prettier"
  | "Husky (git hooks)"
  | "lint-staged"
  | "Commitlint"
  | "EditorConfig";
export type TestingChoice = "Jest" | "Vitest" | "Cypress (E2E)" | "Playwright" | "None";
export type LoggingChoice = "Pino" | "Winston" | "None";
export type MonitoringChoice = "Sentry" | "LogRocket" | "None";
export type DevOpsChoice =
  | "Docker"
  | "Docker Compose"
  | "Kubernetes (advanced)"
  | "GitHub Actions"
  | "CI/CD pipeline";
export type DeploymentChoice =
  | "Vercel"
  | "AWS"
  | "DigitalOcean"
  | "Railway"
  | "Render"
  | "None";
export type AdvancedFeatureChoice =
  | "Caching (Redis)"
  | "Background jobs (BullMQ)"
  | "Scheduler jobs (Agenda)"
  | "WebSockets (real-time)"
  | "Queue system"
  | "CDN setup";
export type AiFeatureChoice =
  | "OpenAI integration"
  | "Chat system"
  | "Image processing (AI)"
  | "Vector DB (Pinecone)";

export interface FrontendConfig {
  frontend: FrontendChoice;
  packageManager: PackageManagerChoice;
  typescript: boolean;
  styling: FrontendStylingChoice;
  stateData: StateDataChoice;
  forms: FrontendFormChoice;
  apiClient: ApiClientChoice;
  extras: FrontendExtraChoice[];
  authFeatures?: AuthFeatureChoice[];
  testing?: TestingChoice;
}

export interface BackendConfig {
  backend: BackendChoice;
  packageManager: PackageManagerChoice;
  typescript: boolean;
  apiType: ApiTypeChoice;
  utilities: BackendUtilityChoice[];
  database: DatabaseChoice;
  orm: OrmChoice;
  auth: AuthenticationChoice;
  authFeatures: AuthFeatureChoice[];
  logging: LoggingChoice;
  advancedFeatures: AdvancedFeatureChoice[];
  testing?: TestingChoice;
}

export interface PromptAnswers {
  name: string;
  projectType: ProjectTypeChoice;
  useRecommendedStack: boolean;
  packageManager: PackageManagerChoice;
  projectStructure: ProjectStructureChoice;
  frontendPlatform?: FrontendPlatformChoice;
  singleAppScope?: SingleAppScopeChoice;
  monorepoTool?: MonorepoToolChoice;
  frontend: FrontendChoice;
  frontendTypescript: boolean;
  frontendStyling: FrontendStylingChoice;
  stateData: StateDataChoice;
  frontendForms: FrontendFormChoice;
  frontendExtras: FrontendExtraChoice[];
  needBackend: boolean;
  backend?: BackendChoice;
  backendTypescript?: boolean;
  apiType?: ApiTypeChoice;
  backendUtilities: BackendUtilityChoice[];
  database: DatabaseChoice;
  orm: OrmChoice;
  fileStorage: FileStorageChoice;
  authentication: AuthenticationChoice;
  authFeatures: AuthFeatureChoice[];
  apiClient: ApiClientChoice;
  devTools: DevToolChoice[];
  testing: TestingChoice;
  logging: LoggingChoice;
  monitoring: MonitoringChoice;
  devops: DevOpsChoice[];
  deployment: DeploymentChoice;
  advancedFeatures: AdvancedFeatureChoice[];
  aiFeatures: AiFeatureChoice[];
  basicPackagesFrontend: string[];
  basicPackagesBackend: string[];
  confirmSetup: boolean;
}

export interface CreateProjectAnswers extends PromptAnswers {}
