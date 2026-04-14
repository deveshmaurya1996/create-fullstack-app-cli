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
  
    resolvePath(relativePath: string, target: Target, context?: TemplateContext): string {
      if (!context) return relativePath;
  
      const hasFE = context.hasFrontend;
      const hasBE = context.hasBackend;
      const isFullstack = hasFE && hasBE;
  
      switch (target) {
        case TARGETS.FRONTEND: {
          if (isFullstack) {
            const feDir = context.hasMobile ? 'mobile' : 'client';
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
        const feDir = context.hasMobile ? 'mobile' : 'client';
        dirs.push(feDir);
        dirs.push(`${feDir}/src`);
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
        const feDir = context.hasMobile ? 'mobile' : 'client';
        const scripts: Record<string, string> = {
          dev: `concurrently "npm run dev:${context.hasMobile ? 'mobile' : 'client'}" "npm run dev:server"`,
          [`dev:${context.hasMobile ? 'mobile' : 'client'}`]: `cd ${feDir} && npm run dev`,
          'dev:server': 'cd server && npm run dev',
          build: `cd ${feDir} && npm run build && cd ../server && npm run build`,
          lint: `cd ${feDir} && npm run lint && cd ../server && npm run lint`,
        };
  
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
              devDependencies: {
                concurrently: '^9.1.0',
              },
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
        const feDir = context.hasMobile ? 'mobile' : 'client';
        targets.push({ path: 'package.json', target: TARGETS.ROOT, name: context.projectName });
        targets.push({
          path: `${feDir}/package.json`,
          target: TARGETS.FRONTEND,
          name: `${context.projectName}-${context.hasMobile ? 'mobile' : 'client'}`,
        });
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
        const feDir = context.hasMobile ? 'mobile' : 'client';
        lines.push(`├── ${feDir}/`);
        lines.push('│   ├── src/');
        lines.push('│   └── package.json');
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