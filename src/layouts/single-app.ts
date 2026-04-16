import type {
    LayoutStrategy,
    Target,
    TemplateContext,
    FileEntry,
    PackageJsonLocation,
  } from '../shared/types.js';
  import { TARGETS } from '../shared/constants.js';
  import { joinPaths } from './helpers/path-utils.js';
  
  export class SingleAppLayout implements LayoutStrategy {
    name = 'single-app';
  
    resolvePath(
      relativePath: string,
      target: Target,
      context?: TemplateContext,
      options?: { pluginCategory?: string; platformSupport?: 'all' | 'web-only' | 'mobile-only' | 'backend-only' }
    ): string {
      if (!context) return relativePath;
  
      const hasFE = context.hasFrontend;
      const hasBE = context.hasBackend;
      const isFullstack = hasFE && hasBE;
  
      switch (target) {
        case TARGETS.FRONTEND: {
          if (isFullstack) {
            let feDir = context.hasBothPlatforms ? 'client' : context.hasMobile ? 'mobile' : 'client';
            if (context.hasBothPlatforms) {
              const category = options?.pluginCategory;
              const support = options?.platformSupport;
              if (category === 'frontend-mobile' || category === 'styling-mobile' || category === 'mobile-navigation') {
                feDir = 'mobile';
              } else if (category === 'frontend-web' || category === 'styling-web') {
                feDir = 'client';
              } else if (support === 'mobile-only') {
                feDir = 'mobile';
              } else if (support === 'web-only') {
                feDir = 'client';
              }
            }
            return joinPaths(feDir, relativePath);
          }
          // Frontend only — src at root
          return joinPaths('src', relativePath);
        }
  
        case TARGETS.BACKEND: {
          if (isFullstack) {
            return joinPaths('server', relativePath);
          }
          return joinPaths('src', relativePath);
        }
  
        case TARGETS.SHARED: {
          if (isFullstack) {
            return joinPaths('server', 'src', 'shared', relativePath);
          }
          return joinPaths('src', 'shared', relativePath);
        }
  
        case TARGETS.ROOT:
        default:
          return relativePath;
      }
    }
  
    scaffold(_projectName: string, context: TemplateContext): string[] {
      const dirs: string[] = [];
      const hasFE = context.hasFrontend;
      const hasBE = context.hasBackend;
      const isFullstack = hasFE && hasBE;
  
      if (isFullstack) {
        if (context.hasBothPlatforms) {
          dirs.push('client');
          dirs.push('client/src');
          dirs.push('mobile');
          dirs.push('mobile/src');
        } else {
          const feDir = context.hasMobile ? 'mobile' : 'client';
          dirs.push(feDir);
          dirs.push(`${feDir}/src`);
        }
        dirs.push('server');
        dirs.push('server/src');
      } else if (hasFE) {
        dirs.push('src');
        dirs.push('public');
      } else if (hasBE) {
        dirs.push('src');
      }
  
      return dirs;
    }
  
    rootConfig(context: TemplateContext): FileEntry[] {
      const files: FileEntry[] = [];
      const hasFE = context.hasFrontend;
      const hasBE = context.hasBackend;
      const isFullstack = hasFE && hasBE;
  
      // Root package.json
      if (isFullstack) {
        const scripts: Record<string, string> = {
          'dev:client': 'npm run dev --prefix client',
          'dev:server': 'npm run dev --prefix server',
          'build:client': 'npm run build --prefix client',
          'build:server': 'npm run build --prefix server',
          'lint:client': 'npm run lint --prefix client',
          'lint:server': 'npm run lint --prefix server',
        };
        if (context.hasBothPlatforms) {
          scripts['dev:mobile'] = 'npm run start --prefix mobile';
          scripts['build:mobile'] = 'npm run build --prefix mobile';
          scripts['lint:mobile'] = 'npm run lint --prefix mobile';
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
              scripts,
            },
            null,
            2
          ) + '\n',
        });
      }
  
      return files;
    }
  
    packageJsonTargets(context: TemplateContext): PackageJsonLocation[] {
      const targets: PackageJsonLocation[] = [];
      const hasFE = context.hasFrontend;
      const hasBE = context.hasBackend;
      const isFullstack = hasFE && hasBE;
  
      if (isFullstack) {
        if (context.hasBothPlatforms) {
          targets.push({
            path: 'client/package.json',
            target: TARGETS.FRONTEND,
            name: `${context.projectName}-client`,
          });
          targets.push({
            path: 'mobile/package.json',
            target: TARGETS.FRONTEND,
            name: `${context.projectName}-mobile`,
          });
        } else {
          const feDir = context.hasMobile ? 'mobile' : 'client';
          targets.push({
            path: `${feDir}/package.json`,
            target: TARGETS.FRONTEND,
            name: `${context.projectName}-${context.hasMobile ? 'mobile' : 'client'}`,
          });
        }
        targets.push({
          path: 'server/package.json',
          target: TARGETS.BACKEND,
          name: `${context.projectName}-server`,
        });
      } else if (hasFE) {
        targets.push({ path: 'package.json', target: TARGETS.FRONTEND, name: context.projectName });
      } else if (hasBE) {
        targets.push({ path: 'package.json', target: TARGETS.BACKEND, name: context.projectName });
      }
  
      return targets;
    }
  
    previewTree(context: TemplateContext): string {
      const lines: string[] = [];
      const hasFE = context.hasFrontend;
      const hasBE = context.hasBackend;
      const isFullstack = hasFE && hasBE;
  
      lines.push(`${context.projectName}/`);
  
      if (isFullstack) {
        if (context.hasBothPlatforms) {
          lines.push('├── client/');
          lines.push('│   ├── src/');
          lines.push('│   └── package.json');
          lines.push('├── mobile/');
          lines.push('│   ├── src/');
          lines.push('│   └── package.json');
        } else {
          const feDir = context.hasMobile ? 'mobile' : 'client';
          lines.push(`├── ${feDir}/`);
          lines.push('│   ├── src/');
          lines.push('│   └── package.json');
        }
        lines.push('├── server/');
        lines.push('│   ├── src/');
        lines.push('│   └── package.json');
      } else if (hasFE) {
        lines.push('├── src/');
        lines.push('├── public/');
      } else if (hasBE) {
        lines.push('├── src/');
      }
  
      if (context.hasDocker) {
        lines.push('├── docker-compose.yml');
      }
      if (context.hasGithubActions) {
        lines.push('├── .github/');
      }
      lines.push('├── .gitignore');
      lines.push('├── README.md');
      lines.push('└── package.json');
  
      return lines.join('\n');
    }
  }