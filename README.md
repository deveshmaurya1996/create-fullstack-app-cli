<p align="center">
  <a href="https://www.npmjs.com/package/@dartix-software-solutions/create-fullstack-app">
    <img src="https://img.shields.io/npm/v/@dartix-software-solutions/create-fullstack-app?style=flat-square&color=cb3837&logo=npm&label=npm" alt="npm version" />
  </a>
  <a href="https://www.npmjs.com/package/@dartix-software-solutions/create-fullstack-app">
    <img src="https://img.shields.io/npm/l/@dartix-software-solutions/create-fullstack-app?style=flat-square&label=license" alt="License" />
  </a>
  <img src="https://img.shields.io/badge/node-%3E%3D18-339933?style=flat-square&logo=node.js&logoColor=white" alt="Node.js 18+" />
</p>

<h1 align="center">create-fullstack-app</h1>

<p align="center">
  <strong>Interactive CLI to scaffold production-style full-stack projects</strong><br />
  Pick your structure, frameworks, data layer, auth, DevOps, and extras—get a working repo with sensible defaults.
</p>

<p align="center">
  <a href="#quick-start">Quick start</a> ·
  <a href="#feature-matrix">Features</a> ·
  <a href="#how-it-works">How it works</a> ·
  <a href="#requirements">Requirements</a> ·
  <a href="#links">Links</a> ·
  <a href="#help-contributing-contact">Help & contact</a> ·
  <a href="#changelog">Changelog</a>
</p>

---

<a id="overview"></a>

## ✨ Overview

**create-fullstack-app** walks you through an interactive wizard and emits a project tailored to your choices. Generated code is a **starting point**: install dependencies, follow the printed next steps and the generated `README`, and configure `.env` for your environment.

---

<a id="quick-start"></a>

## 🚀 Quick start

Run from the directory where the **new project folder** should be created:

```bash
npx @dartix-software-solutions/create-fullstack-app@latest
```

**npm create** (same package):

```bash
npm create @dartix-software-solutions/fullstack-app@latest
```

**Global install:**

```bash
npm install -g @dartix-software-solutions/create-fullstack-app
create-fullstack-app
```

| Tip | Detail |
|-----|--------|
| 📝 **Project name** | The wizard asks for it first. |
| ⚡ **Defaults** | Use `--yes` / `-y` where supported to accept defaults faster. |
| 📁 **Target folder** | Must be **missing or empty**. If it already contains files, the CLI exits with an error to avoid overwriting work. |

---

<a id="feature-matrix"></a>

## 🧩 Feature matrix

| Area | What you can choose |
|------|---------------------|
| 🏗️ **Layouts** | Monorepo (apps + packages), single repo, or microservices-style tree; Turborepo, Nx, or basic workspace where applicable. |
| 📦 **Project types** | SaaS, API-only, admin, mobile, full web + API—options depend on structure and scope. |
| 📌 **Package manager** | npm, pnpm, yarn, or bun. |
| 🌐 **Web** | Next.js, Vite (React), Remix, Astro, SvelteKit, Vue (Vite), or none. |
| 📱 **Mobile** | Expo, React Native (CLI), or Flutter. **Expo → Expo Router** and **RN CLI → React Navigation** by default; override in the wizard when both nav options exist. |
| 🎨 **Styling & UI** | Tailwind, Shadcn UI, MUI, Chakra, Ant Design, Styled Components, or vanilla CSS (stack-dependent). |
| 🔄 **Client state & data** | TanStack Query, Zustand, Redux Toolkit, Jotai, MobX, or none; forms; Axios / tRPC / GraphQL clients; charts, tables, motion, dates, icons. |
| ⚙️ **Backends** | NestJS, Express, Fastify, FastAPI, Hono, Koa, Django, Spring Boot, and more. |
| 🔌 **APIs** | REST, tRPC, GraphQL, gRPC where supported; validation, OpenAPI, CORS, security headers, rate limits. |
| 🗄️ **Data** | PostgreSQL, MySQL, MongoDB, SQLite, Redis; Prisma, Drizzle, TypeORM, Mongoose, Django ORM, etc. |
| 🔐 **Auth** | JWT, NextAuth, Clerk, Auth0, Firebase, Supabase, Lucia, and more. |
| ✅ **Quality & tests** | ESLint, Prettier, Husky, lint-staged, Commitlint, EditorConfig; Jest, Vitest, Cypress, Playwright, Detox, and related plugins. |
| 🚢 **Ops & deploy** | Docker, Compose, Kubernetes hints, GitHub Actions; Vercel, AWS, Railway, Render, and others. |
| 🧰 **Backend extras** | Queues, cron, email, uploads, WebSockets, Swagger, and more. |
| 🤖 **AI (optional)** | Plugins with OpenAI- or cloud-oriented env vars and starter wiring. |

---

<a id="how-it-works"></a>

## 🛠 How it works

Generation is **plugin-driven**: each concern (frontend, backend, auth, testing, …) contributes **metadata**, **dependencies**, and **Handlebars** templates. **Layouts** (single app, monorepo, microservices) decide output paths and how many `package.json` targets you get.

The wizard collects answers, resolves active plugins, runs compatibility checks, then writes everything through **one pipeline**—so new stacks are added by **extending plugins**, not one-off scripts.

---

<a id="requirements"></a>

## 📋 Requirements

- **Node.js 18+** — required for the CLI and for many generated stacks.

---

<a id="links"></a>

## 🔗 Links

| | |
|--|--|
| 👤 **Developer** | [Devesh Maurya](https://devesh-maurya-portfolio.vercel.app/) |
| 🏢 **Dartix** | [dartix.live](https://www.dartix.live/) |
| 📰 **Blog** | [Building create-fullstack-app (internals, releases)](https://devesh-maurya-portfolio.vercel.app/blog/building-create-fullstack-app-cli) |
| 📦 **npm** | [`@dartix-software-solutions/create-fullstack-app`](https://www.npmjs.com/package/@dartix-software-solutions/create-fullstack-app) |

---

<a id="help-contributing-contact"></a>

## 💬 Help, contributing & contact

Questions about **requirements**, **usage**, or **contributing** (plugins, docs, bug reports)? Reach out anytime:

**📧 [deveshmaurya1996@gmail.com](mailto:deveshmaurya1996@gmail.com)**

Whether you are stuck on a generated stack, want to propose a feature, or discuss collaboration, send a short note with context (CLI version, OS, and what you tried) and we will go from there.

---

<a id="changelog"></a>

## 📜 Changelog

### 2.0.15

- **Single-app fullstack installs:** Removed root workspace coupling for this mode; dependencies now install dynamically in real package targets (`client` / `server`) instead of forcing root install behavior.
- **Script routing:** Fixed script target resolution so devtool scripts (`lint`, `format`) map to frontend/backend package targets when root is not used in single-app fullstack.
- **Devtool config placement:** ESLint and Prettier config files now generate per package (`client` + `server`) for single-app fullstack, while preserving root behavior for other structures.
- **Prisma 7 migration:** Updated Prisma plugin to modern setup (`prisma@7`, `@prisma/client@7`, `@prisma/adapter-pg`), added `prisma.config.ts`, removed `datasource.url` from `schema.prisma`, and moved Postgres client creation to adapter-based initialization.
- **Tailwind latest (web):** Updated Tailwind scaffolding to v4-style setup (`@import "tailwindcss";`, `@tailwindcss/postcss` plugin in PostCSS config) and refreshed content globs for broader framework file coverage.
- **Formik sample form fix:** Reworked Next.js sample Formik template to avoid fragile inline object-style syntax in `.hbs` and use class-based markup for stable generation.
- **Template/render stability fixes:** Continued hardening around plugin output mapping and template generation edge cases uncovered in real `npx` runs.

### 2.0.0

**Major release** — plugin + layout generator is the supported baseline for issues and PRs.

- **Breaking:** Removed the legacy imperative `src/setup/` pipeline; scaffolding runs only through **wizard → `generate()`**.
- **CLI:** Published `bin` at `dist/bin/create-fullstack-app.js`; optional repo-root `bin/` wrapper runs the built CLI after `npm run build`.
- **Mobile:** Expo defaults to **Expo Router**; React Native CLI defaults to **React Navigation**; wizard overrides win.
- **Tooling:** `--version` aligned with package version; `.gitignore` includes `*.tgz`.

### 0.1.4

- Pluggable generator (layouts + plugin `meta` / `file-map` / templates); wizard wired to `generate()`.
- README behavior notes (empty target dir; mobile navigation defaults).

### 0.1.1

- Full npm README; `README.md` in published `files`.
- Root `.gitignore` for Node/TS builds.
- CI publish on `v*` tags with version check.

### 0.1.0

- Initial public interactive scaffolding CLI.

---

<a id="license"></a>

## 📄 License

**MIT**

---

<p align="center">
  <sub>
    <a href="https://www.npmjs.com/package/@dartix-software-solutions/create-fullstack-app">npm</a>
    &nbsp;·&nbsp;
    <a href="https://devesh-maurya-portfolio.vercel.app/">Developer</a>
    &nbsp;·&nbsp;
    <a href="https://www.dartix.live/">Dartix</a>
  </sub>
</p>
