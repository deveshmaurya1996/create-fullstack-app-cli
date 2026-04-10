import type { TemplateContext } from '../shared/types.js';

/**
 * Generates a comprehensive .gitignore based on the project stack.
 */
export function generateGitignore(context: TemplateContext): string {
  const sections: string[] = [];

  // Base
  sections.push(`# Dependencies
node_modules/
.pnp
.pnp.js

# Build outputs
dist/
build/
out/
.output/

# Environment
.env
.env.local
.env.development.local
.env.test.local
.env.production.local
.env*.local

# IDE
.vscode/
.idea/
*.swp
*.swo
*~
.DS_Store
Thumbs.db

# Debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
debug.log

# Test coverage
coverage/
.nyc_output/

# Misc
*.tsbuildinfo
.cache/`);

  // Framework-specific
  if (context.hasNext) {
    sections.push(`# Next.js
.next/
out/
next-env.d.ts`);
  }

  if (context.hasSvelte) {
    sections.push(`# SvelteKit
.svelte-kit/`);
  }

  if (context.hasAngular) {
    sections.push(`# Angular
.angular/`);
  }

  if (context.hasExpo || context.hasReactNativeCli) {
    sections.push(`# React Native / Expo
ios/
android/
.expo/
.expo-shared/
web-build/
*.jks
*.p8
*.p12
*.key
*.mobileprovision
*.orig.*`);
  }

  if (context.hasFlutter) {
    sections.push(`# Flutter
.dart_tool/
.flutter-plugins
.flutter-plugins-dependencies
.packages
build/
*.iml`);
  }

  if (context.hasDjango) {
    sections.push(`# Python / Django
__pycache__/
*.py[cod]
*$py.class
*.so
venv/
.venv/
*.egg-info/
db.sqlite3`);
  }

  if (context.hasPrisma) {
    sections.push(`# Prisma
prisma/migrations/*.sql`);
  }

  if (context.hasDocker) {
    sections.push(`# Docker
docker-compose.override.yml`);
  }

  if (context.hasPlaywright) {
    sections.push(`# Playwright
test-results/
playwright-report/
blob-report/`);
  }

  if (context.hasCypress) {
    sections.push(`# Cypress
cypress/videos/
cypress/screenshots/`);
  }

  if (context.hasDetox) {
    sections.push(`# Detox
artifacts/`);
  }

  if (context.hasSentry) {
    sections.push(`# Sentry
.sentryclirc`);
  }

  if (context.hasMonorepo) {
    sections.push(`# Monorepo
.turbo/`);
  }

  return sections.join('\n\n') + '\n';
}