import fs from "fs-extra";
import { basename, join } from "node:path";
import type { FrontendChoice, FrontendConfig, TestingChoice } from "./types.js";
import {
  getCreateExpoAppInvocation,
  getFallbackFrontendScripts,
  getFlutterCreateInvocation,
  getNextPackageManagerFlag,
  getReactNativeInitInvocation,
  getScaffoldInvocation,
  installPackageDeps,
} from "./command-registry.js";
import { runSpawn } from "./run-spawn.js";

async function installDeps(
  packageManager: FrontendConfig["packageManager"],
  webPath: string,
  deps: string[],
  dev = false
): Promise<void> {
  return installPackageDeps(packageManager, webPath, deps, dev);
}

function isMobileFrontend(fe: FrontendChoice): boolean {
  return fe === "Expo (React Native)" || fe === "React Native (CLI)" || fe === "Flutter";
}

function isReactNativeNpm(fe: FrontendChoice): boolean {
  return fe === "Expo (React Native)" || fe === "React Native (CLI)";
}

async function createFallbackRunnableFrontend(config: FrontendConfig, webPath: string): Promise<void> {
  const ext = config.typescript ? "ts" : "js";
  await fs.ensureDir(join(webPath, "src"));
  await fs.writeJSON(
    join(webPath, "package.json"),
    {
      name: "frontend",
      private: true,
      version: "0.1.0",
      type: "module",
      scripts: getFallbackFrontendScripts(),
    },
    { spaces: 2 }
  );
  await fs.writeFile(
    join(webPath, "index.html"),
    `<!doctype html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Web App</title>
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="/src/main.${ext}"></script>
  </body>
</html>
`,
    "utf8"
  );
  await fs.writeFile(
    join(webPath, "src", `main.${ext}`),
    config.typescript
      ? `const app = document.querySelector("#app");
if (app) {
  app.innerHTML = "<h1>${config.frontend} starter</h1><p>Project is runnable. Replace with full ${config.frontend} app as needed.</p>";
}
`
      : `const app = document.querySelector("#app");
if (app) {
  app.innerHTML = "<h1>${config.frontend} starter</h1><p>Project is runnable. Replace with full ${config.frontend} app as needed.</p>";
}
`,
    "utf8"
  );
  await fs.writeFile(join(webPath, ".env.example"), "VITE_API_URL=http://localhost:5000\n", "utf8");
  await installDeps(config.packageManager, webPath, ["vite"], true);
  if (config.typescript) {
    await installDeps(config.packageManager, webPath, ["typescript"], true);
  }
  await fs.writeFile(
    join(webPath, "README.md"),
    `# ${config.frontend} (fallback)

Scaffolded with Vite. Replace with an official template when ready.
`,
    "utf8"
  );
}

async function installGoogleAuthFrontendPackages(config: FrontendConfig, webPath: string): Promise<void> {
  const af = config.authFeatures ?? [];
  if (!af.includes("Google login")) return;
  const fe = config.frontend;
  try {
    if (fe === "Next.js") {
      await installDeps(config.packageManager, webPath, ["next-auth"], false);
    } else if (fe === "Vite (React)" || fe === "Remix" || fe === "Astro" || fe === "SvelteKit") {
      await installDeps(config.packageManager, webPath, ["@react-oauth/google"], false);
    } else if (fe === "Vue (Vite)") {
      await installDeps(config.packageManager, webPath, ["vue3-google-login"], false);
    } else if (fe === "Expo (React Native)") {
      await installDeps(config.packageManager, webPath, ["expo-auth-session", "expo-web-browser"], false);
    } else if (fe === "React Native (CLI)") {
      await installDeps(
        config.packageManager,
        webPath,
        ["@react-native-google-signin/google-signin"],
        false
      );
    } else if (fe === "Flutter") {
      await runSpawn("flutter", ["pub", "add", "google_sign_in"], { cwd: webPath });
    }
  } catch {
  }
}

async function ensureFrontendReadme(webPath: string, frontend: FrontendChoice): Promise<void> {
  const readmePath = join(webPath, "README.md");
  if (await fs.pathExists(readmePath)) return;
  await fs.writeFile(
    readmePath,
    `# ${frontend}

Generated with **create-fullstack-app**. See the repository root README for stack details.
`,
    "utf8"
  );
}

function isReactWebForTesting(fe: FrontendChoice): boolean {
  return (
    fe === "Next.js" ||
    fe === "Vite (React)" ||
    fe === "Remix" ||
    fe === "Astro" ||
    fe === "SvelteKit"
  );
}

async function installTestingFrontendPackages(config: FrontendConfig, webPath: string): Promise<void> {
  const t: TestingChoice | undefined = config.testing;
  if (!t || t === "None") return;
  try {
    if (isMobileFrontend(config.frontend)) {
      if (config.frontend === "Flutter") return;
      await installDeps(config.packageManager, webPath, ["jest", "@testing-library/react-native"], true);
      return;
    }
    if (t === "Vitest") {
      const base = ["vitest", "@vitest/coverage-v8", "jsdom"];
      if (config.frontend === "Vue (Vite)") {
        await installDeps(config.packageManager, webPath, [...base, "@vue/test-utils"], true);
      } else if (isReactWebForTesting(config.frontend)) {
        await installDeps(
          config.packageManager,
          webPath,
          [...base, "@testing-library/react", "@testing-library/jest-dom"],
          true
        );
      } else {
        await installDeps(config.packageManager, webPath, base, true);
      }
    } else if (t === "Jest") {
      const deps = ["jest", "jest-environment-jsdom", "@testing-library/react", "@testing-library/jest-dom"];
      if (config.typescript) deps.push("@types/jest", "ts-jest");
      await installDeps(config.packageManager, webPath, deps, true);
    } else if (t === "Playwright") {
      await installDeps(config.packageManager, webPath, ["@playwright/test"], true);
    } else if (t === "Cypress (E2E)") {
      await installDeps(config.packageManager, webPath, ["cypress"], true);
    }
  } catch {
    // best-effort
  }
}

async function setupExpoProject(config: FrontendConfig, webPath: string): Promise<boolean> {
  const inv = getCreateExpoAppInvocation();
  try {
    await runSpawn(inv.command, inv.args, { cwd: webPath });
    await fs.writeFile(
      join(webPath, ".env.example"),
      "EXPO_PUBLIC_API_URL=http://localhost:5000\n",
      "utf8"
    );
    return true;
  } catch {
    await fs.writeFile(
      join(webPath, "README.md"),
      `# Expo

Official scaffold failed in this environment. From this folder run:

\`\`\`bash
npx create-expo-app@latest . --template tabs
\`\`\`

Then add dependencies from the wizard (React Query, etc.) with your package manager.
`,
      "utf8"
    );
    return false;
  }
}

async function setupReactNativeCliProject(config: FrontendConfig, webPath: string): Promise<boolean> {
  const safeName = basename(webPath).replace(/[^a-zA-Z0-9]/g, "") || "App";
  const inv = getReactNativeInitInvocation(safeName);
  try {
    await runSpawn(inv.command, inv.args, { cwd: webPath });
    return true;
  } catch {
    await fs.writeFile(
      join(webPath, "README.md"),
      `# React Native

Scaffold failed. With Node 18+ installed, from this folder run:

\`\`\`bash
npx @react-native-community/cli@latest init ${safeName} --directory .
\`\`\`
`,
      "utf8"
    );
    return false;
  }
}

async function setupFlutterProject(_config: FrontendConfig, webPath: string): Promise<boolean> {
  const inv = getFlutterCreateInvocation(basename(webPath));
  try {
    await runSpawn(inv.command, inv.args, { cwd: webPath });
    return true;
  } catch {
    await fs.writeFile(
      join(webPath, "README.md"),
      `# Flutter

Install the Flutter SDK, then from this folder:

\`\`\`bash
flutter create . --project-name my_app
flutter pub get
\`\`\`
`,
      "utf8"
    );
    return false;
  }
}

export async function setupFrontend(config: FrontendConfig, webPath: string): Promise<void> {
  if (config.frontend === "None") return;

  await fs.ensureDir(webPath);
  try {
  if (config.frontend === "Next.js") {
    const languageFlag = config.typescript ? "--ts" : "--js";
    const pmFlag = getNextPackageManagerFlag(config.packageManager);
    const nextCommand = getScaffoldInvocation("nextApp", config.packageManager);
    const tail = [webPath, languageFlag, "--app", ...(pmFlag ? [pmFlag] : [])];
    try {
      await runSpawn(nextCommand.command, [...nextCommand.args, ...tail], {});
    } catch {
      await createFallbackRunnableFrontend(config, webPath);
      await fs.writeFile(
        join(webPath, "README.md"),
        `# Next.js (fallback starter)

Primary Next.js scaffold failed in this environment.
A runnable fallback app was generated. You can retry later with:
npm create next-app@latest . -- --ts --app
`,
        "utf8"
      );
      return;
    }
  }

  if (config.frontend === "Vite (React)") {
    const template = config.typescript ? "react-swc-ts" : "react-swc";
    const viteCommand = getScaffoldInvocation("vite", config.packageManager);
    try {
      await runSpawn(viteCommand.command, [...viteCommand.args, webPath, "--template", template], {});
    } catch {
      await createFallbackRunnableFrontend(config, webPath);
      return;
    }
  }

  if (config.frontend === "Vue (Vite)") {
    const template = config.typescript ? "vue-ts" : "vue";
    const viteCommand = getScaffoldInvocation("vite", config.packageManager);
    try {
      await runSpawn(viteCommand.command, [...viteCommand.args, webPath, "--template", template], {});
    } catch {
      await createFallbackRunnableFrontend(config, webPath);
      return;
    }
  }

  if (config.frontend === "Expo (React Native)") {
    const ok = await setupExpoProject(config, webPath);
    if (!ok) return;
  }

  if (config.frontend === "React Native (CLI)") {
    const ok = await setupReactNativeCliProject(config, webPath);
    if (!ok) return;
  }

  if (config.frontend === "Flutter") {
    await setupFlutterProject(config, webPath);
    return;
  }

  if (
    config.frontend === "Remix" ||
    config.frontend === "Astro" ||
    config.frontend === "SvelteKit"
  ) {
    await createFallbackRunnableFrontend(config, webPath);
    await fs.writeFile(
      join(webPath, "README.md"),
      `# ${config.frontend}

This project is runnable with Vite fallback starter.
Replace this starter with an official ${config.frontend} scaffold when needed.
`,
      "utf8"
    );
  }

  const isWeb = !isMobileFrontend(config.frontend);

  if (isWeb && config.styling === "Tailwind CSS") {
    await installDeps(config.packageManager, webPath, ["tailwindcss", "postcss", "autoprefixer"], true);
  } else if (isWeb && config.styling === "Shadcn UI") {
    await installDeps(config.packageManager, webPath, ["tailwindcss", "postcss", "autoprefixer"], true);
    await installDeps(config.packageManager, webPath, ["class-variance-authority", "clsx", "tailwind-merge"]);
  } else if (isWeb && config.styling === "Material UI") {
    await installDeps(config.packageManager, webPath, [
      "@mui/material",
      "@emotion/react",
      "@emotion/styled",
    ]);
  } else if (isWeb && config.styling === "Chakra UI") {
    await installDeps(config.packageManager, webPath, ["@chakra-ui/react", "@emotion/react", "framer-motion"]);
  } else if (isWeb && config.styling === "Ant Design") {
    await installDeps(config.packageManager, webPath, ["antd"]);
  } else if (isWeb && config.styling === "Styled Components") {
    await installDeps(config.packageManager, webPath, ["styled-components"]);
    await installDeps(
      config.packageManager,
      webPath,
      config.typescript ? ["@types/styled-components"] : [],
      true
    );
  }

  if (isReactNativeNpm(config.frontend) || isWeb) {
    if (config.stateData === "React Query") {
      await installDeps(config.packageManager, webPath, ["@tanstack/react-query"]);
    } else if (config.stateData === "Zustand") {
      await installDeps(config.packageManager, webPath, ["zustand"]);
    } else if (config.stateData === "Redux Toolkit") {
      await installDeps(config.packageManager, webPath, ["@reduxjs/toolkit", "react-redux"]);
    } else if (config.stateData === "Jotai") {
      await installDeps(config.packageManager, webPath, ["jotai"]);
    } else if (config.stateData === "MobX") {
      await installDeps(config.packageManager, webPath, ["mobx", "mobx-react-lite"]);
    }

    if (config.forms === "React Hook Form") {
      await installDeps(config.packageManager, webPath, ["react-hook-form"]);
    } else if (config.forms === "Formik") {
      await installDeps(config.packageManager, webPath, ["formik"]);
    }

    if (config.apiClient === "Axios") {
      await installDeps(config.packageManager, webPath, ["axios"]);
    } else if (config.apiClient === "GraphQL client (Apollo)") {
      await installDeps(config.packageManager, webPath, ["@apollo/client", "graphql"]);
    } else if (config.apiClient === "tRPC client") {
      await installDeps(config.packageManager, webPath, ["@trpc/client", "@trpc/react-query"]);
    }
  }

  if (isWeb && config.extras.includes("React Charts")) {
    await installDeps(config.packageManager, webPath, ["recharts"]);
  }
  if (isWeb && config.extras.includes("TanStack Table")) {
    await installDeps(config.packageManager, webPath, ["@tanstack/react-table"]);
  }
  if (isWeb && config.extras.includes("Framer Motion")) {
    await installDeps(config.packageManager, webPath, ["framer-motion"]);
  }
  if (isWeb && config.extras.includes("Date-fns")) {
    await installDeps(config.packageManager, webPath, ["date-fns"]);
  }
  if (isWeb && config.extras.includes("React Icons")) {
    await installDeps(config.packageManager, webPath, ["react-icons"]);
  }

  if (config.frontend === "Next.js") {
    await fs.writeFile(join(webPath, ".env.example"), `NEXT_PUBLIC_API_URL=http://localhost:5000\n`, "utf8");
  } else if (
    config.frontend === "Vite (React)" ||
    config.frontend === "Vue (Vite)" ||
    config.frontend === "Remix" ||
    config.frontend === "Astro" ||
    config.frontend === "SvelteKit"
  ) {
    await fs.writeFile(join(webPath, ".env.example"), "VITE_API_URL=http://localhost:5000\n", "utf8");
  }

  } finally {
    await installGoogleAuthFrontendPackages(config, webPath);
    await installTestingFrontendPackages(config, webPath);
    await ensureFrontendReadme(webPath, config.frontend);
  }
}
