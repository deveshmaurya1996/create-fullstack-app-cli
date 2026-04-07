import fs from "fs-extra";
import { join } from "node:path";
import type { BackendConfig, TestingChoice } from "./types.js";
import {
  cliExecutable,
  getNodeBackendScripts,
  getNestPackageManager,
  getPackageManagerAddInvocation,
  getScaffoldInvocation,
  installPackageDeps,
} from "./command-registry.js";
import { runSpawn } from "./run-spawn.js";
import { isNodeBackend } from "./basic-package-catalog.js";
import { appendPythonRequirements } from "./basic-packages.js";

async function setupFastapiPythonLayer(apiPath: string, config: BackendConfig): Promise<void> {
  const ormLines: string[] = [];
  if (config.orm === "SQLModel") {
    ormLines.push("sqlmodel", "sqlalchemy");
  } else if (config.orm === "SQLAlchemy") {
    ormLines.push("sqlalchemy");
  } else if (config.orm === "Tortoise ORM") {
    ormLines.push("tortoise-orm", "asyncpg");
  } else if (config.orm === "Beanie (Mongo)") {
    ormLines.push("beanie", "motor");
  }
  if (ormLines.length) {
    await appendPythonRequirements(apiPath, ormLines, "FastAPI");
  }

  const utilLines: string[] = [];
  if (config.utilities.includes("python-multipart")) utilLines.push("python-multipart");
  if (config.utilities.includes("slowapi (rate limit)")) utilLines.push("slowapi");
  if (utilLines.length) {
    await appendPythonRequirements(apiPath, utilLines, "FastAPI");
  }

  if (config.database !== "None") {
    await fs.appendFile(
      join(apiPath, ".env.example"),
      "\nDATABASE_URL=postgresql://user:password@localhost:5432/app\n"
    );
  }

  if (config.auth === "JWT") {
    await appendPythonRequirements(apiPath, ["python-jose[cryptography]", "passlib[bcrypt]"], "FastAPI");
  }

  if (config.apiType === "GraphQL (Strawberry)") {
    await appendPythonRequirements(apiPath, ["strawberry-graphql[fastapi]"], "FastAPI");
  }

  if (config.apiType === "gRPC") {
    await appendPythonRequirements(apiPath, ["grpcio", "grpcio-tools"], "FastAPI");
  }
}

async function setupDjangoPythonLayer(apiPath: string, config: BackendConfig): Promise<void> {
  const lines: string[] = [];
  if (config.utilities.includes("django-cors-headers")) lines.push("django-cors-headers");
  if (config.utilities.includes("drf-spectacular (OpenAPI)")) lines.push("drf-spectacular");
  if (lines.length && (await fs.pathExists(join(apiPath, "requirements.txt")))) {
    await appendPythonRequirements(apiPath, lines, "Django (Python)");
  }
}

async function setupSpringHints(apiPath: string, config: BackendConfig): Promise<void> {
  const lines: string[] = [];
  if (config.orm === "Spring Data JPA") {
    lines.push("spring-boot-starter-data-jpa");
  }
  if (config.utilities.includes("Swagger (API docs)")) {
    lines.push("springdoc-openapi-starter-webmvc-ui");
  }
  if (config.utilities.includes("Rate limiting")) {
    lines.push("bucket4j-spring-boot-starter (or Resilience4j rate limiter)");
  }
  if (config.utilities.includes("CORS")) {
    lines.push("Configure CORS via WebMvcConfigurer or @CrossOrigin (spring-web)");
  }
  if (config.authFeatures.includes("Google login")) {
    lines.push("spring-boot-starter-oauth2-client (Google / OIDC sign-in)");
  }
  if (config.testing && config.testing !== "None") {
    lines.push("spring-boot-starter-test (JUnit 5)");
  }
  if (!lines.length) return;
  const file = join(apiPath, "suggested-spring-dependencies.txt");
  const block = `\n# From create-fullstack-app wizard\n${lines.map((l) => `- ${l}`).join("\n")}\n`;
  if (await fs.pathExists(file)) {
    await fs.appendFile(file, block, "utf8");
  } else {
    await fs.writeFile(file, `# Suggested Maven-style coordinates / starters\n${block}`, "utf8");
  }
}

async function installDeps(
  packageManager: BackendConfig["packageManager"],
  apiPath: string,
  deps: string[],
  dev = false
): Promise<void> {
  return installPackageDeps(packageManager, apiPath, deps, dev);
}

async function installBackendTestingPackages(config: BackendConfig, apiPath: string): Promise<void> {
  const t: TestingChoice | undefined = config.testing;
  if (!t || t === "None") return;
  try {
    if (config.backend === "FastAPI") {
      await appendPythonRequirements(apiPath, ["pytest", "httpx", "pytest-asyncio"], "FastAPI");
      return;
    }
    if (config.backend === "Django (Python)") {
      await appendPythonRequirements(apiPath, ["pytest", "pytest-django", "httpx"], "Django (Python)");
      return;
    }
    if (!isNodeBackend(config.backend)) {
      return;
    }
    if (t === "Jest" && config.backend === "NestJS") {
      return;
    }
    if (t === "Vitest") {
      await installDeps(config.packageManager, apiPath, ["vitest", "@vitest/coverage-v8"], true);
    } else if (t === "Jest") {
      const dev = ["jest", "@types/jest"];
      if (config.typescript) dev.push("ts-jest");
      await installDeps(config.packageManager, apiPath, dev, true);
    } else if (t === "Playwright") {
      await installDeps(config.packageManager, apiPath, ["@playwright/test"], true);
    } else if (t === "Cypress (E2E)") {
      await installDeps(config.packageManager, apiPath, ["cypress"], true);
    }
  } catch {
    // best-effort
  }
}

async function initNodeService(apiPath: string, typescript: boolean): Promise<void> {
  await fs.ensureDir(join(apiPath, "src"));
  await fs.writeJSON(
    join(apiPath, "package.json"),
    typescript
      ? {
          name: "backend",
          private: true,
          version: "0.1.0",
          type: "module",
          scripts: getNodeBackendScripts(true),
        }
      : {
          name: "backend",
          private: true,
          version: "0.1.0",
          scripts: getNodeBackendScripts(false),
        },
    { spaces: 2 }
  );
  if (typescript) {
    await fs.writeJSON(
      join(apiPath, "tsconfig.json"),
      {
        compilerOptions: {
          target: "ES2022",
          module: "ESNext",
          moduleResolution: "Bundler",
          strict: true,
          rootDir: "./src",
          outDir: "./dist",
          esModuleInterop: true,
        },
        include: ["src"],
      },
      { spaces: 2 }
    );
  }
  await fs.writeFile(join(apiPath, ".env.example"), "API_PORT=5000\n", "utf8");
}

export async function setupBackend(config: BackendConfig, apiPath: string): Promise<void> {
  if (config.backend === "NestJS") {
    const nestPm = getNestPackageManager(config.packageManager);
    const nestCommand = getScaffoldInvocation("nestCli", config.packageManager);
    try {
      await runSpawn(nestCommand.command, [
        ...nestCommand.args,
        apiPath,
        "--strict",
        "--skip-git",
        "--package-manager",
        nestPm,
      ]);
    } catch {
      await initNodeService(apiPath, true);
      await fs.writeFile(
        join(apiPath, "src", "index.ts"),
        `import "dotenv/config";
import express from "express";

const app = express();
const port = Number(process.env.API_PORT ?? 5000);
app.get("/health", (_, res) => res.json({ status: "ok" }));
app.listen(port, () => console.log(\`API running on http://localhost:\${port}\`));
`,
        "utf8"
      );
      await installDeps(config.packageManager, apiPath, ["express", "dotenv"]);
      await installDeps(
        config.packageManager,
        apiPath,
        ["typescript", "tsx", "@types/node", "@types/express"],
        true
      );
      return;
    }
  } else if (config.backend === "Express") {
    await initNodeService(apiPath, config.typescript);
    await fs.writeFile(
      join(apiPath, "src", config.typescript ? "index.ts" : "index.js"),
      config.typescript
        ? `import "dotenv/config";
import express from "express";

const app = express();
const port = Number(process.env.API_PORT ?? 5000);

app.get("/health", (_, res) => {
  res.json({ status: "ok" });
});

app.listen(port, () => {
  console.log(\`API running on http://localhost:\${port}\`);
});
`
        : `require("dotenv").config();
const express = require("express");

const app = express();
const port = Number(process.env.API_PORT || 5000);

app.get("/health", (_, res) => {
  res.json({ status: "ok" });
});

app.listen(port, () => {
  console.log(\`API running on http://localhost:\${port}\`);
});
`,
      "utf8"
    );
    await installDeps(config.packageManager, apiPath, ["express", "dotenv"]);
    await installDeps(
      config.packageManager,
      apiPath,
      config.typescript ? ["typescript", "tsx", "@types/node", "@types/express"] : [],
      true
    );
  } else if (config.backend === "Fastify") {
    await initNodeService(apiPath, config.typescript);
    await fs.writeFile(
      join(apiPath, "src", config.typescript ? "index.ts" : "index.js"),
      config.typescript
        ? `import "dotenv/config";
import Fastify from "fastify";

const app = Fastify();
const port = Number(process.env.API_PORT ?? 5000);

app.get("/health", async () => ({ status: "ok" }));
await app.listen({ port, host: "0.0.0.0" });
console.log(\`API running on http://localhost:\${port}\`);
`
        : `require("dotenv").config();
const Fastify = require("fastify");

const app = Fastify();
const port = Number(process.env.API_PORT || 5000);
app.get("/health", async () => ({ status: "ok" }));
app.listen({ port, host: "0.0.0.0" });
`,
      "utf8"
    );
    await installDeps(config.packageManager, apiPath, ["fastify", "dotenv"]);
    await installDeps(
      config.packageManager,
      apiPath,
      config.typescript ? ["typescript", "tsx", "@types/node"] : [],
      true
    );
  } else if (config.backend === "Hono (Edge)" || config.backend === "Koa") {
    await initNodeService(apiPath, config.typescript);
    await fs.writeFile(
      join(apiPath, "src", config.typescript ? "index.ts" : "index.js"),
      config.backend === "Hono (Edge)"
        ? config.typescript
          ? `import { Hono } from "hono";
import { serve } from "@hono/node-server";

const app = new Hono();
app.get("/health", (c) => c.json({ status: "ok" }));
serve({ fetch: app.fetch, port: Number(process.env.API_PORT ?? 5000) });
`
          : `const { Hono } = require("hono");
const { serve } = require("@hono/node-server");
const app = new Hono();
app.get("/health", (c) => c.json({ status: "ok" }));
serve({ fetch: app.fetch, port: Number(process.env.API_PORT || 5000) });
`
        : config.typescript
          ? `import "dotenv/config";
import Koa from "koa";

const app = new Koa();
const port = Number(process.env.API_PORT ?? 5000);
app.use(async (ctx) => {
  ctx.body = { status: "ok" };
});
app.listen(port);
`
          : `require("dotenv").config();
const Koa = require("koa");
const app = new Koa();
const port = Number(process.env.API_PORT || 5000);
app.use(async (ctx) => {
  ctx.body = { status: "ok" };
});
app.listen(port);
`,
      "utf8"
    );
    await installDeps(
      config.packageManager,
      apiPath,
      config.backend === "Hono (Edge)"
        ? ["hono", "@hono/node-server", "dotenv"]
        : ["koa", "dotenv"]
    );
    await installDeps(
      config.packageManager,
      apiPath,
      config.typescript ? ["typescript", "tsx", "@types/node"] : [],
      true
    );
  } else if (config.backend === "FastAPI") {
    await fs.ensureDir(apiPath);
    await fs.writeFile(
      join(apiPath, "main.py"),
      `from fastapi import FastAPI
import os

app = FastAPI()

@app.get("/health")
def health():
    return {"status": "ok"}
`,
      "utf8"
    );
    await fs.writeFile(join(apiPath, "requirements.txt"), "fastapi\nuvicorn\n", "utf8");
    await fs.writeFile(join(apiPath, ".env.example"), "API_PORT=5000\n", "utf8");
  } else {
    await fs.ensureDir(apiPath);
    await fs.writeFile(
      join(apiPath, "README.md"),
      `# ${config.backend}

This backend was selected. Bootstrap command can be added here as needed.
`,
      "utf8"
    );
  }

  if (isNodeBackend(config.backend)) {
    if (config.utilities.includes("CORS")) await installDeps(config.packageManager, apiPath, ["cors"]);
    if (config.utilities.includes("Helmet (security)")) {
      await installDeps(config.packageManager, apiPath, ["helmet"]);
    }
    if (config.utilities.includes("Zod (validation)")) await installDeps(config.packageManager, apiPath, ["zod"]);
    if (config.utilities.includes("class-validator (Nest)")) {
      await installDeps(config.packageManager, apiPath, ["class-validator", "class-transformer"]);
    }
    if (config.utilities.includes("Swagger (API docs)")) {
      await installDeps(config.packageManager, apiPath, ["swagger-ui-express"]);
      await installDeps(config.packageManager, apiPath, ["@types/swagger-ui-express"], true);
    }
    if (config.utilities.includes("Rate limiting")) {
      await installDeps(config.packageManager, apiPath, ["express-rate-limit"]);
    }
    if (config.auth === "JWT") {
      await installDeps(config.packageManager, apiPath, ["jsonwebtoken", "bcrypt"]);
      if (config.typescript) {
        await installDeps(config.packageManager, apiPath, ["@types/jsonwebtoken", "@types/bcrypt"], true);
      }
    }
    if (config.logging === "Pino") await installDeps(config.packageManager, apiPath, ["pino"]);
    if (config.logging === "Winston") await installDeps(config.packageManager, apiPath, ["winston"]);
    if (config.apiType === "GraphQL (Apollo)") {
      await installDeps(config.packageManager, apiPath, ["graphql", "@apollo/server"]);
    }
    if (config.apiType === "tRPC") await installDeps(config.packageManager, apiPath, ["@trpc/server"]);
    if (config.apiType === "gRPC") {
      await installDeps(config.packageManager, apiPath, ["@grpc/grpc-js", "@grpc/proto-loader"]);
    }

    if (
      config.advancedFeatures.includes("Background jobs (BullMQ)") ||
      config.advancedFeatures.includes("Queue system")
    ) {
      await installDeps(config.packageManager, apiPath, ["bullmq", "ioredis"]);
    }

    if (config.advancedFeatures.includes("Scheduler jobs (Agenda)")) {
      await installDeps(config.packageManager, apiPath, ["agenda"]);
    }

    if (config.orm === "Prisma" || config.orm === "Drizzle" || config.database !== "None") {
      const dbPath = apiPath;
      await fs.ensureDir(dbPath);
      await fs.writeFile(
        join(dbPath, ".env.example"),
        "DATABASE_URL=postgresql://user:password@localhost:5432/app\n",
        "utf8"
      );
      if (config.orm === "Prisma") {
        const add = getPackageManagerAddInvocation(config.packageManager);
        const addDev = getPackageManagerAddInvocation(config.packageManager, true);
        await runSpawn(add.command, [...add.args, "@prisma/client"], { cwd: dbPath });
        await runSpawn(addDev.command, [...addDev.args, "prisma"], { cwd: dbPath });
        await runSpawn(cliExecutable("npx"), ["prisma", "init"], { cwd: dbPath });
      }
      if (config.orm === "Drizzle") {
        const add = getPackageManagerAddInvocation(config.packageManager);
        const addDev = getPackageManagerAddInvocation(config.packageManager, true);
        await runSpawn(add.command, [...add.args, "drizzle-orm"], { cwd: dbPath });
        await runSpawn(addDev.command, [...addDev.args, "drizzle-kit"], { cwd: dbPath });
      }
      if (config.orm === "TypeORM") {
        const add = getPackageManagerAddInvocation(config.packageManager);
        await runSpawn(add.command, [...add.args, "typeorm"], { cwd: dbPath });
      }
      if (config.orm === "Mongoose") {
        const add = getPackageManagerAddInvocation(config.packageManager);
        await runSpawn(add.command, [...add.args, "mongoose"], { cwd: dbPath });
      }
    }

    if (config.authFeatures.includes("Google login")) {
      await installDeps(config.packageManager, apiPath, ["google-auth-library"], false);
    }
  }

  if (config.backend === "FastAPI") {
    await setupFastapiPythonLayer(apiPath, config);
    if (config.authFeatures.includes("Google login")) {
      await appendPythonRequirements(apiPath, ["google-auth"], "FastAPI");
    }
  }
  if (config.backend === "Django (Python)") {
    await setupDjangoPythonLayer(apiPath, config);
    if (config.authFeatures.includes("Google login")) {
      await appendPythonRequirements(apiPath, ["google-auth"], "Django (Python)");
    }
  }
  if (config.backend === "Spring Boot (Java)") {
    await setupSpringHints(apiPath, config);
  }

  await installBackendTestingPackages(config, apiPath);
}