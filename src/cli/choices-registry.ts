
import type { BackendChoice, BackendUtilityChoice, OrmChoice } from "../setup/types.js";

export const PROJECT_STRUCTURES = [
  "Monorepo (apps + packages)",
  "Single app",
  "Microservices (multiple backend services)",
] as const;

export const SINGLE_APP_SCOPES = [
  "Full stack (frontend + backend)",
  "Frontend only",
  "Backend only",
] as const;

export const MONOREPO_TOOLS = ["Turborepo", "Nx", "None (basic workspace)"] as const;

export const PROJECT_TYPES = [
  "SaaS app",
  "API only",
  "Admin dashboard",
  "Mobile app",
  "Full product (web + api)",
] as const;

export const PACKAGE_MANAGERS = ["npm", "pnpm", "yarn", "bun"] as const;

export const WEB_FRAMEWORKS = [
  "Next.js",
  "Vite (React)",
  "Remix",
  "Astro",
  "SvelteKit",
  "Vue (Vite)",
  "None",
] as const;

export const MOBILE_FRAMEWORKS = [
  "Expo (React Native)",
  "React Native (CLI)",
  "Flutter",
  "None",
] as const;

export const FRONTEND_PLATFORMS = ["Web", "Mobile"] as const;

export const FRONTEND_STYLING = [
  "Tailwind CSS",
  "Shadcn UI",
  "Material UI",
  "Chakra UI",
  "Ant Design",
  "Styled Components",
  "Vanilla CSS",
] as const;

export const STATE_DATA = ["React Query", "Zustand", "Redux Toolkit", "Jotai", "MobX", "None"] as const;

export const STATE_DATA_EXPO_LABELS = [
  {
    name: "TanStack Query (React Query) — server/async state (works in Expo)",
    value: "React Query",
  },
  { name: "Zustand — lightweight store (works in Expo)", value: "Zustand" },
  { name: "Redux Toolkit — app-wide state (works in Expo)", value: "Redux Toolkit" },
  { name: "Jotai — atomic state (works in Expo)", value: "Jotai" },
  { name: "MobX — observable state (works in Expo)", value: "MobX" },
  { name: "None — React state only", value: "None" },
] as const satisfies ReadonlyArray<{ name: string; value: (typeof STATE_DATA)[number] }>;

export const FRONTEND_FORMS = ["React Hook Form", "Formik", "None"] as const;

export const FRONTEND_FORMS_EXPO_LABELS = [
  { name: "React Hook Form — common with RN (works in Expo)", value: "React Hook Form" },
  { name: "Formik — alternative (works in Expo)", value: "Formik" },
  { name: "None", value: "None" },
] as const satisfies ReadonlyArray<{ name: string; value: (typeof FRONTEND_FORMS)[number] }>;

export const API_CLIENTS = ["Axios", "Fetch", "tRPC client", "GraphQL client (Apollo)"] as const;

export const API_CLIENTS_EXPO_LABELS = [
  { name: "Axios — HTTP client (common in React Native)", value: "Axios" },
  { name: "Fetch — built-in (no extra dependency)", value: "Fetch" },
  { name: "tRPC client — type-safe with your API", value: "tRPC client" },
  {
    name: "GraphQL client (Apollo) — GraphQL from Expo",
    value: "GraphQL client (Apollo)",
  },
] as const satisfies ReadonlyArray<{ name: string; value: (typeof API_CLIENTS)[number] }>;

export const FRONTEND_EXTRAS = [
  "React Charts",
  "TanStack Table",
  "Framer Motion",
  "Date-fns",
  "React Icons",
] as const;

export const BACKENDS = [
  "NestJS",
  "Express",
  "Fastify",
  "FastAPI",
  "Hono (Edge)",
  "Koa",
  "Django (Python)",
  "Spring Boot (Java)",
] as const;

export const API_TYPES = ["REST", "tRPC", "GraphQL (Apollo)", "gRPC"] as const;

export const BACKEND_UTILITIES_NODE = [
  "Zod (validation)",
  "class-validator (Nest)",
  "Swagger (API docs)",
  "Rate limiting",
  "CORS",
  "Helmet (security)",
] as const;

export const BACKEND_UTILITIES_FASTAPI = ["python-multipart", "slowapi (rate limit)"] as const;

export const BACKEND_UTILITIES_DJANGO = ["django-cors-headers", "drf-spectacular (OpenAPI)"] as const;

export const BACKEND_UTILITIES_SPRING = ["Swagger (API docs)", "Rate limiting", "CORS"] as const;

export const BACKEND_UTILITIES = BACKEND_UTILITIES_NODE;

export function getBackendUtilitiesForBackend(backend: BackendChoice | undefined): readonly string[] {
  if (!backend) return [...BACKEND_UTILITIES_NODE];
  if (backend === "FastAPI") return [...BACKEND_UTILITIES_FASTAPI];
  if (backend === "Django (Python)") return [...BACKEND_UTILITIES_DJANGO];
  if (backend === "Spring Boot (Java)") return [...BACKEND_UTILITIES_SPRING];
  return [...BACKEND_UTILITIES_NODE];
}

export const DATABASES = ["PostgreSQL", "MySQL", "MongoDB", "SQLite", "Redis (cache)", "None"] as const;

export const ORMS_NODE = ["Prisma", "Drizzle", "TypeORM", "Mongoose", "None"] as const;

export const ORMS_FASTAPI = [
  "SQLModel",
  "SQLAlchemy",
  "Tortoise ORM",
  "Beanie (Mongo)",
  "None",
] as const;

export const ORMS_DJANGO = ["Django ORM (built-in)", "None"] as const;

export const ORMS_SPRING = ["Spring Data JPA", "None"] as const;

export const ORMS = ORMS_NODE;

export function getOrmChoicesForBackend(backend: BackendChoice | undefined): readonly string[] {
  if (!backend) return [...ORMS_NODE];
  if (backend === "FastAPI") return [...ORMS_FASTAPI];
  if (backend === "Django (Python)") return [...ORMS_DJANGO];
  if (backend === "Spring Boot (Java)") return [...ORMS_SPRING];
  return [...ORMS_NODE];
}

export const API_TYPES_PYTHON = ["REST", "GraphQL (Strawberry)", "gRPC"] as const;

export function getApiTypesForBackend(backend: BackendChoice | undefined): readonly string[] {
  if (backend === "FastAPI" || backend === "Django (Python)") {
    return [...API_TYPES_PYTHON];
  }
  return [...API_TYPES];
}

export function defaultOrmForBackend(backend: BackendChoice | undefined): OrmChoice {
  if (backend === "FastAPI") return "SQLModel";
  if (backend === "Django (Python)") return "Django ORM (built-in)";
  if (backend === "Spring Boot (Java)") return "Spring Data JPA";
  return "Prisma";
}

export function defaultBackendUtilitiesForBackend(
  backend: BackendChoice | undefined
): BackendUtilityChoice[] {
  if (backend === "FastAPI") return ["python-multipart"];
  if (backend === "Django (Python)") {
    return ["django-cors-headers", "drf-spectacular (OpenAPI)"];
  }
  if (backend === "Spring Boot (Java)") return ["Swagger (API docs)"];
  return ["Zod (validation)", "CORS", "Helmet (security)"];
}

export const FILE_STORAGE = ["AWS S3", "Cloudflare R2", "Local storage", "None"] as const;

export const AUTH_METHODS = [
  "JWT",
  "NextAuth",
  "Clerk",
  "Auth0",
  "Firebase Auth",
  "Supabase Auth",
  "None",
] as const;

export const AUTH_FEATURES = [
  "Email/password",
  "Google login",
  "GitHub login",
  "Role-based access (RBAC)",
  "Session management",
] as const;

export const DEV_TOOLS = [
  "ESLint",
  "Prettier",
  "Husky (git hooks)",
  "lint-staged",
  "Commitlint",
  "EditorConfig",
] as const;

export const TESTING = ["Jest", "Vitest", "Cypress (E2E)", "Playwright", "None"] as const;

export const LOGGING = ["Pino", "Winston", "None"] as const;

export const MONITORING = ["Sentry", "LogRocket", "None"] as const;

export const DEVOPS = [
  "Docker",
  "Docker Compose",
  "Kubernetes (advanced)",
  "GitHub Actions",
  "CI/CD pipeline",
] as const;

export const DEPLOYMENT = ["Vercel", "AWS", "DigitalOcean", "Railway", "Render", "None"] as const;

export const ADVANCED_FEATURES = [
  "Caching (Redis)",
  "Background jobs (BullMQ)",
  "Scheduler jobs (Agenda)",
  "WebSockets (real-time)",
  "Queue system",
  "CDN setup",
] as const;

export const AI_FEATURES = [
  "OpenAI integration",
  "Chat system",
  "Image processing (AI)",
  "Vector DB (Pinecone)",
] as const;

export const SETUP_ACTIONS = ["Proceed setup", "Restart setup", "Cancel"] as const;
