import type {
    LayoutStrategy,
    Target,
    TemplateContext,
    FileEntry,
    PackageJsonLocation,
  } from '../shared/types.js';
  import { TARGETS } from '../shared/constants.js';
  import { joinPaths } from './helpers/path-utils.js';
  
  export class MonorepoLayout implements LayoutStrategy {
    name = 'monorepo';
  
  resolvePath(
    relativePath: string,
    target: Target,
    context?: TemplateContext,
    _options?: { pluginCategory?: string; platformSupport?: 'all' | 'web-only' | 'mobile-only' | 'backend-only' }
  ): string {
      switch (target) {
        case TARGETS.FRONTEND: {
          if (context?.hasBothPlatforms) {
            // If both web + mobile, we need more info to disambiguate
            // This is handled by file-map entries specifying the full sub-path
            return joinPaths('apps/web', relativePath);
          }
          if (context?.hasMobile) {
            return joinPaths('apps/mobile', relativePath);
          }
          return joinPaths('apps/web', relativePath);
        }
  
        case TARGETS.BACKEND:
          return joinPaths('apps/api', relativePath);
  
        case TARGETS.SHARED:
          return joinPaths('packages/shared', relativePath);
  
        case TARGETS.ROOT:
        default:
          return relativePath;
      }
    }
  
    scaffold(_projectName: string, context: TemplateContext): string[] {
      const dirs: string[] = ['apps', 'packages', 'packages/shared', 'packages/shared/src'];
  
      if (context.hasWeb) {
        dirs.push('apps/web', 'apps/web/src');
      }
      if (context.hasMobile) {
        dirs.push('apps/mobile');
      }
      if (context.hasBackend) {
        dirs.push('apps/api', 'apps/api/src');
      }
  
      return dirs;
    }
  
    rootConfig(context: TemplateContext): FileEntry[] {
      const files: FileEntry[] = [];
  
      // Root package.json with workspaces
      const workspaces = ['apps/*', 'packages/*'];
      const scripts: Record<string, string> = {};
  
      if (context.monorepoTool === 'turborepo') {
        scripts.dev = 'turbo dev';
        scripts.build = 'turbo build';
        scripts.lint = 'turbo lint';
        scripts['type-check'] = 'turbo type-check';
  
        // turbo.json
        files.push({
          path: 'turbo.json',
          content: JSON.stringify(
            {
              $schema: 'https://turbo.build/schema.json',
              globalDependencies: ['**/.env.*local'],
              pipeline: {
                build: {
                  dependsOn: ['^build'],
                  outputs: ['dist/**', '.next/**', '!.next/cache/**'],
                },
                lint: {},
                dev: {
                  cache: false,
                  persistent: true,
                },
                'type-check': {},
              },
            },
            null,
            2
          ) + '\n',
        });
      } else if (context.monorepoTool === 'nx') {
        scripts.dev = 'nx run-many --target=dev';
        scripts.build = 'nx run-many --target=build';
        scripts.lint = 'nx run-many --target=lint';
  
        files.push({
          path: 'nx.json',
          content: JSON.stringify(
            {
              $schema: './node_modules/nx/schemas/nx-schema.json',
              targetDefaults: {
                build: { dependsOn: ['^build'] },
                lint: {},
                dev: {},
              },
            },
            null,
            2
          ) + '\n',
        });
      } else {
        // pnpm workspaces
        scripts.dev = 'pnpm --parallel --recursive run dev';
        scripts.build = 'pnpm --recursive run build';
        scripts.lint = 'pnpm --recursive run lint';
      }
  
      if (context.hasHusky) {
        scripts.prepare = 'husky';
      }
  
      files.push({
        path: 'package.json',
        content: JSON.stringify(
          {
            name: context.projectName,
            version: '0.1.0',
            private: true,
            workspaces,
            scripts,
            devDependencies: {
              ...(context.monorepoTool === 'turborepo' ? { turbo: '^2.3.0' } : {}),
              ...(context.monorepoTool === 'nx' ? { nx: '^20.0.0' } : {}),
            },
          },
          null,
          2
        ) + '\n',
      });
  
      // pnpm-workspace.yaml (always for pnpm)
      if (context.packageManager === 'pnpm') {
        files.push({
          path: 'pnpm-workspace.yaml',
          content: `packages:\n  - 'apps/*'\n  - 'packages/*'\n`,
        });
      }
  
      // Shared package
      files.push({
        path: 'packages/shared/package.json',
        content: JSON.stringify(
          {
            name: `@${context.projectName}/shared`,
            version: '0.1.0',
            private: true,
            type: 'module',
            main: './src/index.ts',
            types: './src/index.ts',
          },
          null,
          2
        ) + '\n',
      });
  
      files.push({
        path: 'packages/shared/src/index.ts',
        content: `// Shared types and utilities\nexport {};\n`,
      });
  
      files.push({
        path: 'packages/shared/tsconfig.json',
        content: JSON.stringify(
          {
            compilerOptions: {
              target: 'ES2022',
              module: 'ESNext',
              moduleResolution: 'bundler',
              strict: true,
              declaration: true,
              outDir: './dist',
            },
            include: ['src'],
          },
          null,
          2
        ) + '\n',
      });
  
      return files;
    }
  
    packageJsonTargets(context: TemplateContext): PackageJsonLocation[] {
      const targets: PackageJsonLocation[] = [
        { path: 'package.json', target: TARGETS.ROOT, name: context.projectName },
      ];
  
      if (context.hasWeb) {
        targets.push({
          path: 'apps/web/package.json',
          target: TARGETS.FRONTEND,
          name: `@${context.projectName}/web`,
        });
      }
  
      if (context.hasMobile) {
        targets.push({
          path: 'apps/mobile/package.json',
          target: TARGETS.FRONTEND,
          name: `@${context.projectName}/mobile`,
        });
      }
  
      if (context.hasBackend) {
        targets.push({
          path: 'apps/api/package.json',
          target: TARGETS.BACKEND,
          name: `@${context.projectName}/api`,
        });
      }
  
      targets.push({
        path: 'packages/shared/package.json',
        target: TARGETS.SHARED,
        name: `@${context.projectName}/shared`,
      });
  
      return targets;
    }
  
    previewTree(context: TemplateContext): string {
      const lines: string[] = [];
      lines.push(`${context.projectName}/`);
      lines.push('├── apps/');
  
      if (context.hasWeb) lines.push('│   ├── web/');
      if (context.hasMobile) lines.push('│   ├── mobile/');
      if (context.hasBackend) lines.push('│   └── api/');
  
      lines.push('├── packages/');
      lines.push('│   └── shared/');
  
      if (context.monorepoTool === 'turborepo') lines.push('├── turbo.json');
      if (context.monorepoTool === 'nx') lines.push('├── nx.json');
      if (context.packageManager === 'pnpm') lines.push('├── pnpm-workspace.yaml');
      if (context.hasDocker) lines.push('├── docker-compose.yml');
      if (context.hasGithubActions) lines.push('├── .github/');
  
      lines.push('├── .gitignore');
      lines.push('├── README.md');
      lines.push('└── package.json');
  
      return lines.join('\n');
    }
  }