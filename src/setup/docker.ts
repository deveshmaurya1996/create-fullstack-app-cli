import fs from "fs-extra";
import { join, relative } from "node:path";
import { isNodeBackend, isPythonBackend } from "./basic-package-catalog.js";
import type {
  BackendChoice,
  CreateProjectAnswers,
  FrontendChoice,
  PackageManagerChoice,
} from "./types.js";

const DOCKERIGNORE = `node_modules
npm-debug.log
.next
dist
.git
.env
.env.*
!.env.example
coverage
.turbo
`;

function relToRoot(projectRoot: string, absPath: string): string {
  const r = relative(projectRoot, absPath).replace(/\\/g, "/");
  return r.startsWith(".") ? r : `./${r}`;
}

async function writeDockerignore(targetDir: string): Promise<void> {
  await fs.writeFile(join(targetDir, ".dockerignore"), DOCKERIGNORE, "utf8");
}

function nodeInstallBlockAndDevCmd(pm: PackageManagerChoice): { install: string; devCmd: string } {
  switch (pm) {
    case "pnpm":
      return {
        install: `COPY package.json pnpm-lock.yaml* ./
RUN corepack enable pnpm && pnpm install --frozen-lockfile`,
        devCmd: `["pnpm", "run", "dev"]`,
      };
    case "yarn":
      return {
        install: `COPY package.json yarn.lock* ./
RUN corepack enable yarn && yarn install --frozen-lockfile`,
        devCmd: `["yarn", "run", "dev"]`,
      };
    case "bun":
      return {
        install: `COPY package.json bun.lockb* package-lock.json* ./
RUN npm install -g bun && bun install`,
        devCmd: `["bun", "run", "dev"]`,
      };
    case "npm":
    default:
      return {
        install: `COPY package*.json ./
RUN npm ci`,
        devCmd: `["npm", "run", "dev"]`,
      };
  }
}

async function writeNodeDockerfile(
  targetDir: string,
  port: number,
  label: string,
  packageManager: PackageManagerChoice
): Promise<void> {
  const { install, devCmd } = nodeInstallBlockAndDevCmd(packageManager);
  const body = `# ${label} — dev-oriented image (tighten for production).
FROM node:20-bookworm-slim
WORKDIR /app
${install}
COPY . .
EXPOSE ${port}
CMD ${devCmd}
`;
  await fs.writeFile(join(targetDir, "Dockerfile"), body, "utf8");
  await writeDockerignore(targetDir);
}

async function writePythonDockerfile(targetDir: string, backend: BackendChoice): Promise<void> {
  const cmd =
    backend === "FastAPI"
      ? 'CMD ["sh", "-c", "pip install -r requirements.txt 2>/dev/null || true && uvicorn main:app --host 0.0.0.0 --port 5000"]'
      : 'CMD ["sh", "-c", "pip install -r requirements.txt 2>/dev/null || true && python manage.py runserver 0.0.0.0:5000"]';
  const body = `# ${backend} — adjust CMD to match your entry module.
FROM python:3.12-slim
WORKDIR /app
COPY requirements.txt* ./
RUN pip install --no-cache-dir -r requirements.txt 2>/dev/null || true
COPY . .
EXPOSE 5000
${cmd}
`;
  await fs.writeFile(join(targetDir, "Dockerfile"), body, "utf8");
  await fs.writeFile(
    join(targetDir, ".dockerignore"),
    `${DOCKERIGNORE}__pycache__\n*.pyc\n.venv\nvenv\n`,
    "utf8"
  );
}

async function writeSpringPlaceholder(targetDir: string): Promise<void> {
  await fs.writeFile(
    join(targetDir, "DOCKER.md"),
    `# Spring Boot in Docker

Add a multi-stage \`Dockerfile\` using your preferred JDK (e.g. \`eclipse-temurin:21-jdk\`) and build with Maven or Gradle. This template does not generate a Dockerfile for JVM stacks.
`,
    "utf8"
  );
}

function frontendPort(frontend: FrontendChoice): number {
  if (frontend === "Next.js") return 3000;
  if (frontend === "Expo (React Native)" || frontend === "React Native (CLI)") return 8081;
  return 5173;
}

export async function setupDockerArtifacts(
  answers: CreateProjectAnswers,
  projectRoot: string,
  ctx: {
    webPath: string;
    apiPath: string;
  }
): Promise<void> {
  const hasDocker = answers.devops.includes("Docker");
  const hasCompose = answers.devops.includes("Docker Compose");
  if (!hasDocker && !hasCompose) return;


  const scaffoldDockerfiles = hasDocker || hasCompose;

  const hasFe = answers.frontend !== "None" && (await fs.pathExists(ctx.webPath));
  const hasApi =
    Boolean(answers.needBackend && answers.backend) &&
    ctx.apiPath.length > 0 &&
    (await fs.pathExists(ctx.apiPath));

  const services: { name: string; context: string; port: number; nodeEnv?: boolean }[] = [];

  if (scaffoldDockerfiles && hasFe) {
    const fe = answers.frontend;
    const port = frontendPort(fe);
    const label =
      fe === "Expo (React Native)"
        ? "Expo (dev server — use EAS Build for production)"
        : fe === "React Native (CLI)"
          ? "React Native Metro (dev)"
          : `${fe} frontend`;
    if (fe === "Flutter") {
      await fs.writeFile(
        join(ctx.webPath, "DOCKER.md"),
        `# Flutter in Docker

Use a multi-stage image with the Flutter SDK, or build APK/IPA in CI (Codemagic, GitHub Actions). This template does not generate a Flutter Dockerfile.
`,
        "utf8"
      );
    } else if (fe === "Expo (React Native)" || fe === "React Native (CLI)") {
      const { install } = nodeInstallBlockAndDevCmd(answers.packageManager);
      const cmd =
        fe === "Expo (React Native)"
          ? 'CMD ["npx", "expo", "start", "--tunnel"]'
          : 'CMD ["npx", "react-native", "start"]';
      const body = `# ${fe} — Metro dev (production: use EAS or native builds).
FROM node:20-bookworm-slim
WORKDIR /app
${install}
COPY . .
EXPOSE 8081
${cmd}
`;
      await fs.writeFile(join(ctx.webPath, "Dockerfile"), body, "utf8");
      await writeDockerignore(ctx.webPath);
      services.push({
        name: "web",
        context: relToRoot(projectRoot, ctx.webPath),
        port,
        nodeEnv: true,
      });
    } else {
      await writeNodeDockerfile(ctx.webPath, port, label, answers.packageManager);
      services.push({
        name: "web",
        context: relToRoot(projectRoot, ctx.webPath),
        port,
        nodeEnv: true,
      });
    }
  }

  if (scaffoldDockerfiles && hasApi && answers.backend) {
    const bk = answers.backend as BackendChoice;
    if (isNodeBackend(bk)) {
      await writeNodeDockerfile(ctx.apiPath, 5000, `${bk} API`, answers.packageManager);
    } else if (isPythonBackend(bk)) {
      await writePythonDockerfile(ctx.apiPath, bk);
    } else if (bk === "Spring Boot (Java)") {
      await writeSpringPlaceholder(ctx.apiPath);
    }
    if (isNodeBackend(bk) || isPythonBackend(bk)) {
      services.push({
        name: "api",
        context: relToRoot(projectRoot, ctx.apiPath),
        port: 5000,
        nodeEnv: isNodeBackend(bk),
      });
    }
  }

  if (hasCompose && services.length > 0) {
    const lines: string[] = [
      "# Generated by create-fullstack-app — run: docker compose up --build",
      "# Add .env next to each app and pass vars here if needed.",
      "services:",
    ];
    const hasApi = services.some((x) => x.name === "api");
    for (const s of services) {
      lines.push(`  ${s.name}:`, `    build: ${s.context}`, `    ports:`, `      - "${s.port}:${s.port}"`);
      if (s.name === "web" && hasApi) {
        lines.push(`    depends_on:`, `      - api`);
      }
      if (s.nodeEnv) {
        lines.push(`    environment:`, `      NODE_ENV: development`);
      }
      lines.push("");
    }
    await fs.writeFile(join(projectRoot, "docker-compose.yml"), lines.join("\n"), "utf8");
  }

  if (hasDocker || hasCompose) {
    await fs.ensureDir(join(projectRoot, "docker"));
    await fs.writeFile(
      join(projectRoot, "docker", "README.md"),
      `# Docker

- **Docker** in DevOps adds \`Dockerfile\` files next to each scaffolded app when applicable.
- **Docker Compose** adds a root \`docker-compose.yml\` wiring those services.

Install [Docker Desktop](https://www.docker.com/products/docker-desktop/) (or Docker Engine on Linux), then from the repo root:

\`\`\`bash
docker compose up --build
\`\`\`

Tune images for production (non-root user, multi-stage builds, healthchecks).
`,
      "utf8"
    );
  }
}
