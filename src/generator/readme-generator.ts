import type { TemplateContext, Plugin } from '../shared/types.js';
import { getInstallCommand, getRunCommand } from '../layouts/helpers/package-json-builder.js';

export function generateReadme(
  context: TemplateContext,
  activePlugins: Plugin[]
): string {
  let readme = '';

  readme += `# ${context.projectName}\n\n`;
  readme += generateDescription(context);
  readme += `\n\n`;

  readme += `## 🛠 Tech Stack\n\n`;
  readme += generateTechStack(context, activePlugins);
  readme += `\n`;

  readme += `## 🚀 Getting Started\n\n`;
  readme += generateGettingStarted(context);
  readme += `\n`;

  readme += `## 📜 Available Scripts\n\n`;
  readme += generateScriptsSection(context, activePlugins);
  readme += `\n`;

  readme += `## 🔐 Environment Variables\n\n`;
  readme += generateEnvSection(context, activePlugins);
  readme += `\n`;

  readme += `## 📁 Project Structure\n\n`;
  readme += `\`\`\`\n`;
  readme += generateStructurePreview(context);
  readme += `\`\`\`\n\n`;

  if (context.deployment.length > 0) {
    readme += `## 🚢 Deployment\n\n`;
    readme += generateDeploymentSection(context);
    readme += `\n`;
  }

  readme += `## 📄 License\n\n`;
  readme += `This project is private.\n\n`;

  readme += `---\n\n`;
  readme += `Generated with [create-fullstack-app](https://github.com/create-fullstack-app)\n`;

  return readme;
}

function generateDescription(ctx: TemplateContext): string {
  const parts: string[] = [];

  if (ctx.hasWeb && ctx.hasMobile) {
    parts.push('A full-stack application with web and mobile frontends');
  } else if (ctx.hasMobile) {
    parts.push('A mobile application');
  } else if (ctx.hasWeb) {
    parts.push('A web application');
  } else if (ctx.hasBackend) {
    parts.push('A backend API service');
  }

  if (ctx.hasBackend && ctx.backendFramework) {
    parts.push(`powered by ${ctx.backendFramework}`);
  }

  return parts.join(' ') + '.';
}

function generateTechStack(_ctx: TemplateContext, plugins: Plugin[]): string {
  let stack = '';
  const categories = new Map<string, string[]>();

  for (const plugin of plugins) {
    const cat = plugin.meta.category;
    if (!categories.has(cat)) categories.set(cat, []);
    categories.get(cat)!.push(plugin.meta.label);
  }

  for (const [category, items] of categories) {
    stack += `- **${formatCategory(category)}**: ${items.join(', ')}\n`;
  }

  return stack;
}

function generateGettingStarted(ctx: TemplateContext): string {
  const pm = ctx.packageManager;
  const install = getInstallCommand(pm);
  let steps = '';

  steps += `### Prerequisites\n\n`;
  steps += `- Node.js >= 18.0.0\n`;
  steps += `- ${pm}\n`;
  if (ctx.hasDatabase) steps += `- Database (see Environment Variables)\n`;
  if (ctx.hasRedis) steps += `- Redis\n`;
  if (ctx.hasDocker) steps += `- Docker & Docker Compose (optional)\n`;
  steps += `\n`;

  steps += `### Setup\n\n`;
  steps += `\`\`\`bash\n`;
  steps += `# Clone the repository\n`;
  steps += `cd ${ctx.projectName}\n\n`;
  steps += `# Install dependencies\n`;
  steps += `${install}\n\n`;
  steps += `# Set up environment variables\n`;

  if (ctx.isFullstack) {
    const feDir = ctx.hasMobile ? 'mobile' : 'client';
    steps += `cp ${feDir}/.env.example ${feDir}/.env\n`;
    steps += `cp server/.env.example server/.env\n`;
  } else {
    steps += `cp .env.example .env\n`;
  }

  steps += `# Edit .env with your values\n\n`;

  if (ctx.hasDatabase && ctx.hasPrisma) {
    steps += `# Set up database\n`;
    if (ctx.isFullstack) {
      steps += `cd server\n`;
    }
    steps += `${getRunCommand(pm, 'db:migrate')}\n`;
    steps += `${getRunCommand(pm, 'db:seed')}\n`;
    if (ctx.isFullstack) {
      steps += `cd ..\n`;
    }
    steps += `\n`;
  }

  steps += `# Start development\n`;
  steps += `${getRunCommand(pm, 'dev')}\n`;
  steps += `\`\`\`\n`;

  if (ctx.hasDocker) {
    steps += `\n### With Docker\n\n`;
    steps += `\`\`\`bash\n`;
    steps += `docker-compose up -d\n`;
    steps += `\`\`\`\n`;
  }

  return steps;
}

function generateScriptsSection(_ctx: TemplateContext, plugins: Plugin[]): string {
  let section = '';

  const allScripts = plugins.flatMap((p) => p.meta.scripts);

  if (allScripts.length === 0) return 'See `package.json` for available scripts.\n';

  const byTarget = new Map<string, typeof allScripts>();
  for (const s of allScripts) {
    if (!byTarget.has(s.target)) byTarget.set(s.target, []);
    byTarget.get(s.target)!.push(s);
  }

  for (const [target, scripts] of byTarget) {
    section += `### ${target === 'root' ? 'Root' : target === 'frontend' ? 'Frontend' : 'Backend'}\n\n`;
    section += `| Script | Command | Description |\n`;
    section += `|--------|---------|-------------|\n`;

    for (const s of scripts) {
      section += `| \`${s.name}\` | \`${s.command}\` | ${s.description || ''} |\n`;
    }

    section += `\n`;
  }

  return section;
}

function generateEnvSection(_ctx: TemplateContext, plugins: Plugin[]): string {
  const allVars = plugins.flatMap((p) => p.meta.envVars);

  if (allVars.length === 0) return 'No environment variables required.\n';

  let section = '| Variable | Target | Description |\n';
  section += '|----------|--------|-------------|\n';

  for (const v of allVars) {
    section += `| \`${v.key}\` | ${v.target} | ${v.comment} |\n`;
  }

  return section;
}

function generateStructurePreview(ctx: TemplateContext): string {
  return `${ctx.projectName}/\n├── src/\n├── package.json\n└── README.md\n`;
}

function generateDeploymentSection(ctx: TemplateContext): string {
  let section = '';

  for (const deploy of ctx.deployment) {
    section += `### ${deploy}\n\n`;
    section += `See the deployment configuration files for details.\n\n`;
  }

  return section;
}

function formatCategory(category: string): string {
  return category
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}