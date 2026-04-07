import fs from "fs-extra";
import { join } from "node:path";
import type { CreateProjectAnswers } from "./types.js";
import { MONOREPO_APPS_GATEWAY, MONOREPO_APPS_WEB } from "./paths.js";
import {
  getPackageManagerInstallCommand,
  getPackageManagerRunDevCommand,
} from "./command-registry.js";

export async function setupProjectBasics(
  answers: CreateProjectAnswers,
  projectRoot: string,
  monorepo: boolean,
  splitLayout: boolean,
  splitSingleAppFullStack: boolean
): Promise<void> {
  const envLines: string[] = [
    "NODE_ENV=development",
    "PORT=3000",
  ];

  if (answers.frontend !== "None") {
    envLines.push("NEXT_PUBLIC_API_URL=http://localhost:5000");
  }
  if (answers.needBackend && answers.backend) {
    envLines.push("API_PORT=5000");
  }
  if (answers.database !== "None") {
    envLines.push("DATABASE_URL=postgresql://user:password@localhost:5432/app");
  }
  if (answers.authentication === "JWT") {
    envLines.push("JWT_SECRET=replace_with_secure_secret");
  }
  if (answers.monitoring === "Sentry") {
    envLines.push("SENTRY_DSN=");
  }
  if (
    answers.advancedFeatures.includes("Caching (Redis)") ||
    answers.database === "Redis (cache)"
  ) {
    envLines.push("REDIS_URL=redis://localhost:6379");
  }
  const includeOpenAi = answers.aiFeatures.includes("OpenAI integration");
  if (includeOpenAi) {
    envLines.push("OPENAI_API_KEY=");
  }
  const includeGoogleAuth = answers.authFeatures.includes("Google login");
  if (includeGoogleAuth) {
    envLines.push("GOOGLE_CLIENT_ID=");
    envLines.push("GOOGLE_CLIENT_SECRET=");
  }

  const splitFullStack =
    splitLayout && answers.frontend !== "None" && answers.needBackend && answers.backend;
  if (!splitFullStack) {
    await fs.writeFile(join(projectRoot, ".env.example"), `${envLines.join("\n")}\n`, "utf8");
  }

  const gitignore = `node_modules
dist
.env
.env.local
.turbo
.nx
coverage
.DS_Store
`;
  if (!splitSingleAppFullStack) {
    await fs.writeFile(join(projectRoot, ".gitignore"), gitignore, "utf8");
  }

  const envStep1 = splitFullStack
    ? "1. Copy `frontend/.env.example` and `backend/.env.example` to `.env` in each folder and adjust values."
    : "1. Copy `.env.example` to `.env` at the repo root (and per-app `.env.example` files where present) and adjust values.";

  const layoutNote = (() => {
    if (answers.projectType === "Mobile app") {
      return "\n- Mobile app: the mobile project lives in `mobile/` (single-app layout; Expo, React Native CLI, or Flutter).\n";
    }
    if (splitLayout && !splitSingleAppFullStack) {
      return "\n- Layout: `frontend/` (web) and `backend/` (API) with a root npm workspace. Install once from the repo root.\n";
    }
    if (monorepo) {
      return "\n- Monorepo: `apps/web/` (frontend), `apps/gateway/` (API gateway), `apps/services/*` (microservice stubs when selected), `packages/` (`types`, `utils`, `logger`, `config`), `infrastructure/`, `scripts/`. Root `.env.example` lists shared keys; apps may add local `.env`.\n";
    }
    if (answers.projectStructure === "Single app" && answers.singleAppScope === "Frontend only") {
      return "\n- Single repo: web app only (scaffolded at the repository root). No `backend/` folder.\n";
    }
    if (answers.projectStructure === "Single app" && answers.singleAppScope === "Backend only") {
      return "\n- Single repo: API/backend only under `backend/`.\n";
    }
    return "";
  })();

  if (!splitSingleAppFullStack) {
    const readme = `# ${answers.name}

Generated with create-fullstack-app.
${layoutNote}
## Stack

- Project type: ${answers.projectType}
- Project structure: ${answers.projectStructure}
- Frontend: ${answers.frontend}
- Backend: ${answers.needBackend ? answers.backend ?? "None" : "None"}
- Database: ${answers.database}
- ORM / data layer: ${answers.orm}${
    answers.backend === "FastAPI"
      ? " (Python: SQLModel/SQLAlchemy/Tortoise/Beanie — not Prisma; Prisma is Node/TypeScript-only.)"
      : answers.backend === "Django (Python)"
        ? " (Django ORM is built into Django.)"
        : answers.backend === "Spring Boot (Java)"
          ? " (Spring Data JPA on the JVM.)"
          : ""
  }
- Auth: ${answers.authentication}
- Package manager: ${answers.packageManager}

## Quick Start

${envStep1}
2. From the project root, install dependencies once.
3. Start development (from root, \`npm run dev\` / \`pnpm dev\` runs both apps when a workspace root is present).

\`\`\`bash
${getPackageManagerInstallCommand(answers.packageManager)}
${
  splitLayout || monorepo
    ? answers.packageManager === "pnpm"
      ? "pnpm dev\n"
      : answers.packageManager === "yarn"
        ? "yarn dev\n"
        : answers.packageManager === "bun"
          ? "bun run dev\n"
          : "npm run dev\n"
    : `${getPackageManagerRunDevCommand(answers.packageManager)}\n`
}
\`\`\`
`;
    await fs.writeFile(join(projectRoot, "README.md"), readme, "utf8");
  }

  if (monorepo) {
    const webEnvPath = join(projectRoot, MONOREPO_APPS_WEB, ".env.example");
    const apiEnvPath = join(projectRoot, MONOREPO_APPS_GATEWAY, ".env.example");

    if (await fs.pathExists(join(projectRoot, MONOREPO_APPS_WEB))) {
      await fs.ensureDir(join(projectRoot, MONOREPO_APPS_WEB));
      let webEnv = "NEXT_PUBLIC_API_URL=http://localhost:5000\n";
      if (includeGoogleAuth) {
        webEnv += "NEXT_PUBLIC_GOOGLE_CLIENT_ID=\n";
      }
      if (includeOpenAi && !answers.needBackend) {
        webEnv += "OPENAI_API_KEY=\n";
      }
      await fs.writeFile(webEnvPath, webEnv, "utf8");
    }
    if (await fs.pathExists(join(projectRoot, MONOREPO_APPS_GATEWAY))) {
      await fs.ensureDir(join(projectRoot, MONOREPO_APPS_GATEWAY));
      let apiEnv =
        "API_PORT=5000\nDATABASE_URL=postgresql://user:password@localhost:5432/app\n";
      if (includeGoogleAuth) {
        apiEnv += "GOOGLE_CLIENT_ID=\nGOOGLE_CLIENT_SECRET=\n";
      }
      if (includeOpenAi) {
        apiEnv += "OPENAI_API_KEY=\n";
      }
      await fs.writeFile(apiEnvPath, apiEnv, "utf8");
    }
  } else if (splitLayout && answers.needBackend && answers.frontend !== "None") {
    await fs.ensureDir(join(projectRoot, "frontend"));
    await fs.ensureDir(join(projectRoot, "backend"));
    let splitFrontendEnv = "NEXT_PUBLIC_API_URL=http://localhost:5000\n";
    if (includeGoogleAuth) {
      splitFrontendEnv += "NEXT_PUBLIC_GOOGLE_CLIENT_ID=\nVITE_GOOGLE_CLIENT_ID=\n";
    }
    await fs.writeFile(join(projectRoot, "frontend", ".env.example"), splitFrontendEnv, "utf8");
    let splitBackendEnv = "API_PORT=5000\nDATABASE_URL=postgresql://user:password@localhost:5432/app\n";
    if (includeGoogleAuth) {
      splitBackendEnv += "GOOGLE_CLIENT_ID=\nGOOGLE_CLIENT_SECRET=\n";
    }
    if (includeOpenAi) {
      splitBackendEnv += "OPENAI_API_KEY=\n";
    }
    await fs.writeFile(join(projectRoot, "backend", ".env.example"), splitBackendEnv, "utf8");

    if (splitSingleAppFullStack) {
      const devCmd =
        answers.packageManager === "pnpm"
          ? "pnpm dev"
          : answers.packageManager === "yarn"
            ? "yarn dev"
            : answers.packageManager === "bun"
              ? "bun run dev"
              : "npm run dev";
      const backendReadme = `# ${answers.name} — backend

Run **from this folder** (no root workspace):

\`\`\`bash
${getPackageManagerInstallCommand(answers.packageManager)}
${devCmd}
\`\`\`
`;
      await fs.writeFile(join(projectRoot, "backend", "README.md"), backendReadme, "utf8");
    }
  } else if (answers.needBackend && answers.frontend === "None") {
    await fs.ensureDir(join(projectRoot, "backend"));
    let apiOnlyEnv = "API_PORT=5000\nDATABASE_URL=postgresql://user:password@localhost:5432/app\n";
    if (includeGoogleAuth) {
      apiOnlyEnv += "GOOGLE_CLIENT_ID=\nGOOGLE_CLIENT_SECRET=\n";
    }
    if (includeOpenAi) {
      apiOnlyEnv += "OPENAI_API_KEY=\n";
    }
    await fs.writeFile(join(projectRoot, "backend", ".env.example"), apiOnlyEnv, "utf8");
  }
}
