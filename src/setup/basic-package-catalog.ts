import type { BackendChoice, FrontendChoice } from "./types.js";

export const STACK_PACKAGE_LIMIT = 14;

type StackDef = {
  choices: readonly string[];
  defaults: readonly string[];
};

function cap(def: StackDef): StackDef {
  return {
    choices: def.choices.slice(0, STACK_PACKAGE_LIMIT),
    defaults: def.defaults.filter((d) => def.choices.includes(d)).slice(0, STACK_PACKAGE_LIMIT),
  };
}

const REACT_WEB: StackDef = cap({
  choices: [
    "clsx",
    "date-fns",
    "zod",
    "@tanstack/react-query",
    "@tanstack/react-table",
    "react-icons",
    "axios",
    "react-hot-toast",
    "framer-motion",
    "recharts",
    "lodash-es",
    "nuqs",
  ],
  defaults: ["clsx", "date-fns", "zod", "@tanstack/react-query", "@tanstack/react-table"],
});

const NEXT_EXTRA: StackDef = cap({
  choices: [
    "clsx",
    "date-fns",
    "zod",
    "@tanstack/react-query",
    "@tanstack/react-table",
    "react-icons",
    "next-themes",
    "axios",
    "react-hot-toast",
    "nuqs",
    "server-only",
    "jotai",
  ],
  defaults: ["clsx", "date-fns", "zod", "@tanstack/react-query", "@tanstack/react-table", "next-themes"],
});

const REMIX_EXTRA: StackDef = cap({
  choices: [
    "clsx",
    "date-fns",
    "zod",
    "@tanstack/react-table",
    "react-icons",
    "axios",
    "isbot",
    "remix-utils",
    "framer-motion",
    "recharts",
  ],
  defaults: ["clsx", "date-fns", "zod", "@tanstack/react-table", "isbot"],
});

const ASTRO: StackDef = cap({
  choices: [
    "@astrojs/react",
    "@astrojs/tailwind",
    "sharp",
    "zod",
    "date-fns",
    "clsx",
    "react-icons",
    "@fontsource-variable/inter",
    "astro-icon",
    "sanitize-html",
  ],
  defaults: ["@astrojs/react", "@astrojs/tailwind", "zod", "date-fns", "clsx"],
});

const EXPO: StackDef = cap({
  choices: [
    "expo-router",
    "react-native-reanimated",
    "react-native-safe-area-context",
    "react-native-gesture-handler",
    "@react-native-async-storage/async-storage",
    "expo-secure-store",
    "expo-image",
    "expo-font",
    "expo-constants",
    "zod",
    "date-fns",
    "axios",
    "@tanstack/react-query",
  ],
  defaults: ["expo-router", "react-native-reanimated", "zod", "date-fns", "axios"],
});

const RN_CLI: StackDef = cap({
  choices: [
    "@react-native-async-storage/async-storage",
    "react-native-reanimated",
    "react-native-safe-area-context",
    "react-native-gesture-handler",
    "@react-navigation/native",
    "@react-navigation/native-stack",
    "react-native-screens",
    "zod",
    "date-fns",
    "axios",
    "@tanstack/react-query",
  ],
  defaults: [
    "@react-native-async-storage/async-storage",
    "react-native-reanimated",
    "@react-navigation/native",
    "@react-navigation/native-stack",
    "axios",
  ],
});

const FLUTTER: StackDef = cap({
  choices: [
    "dio",
    "riverpod",
    "flutter_riverpod",
    "go_router",
    "freezed_annotation",
    "json_annotation",
    "intl",
    "cached_network_image",
    "flutter_hooks",
    "equatable",
  ],
  defaults: ["dio", "riverpod", "go_router", "intl", "cached_network_image"],
});

const SVELTEKIT: StackDef = cap({
  choices: [
    "zod",
    "date-fns",
    "clsx",
    "tailwind-merge",
    "@tanstack/svelte-table",
    "lucide-svelte",
    "bits-ui",
    "formsnap",
    "valibot",
    "devalue",
  ],
  defaults: ["zod", "date-fns", "clsx", "tailwind-merge", "@tanstack/svelte-table"],
});

const VUE: StackDef = cap({
  choices: [
    "pinia",
    "vue-router",
    "@vueuse/core",
    "axios",
    "dayjs",
    "zod",
    "vee-validate",
    "unplugin-vue-components",
    "radix-vue",
    "lucide-vue-next",
  ],
  defaults: ["pinia", "@vueuse/core", "axios", "dayjs", "zod"],
});

const FRONTEND_CATALOG: Record<Exclude<FrontendChoice, "None">, StackDef> = {
  "Next.js": NEXT_EXTRA,
  "Vite (React)": REACT_WEB,
  Remix: REMIX_EXTRA,
  Astro: ASTRO,
  "Expo (React Native)": EXPO,
  "React Native (CLI)": RN_CLI,
  Flutter: FLUTTER,
  SvelteKit: SVELTEKIT,
  "Vue (Vite)": VUE,
};

const NODE_EXPRESS: StackDef = cap({
  choices: [
    "zod",
    "dotenv",
    "cors",
    "helmet",
    "pino",
    "uuid",
    "bcrypt",
    "jsonwebtoken",
    "express-rate-limit",
    "compression",
  ],
  defaults: ["zod", "dotenv", "cors", "helmet", "pino", "uuid"],
});

const NODE_NEST: StackDef = cap({
  choices: [
    "zod",
    "dotenv",
    "bcrypt",
    "jsonwebtoken",
    "pino",
    "uuid",
    "lodash",
    "socket.io",
    "bullmq",
    "ioredis",
  ],
  defaults: ["zod", "dotenv", "pino", "uuid", "bcrypt", "jsonwebtoken"],
});

const NODE_FASTIFY: StackDef = cap({
  choices: [
    "zod",
    "dotenv",
    "@fastify/cors",
    "@fastify/helmet",
    "pino",
    "uuid",
    "bcrypt",
    "jsonwebtoken",
    "@fastify/rate-limit",
    "fastify-plugin",
  ],
  defaults: ["zod", "dotenv", "@fastify/cors", "pino", "uuid", "@fastify/helmet"],
});

const NODE_HONO: StackDef = cap({
  choices: [
    "zod",
    "dotenv",
    "@hono/node-server",
    "pino",
    "uuid",
    "@hono/zod-validator",
    "jose",
    "lodash-es",
    "ioredis",
    "ws",
  ],
  defaults: ["zod", "dotenv", "pino", "uuid", "@hono/zod-validator"],
});

const NODE_KOA: StackDef = cap({
  choices: [
    "zod",
    "dotenv",
    "@koa/cors",
    "@koa/router",
    "@koa/bodyparser",
    "koa-helmet",
    "pino",
    "uuid",
    "bcrypt",
    "jsonwebtoken",
    "koa-logger",
  ],
  defaults: ["zod", "dotenv", "@koa/cors", "@koa/router", "@koa/bodyparser", "pino"],
});

const PY_FASTAPI: StackDef = cap({
  choices: [
    "httpx",
    "pydantic-settings",
    "sqlalchemy",
    "alembic",
    "python-jose[cryptography]",
    "passlib[bcrypt]",
    "python-multipart",
    "celery",
    "redis",
    "pytest",
  ],
  defaults: ["httpx", "pydantic-settings", "sqlalchemy", "python-multipart"],
});

const PY_DJANGO: StackDef = cap({
  choices: [
    "django-environ",
    "djangorestframework",
    "celery",
    "redis",
    "pillow",
    "django-cors-headers",
    "drf-spectacular",
    "django-filter",
    "gunicorn",
    "whitenoise",
  ],
  defaults: ["django-environ", "djangorestframework", "django-cors-headers", "drf-spectacular"],
});

const JVM_SPRING: StackDef = cap({
  choices: [
    "spring-boot-starter-validation",
    "spring-boot-starter-data-jpa",
    "spring-boot-starter-security",
    "springdoc-openapi-starter-webmvc-ui",
    "flyway-core",
    "postgresql",
    "lombok",
    "mapstruct",
    "spring-boot-starter-actuator",
    "micrometer-registry-prometheus",
  ],
  defaults: [
    "spring-boot-starter-validation",
    "spring-boot-starter-data-jpa",
    "springdoc-openapi-starter-webmvc-ui",
    "spring-boot-starter-security",
    "lombok",
  ],
});

const BACKEND_CATALOG: Record<BackendChoice, StackDef> = {
  Express: NODE_EXPRESS,
  NestJS: NODE_NEST,
  Fastify: NODE_FASTIFY,
  "Hono (Edge)": NODE_HONO,
  Koa: NODE_KOA,
  FastAPI: PY_FASTAPI,
  "Django (Python)": PY_DJANGO,
  "Spring Boot (Java)": JVM_SPRING,
};

export function getFrontendBasicPackageChoices(frontend: FrontendChoice): readonly string[] {
  if (frontend === "None") return [];
  return [...FRONTEND_CATALOG[frontend].choices];
}

export function getFrontendBasicPackageDefaults(frontend: FrontendChoice): string[] {
  if (frontend === "None") return [];
  return [...FRONTEND_CATALOG[frontend].defaults];
}

export function getBackendBasicPackageChoices(backend: BackendChoice): readonly string[] {
  return [...BACKEND_CATALOG[backend].choices];
}

export function getBackendBasicPackageDefaults(backend: BackendChoice): string[] {
  return [...BACKEND_CATALOG[backend].defaults];
}

export function isNodeBackend(backend: BackendChoice): boolean {
  return (
    backend === "NestJS" ||
    backend === "Express" ||
    backend === "Fastify" ||
    backend === "Hono (Edge)" ||
    backend === "Koa"
  );
}

export function isPythonBackend(backend: BackendChoice): boolean {
  return backend === "FastAPI" || backend === "Django (Python)";
}
