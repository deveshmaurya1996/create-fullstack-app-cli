import type {
    LayoutStrategy,
    Target,
    TemplateContext,
    FileEntry,
    PackageJsonLocation,
  } from '../shared/types.js';
  import { TARGETS } from '../shared/constants.js';
  import { joinPaths } from './helpers/path-utils.js';
  
  export class MicroservicesLayout implements LayoutStrategy {
    name = 'microservices';
  
    resolvePath(relativePath: string, target: Target, context?: TemplateContext): string {
      switch (target) {
        case TARGETS.FRONTEND: {
          if (context?.hasMobile) {
            return joinPaths('frontend/mobile', relativePath);
          }
          return joinPaths('frontend/web', relativePath);
        }
  
        case TARGETS.BACKEND:
          return joinPaths('gateway', relativePath);
  
        case TARGETS.SHARED:
          return joinPaths('shared', relativePath);
  
        case TARGETS.ROOT:
        default:
          return relativePath;
      }
    }
  
    scaffold(_projectName: string, context: TemplateContext): string[] {
      const dirs: string[] = [
        'frontend',
        'gateway',
        'gateway/src',
        'services',
        'shared',
        'shared/src',
        'infrastructure',
      ];
  
      if (context.hasWeb) {
        dirs.push('frontend/web', 'frontend/web/src');
      }
      if (context.hasMobile) {
        dirs.push('frontend/mobile');
      }
  
      return dirs;
    }
  
    rootConfig(context: TemplateContext): FileEntry[] {
      const files: FileEntry[] = [];
  
      // Root package.json
      const scripts: Record<string, string> = {
        'dev': 'docker-compose -f docker-compose.dev.yml up',
        'dev:gateway': 'cd gateway && npm run dev',
        'build': 'docker-compose build',
        'start': 'docker-compose up -d',
        'stop': 'docker-compose down',
      };
  
      if (context.hasWeb) {
        scripts['dev:web'] = 'cd frontend/web && npm run dev';
      }
      if (context.hasMobile) {
        scripts['dev:mobile'] = 'cd frontend/mobile && npm run start';
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
  
      // Docker compose for microservices
      files.push({
        path: 'docker-compose.yml',
        content: buildDockerCompose(context),
      });
  
      files.push({
        path: 'docker-compose.dev.yml',
        content: buildDockerComposeDev(context),
      });
  
      // Shared package
      files.push({
        path: 'shared/package.json',
        content: JSON.stringify(
          {
            name: `@${context.projectName}/shared`,
            version: '0.1.0',
            private: true,
            type: 'module',
            main: './src/index.ts',
          },
          null,
          2
        ) + '\n',
      });
  
      files.push({
        path: 'shared/src/index.ts',
        content: '// Shared types, constants, and utilities\nexport {};\n',
      });
  
      // Infrastructure readme
      files.push({
        path: 'infrastructure/README.md',
        content: `# Infrastructure\n\nDeployment configurations, Terraform files, Kubernetes manifests, etc.\n`,
      });
  
      return files;
    }
  
    packageJsonTargets(context: TemplateContext): PackageJsonLocation[] {
      const targets: PackageJsonLocation[] = [
        { path: 'package.json', target: TARGETS.ROOT, name: context.projectName },
        { path: 'gateway/package.json', target: TARGETS.BACKEND, name: `${context.projectName}-gateway` },
        { path: 'shared/package.json', target: TARGETS.SHARED, name: `@${context.projectName}/shared` },
      ];
  
      if (context.hasWeb) {
        targets.push({
          path: 'frontend/web/package.json',
          target: TARGETS.FRONTEND,
          name: `${context.projectName}-web`,
        });
      }
  
      if (context.hasMobile) {
        targets.push({
          path: 'frontend/mobile/package.json',
          target: TARGETS.FRONTEND,
          name: `${context.projectName}-mobile`,
        });
      }
  
      return targets;
    }
  
    previewTree(context: TemplateContext): string {
      const lines: string[] = [];
      lines.push(`${context.projectName}/`);
  
      lines.push('├── frontend/');
      if (context.hasWeb) lines.push('│   ├── web/');
      if (context.hasMobile) lines.push('│   └── mobile/');
  
      lines.push('├── gateway/');
      lines.push('│   └── src/');
      lines.push('├── services/');
      lines.push('├── shared/');
      lines.push('│   └── src/');
      lines.push('├── infrastructure/');
      lines.push('├── docker-compose.yml');
  
      if (context.hasGithubActions) lines.push('├── .github/');
      lines.push('├── .gitignore');
      lines.push('├── README.md');
      lines.push('└── package.json');
  
      return lines.join('\n');
    }
  }
  
  function buildDockerCompose(context: TemplateContext): string {
    let content = `version: '3.8'\n\nservices:\n`;
  
    content += `  gateway:\n`;
    content += `    build:\n`;
    content += `      context: ./gateway\n`;
    content += `      dockerfile: Dockerfile\n`;
    content += `    ports:\n`;
    content += `      - "\${PORT:-3000}:3000"\n`;
    content += `    environment:\n`;
    content += `      - NODE_ENV=production\n`;
  
    if (context.hasDatabase) {
      if (context.hasPostgres) {
        content += `    depends_on:\n`;
        content += `      - postgres\n\n`;
        content += `  postgres:\n`;
        content += `    image: postgres:16-alpine\n`;
        content += `    ports:\n`;
        content += `      - "5432:5432"\n`;
        content += `    environment:\n`;
        content += `      POSTGRES_DB: \${DB_NAME:-${context.projectName}}\n`;
        content += `      POSTGRES_USER: \${DB_USER:-postgres}\n`;
        content += `      POSTGRES_PASSWORD: \${DB_PASSWORD:-postgres}\n`;
        content += `    volumes:\n`;
        content += `      - postgres_data:/var/lib/postgresql/data\n`;
      }
  
      if (context.hasMongodb) {
        content += `    depends_on:\n`;
        content += `      - mongo\n\n`;
        content += `  mongo:\n`;
        content += `    image: mongo:7\n`;
        content += `    ports:\n`;
        content += `      - "27017:27017"\n`;
        content += `    volumes:\n`;
        content += `      - mongo_data:/data/db\n`;
      }
    }
  
    if (context.hasRedis) {
      content += `\n  redis:\n`;
      content += `    image: redis:7-alpine\n`;
      content += `    ports:\n`;
      content += `      - "6379:6379"\n`;
      content += `    volumes:\n`;
      content += `      - redis_data:/data\n`;
    }
  
    content += `\nvolumes:\n`;
    if (context.hasPostgres) content += `  postgres_data:\n`;
    if (context.hasMongodb) content += `  mongo_data:\n`;
    if (context.hasRedis) content += `  redis_data:\n`;
  
    return content;
  }
  
  function buildDockerComposeDev(_context: TemplateContext): string {
    let content = `version: '3.8'\n\nservices:\n`;
  
    content += `  gateway:\n`;
    content += `    build:\n`;
    content += `      context: ./gateway\n`;
    content += `      dockerfile: Dockerfile\n`;
    content += `      target: development\n`;
    content += `    volumes:\n`;
    content += `      - ./gateway/src:/app/src\n`;
    content += `    ports:\n`;
    content += `      - "\${PORT:-3000}:3000"\n`;
    content += `    environment:\n`;
    content += `      - NODE_ENV=development\n`;
  
    return content;
  }