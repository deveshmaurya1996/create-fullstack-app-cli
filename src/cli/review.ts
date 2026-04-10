import type { WizardAnswers, Plugin } from '../shared/types.js';
import type { ReviewData, ReviewSection, ReviewItem, ReviewPackages, ReviewEnvVars, ReviewScripts } from '../shared/types.js';
import { colors, keyValue } from './ui/colors.js';
import { groupBy } from '../shared/utils.js';

export function buildReviewData(
  answers: WizardAnswers,
  activePlugins: Plugin[],
  folderTree: string
): ReviewData {
  return {
    projectName: answers.projectName,
    structure: formatStructure(answers),
    packageManager: answers.packageManager,
    sections: buildSections(answers, activePlugins),
    folderTree,
    packages: buildPackages(activePlugins),
    envVars: buildEnvVars(activePlugins),
    scripts: buildScripts(activePlugins),
    conflicts: [],
    warnings: [],
  };
}

function buildSections(answers: WizardAnswers, plugins: Plugin[]): ReviewSection[] {
  const sections: ReviewSection[] = [];

  // Frontend section
  if (answers.webFramework || answers.mobileFramework) {
    const items: ReviewItem[] = [];

    if (answers.webFramework) {
      items.push({ label: 'Web Framework', value: findLabel(plugins, answers.webFramework) });
    }
    if (answers.mobileFramework) {
      items.push({ label: 'Mobile Framework', value: findLabel(plugins, answers.mobileFramework) });
    }
    if (answers.webStyling) {
      items.push({ label: 'Web Styling', value: findLabel(plugins, answers.webStyling) });
    }
    if (answers.mobileStyling) {
      items.push({ label: 'Mobile Styling', value: findLabel(plugins, answers.mobileStyling) });
    }
    if (answers.stateManagement.length > 0) {
      items.push({
        label: 'State',
        value: answers.stateManagement.map((id) => findLabel(plugins, id)).join(', '),
      });
    }
    if (answers.formLibrary) {
      items.push({ label: 'Forms', value: findLabel(plugins, answers.formLibrary) });
    }
    if (answers.uiLibrary) {
      items.push({ label: 'UI Library', value: findLabel(plugins, answers.uiLibrary) });
    }
    if (answers.apiClient) {
      items.push({ label: 'API Client', value: findLabel(plugins, answers.apiClient) });
    }
    if (answers.mobileNavigation) {
      items.push({ label: 'Navigation', value: findLabel(plugins, answers.mobileNavigation) });
    }
    if (answers.frontendExtras.length > 0) {
      items.push({
        label: 'Extras',
        value: answers.frontendExtras.map((id) => findLabel(plugins, id)).join(', '),
      });
    }

    const platformLabel = answers.platform === 'both' ? 'Web + Mobile' :
                          answers.platform === 'mobile' ? 'Mobile' : 'Web';
    sections.push({ title: `Frontend (${platformLabel})`, items });
  }

  // Backend section
  if (answers.backendFramework) {
    const items: ReviewItem[] = [];
    const tsLabel = answers.backendTs ? ' — TypeScript' : '';
    items.push({ label: 'Framework', value: `${findLabel(plugins, answers.backendFramework)}${tsLabel}` });

    if (answers.apiStyle) {
      items.push({ label: 'API Style', value: answers.apiStyle.toUpperCase() });
    }
    if (answers.database) {
      items.push({ label: 'Database', value: findLabel(plugins, answers.database) });
    }
    if (answers.orm) {
      items.push({ label: 'ORM', value: findLabel(plugins, answers.orm) });
    }
    if (answers.redis) {
      items.push({ label: 'Cache', value: 'Redis' });
    }
    if (answers.auth) {
      items.push({ label: 'Auth', value: findLabel(plugins, answers.auth) });
    }
    if (answers.backendExtras.length > 0) {
      items.push({
        label: 'Extras',
        value: answers.backendExtras.map((id) => findLabel(plugins, id)).join(', '),
      });
    }

    sections.push({ title: 'Backend', items });
  }

  // Testing
  if (answers.testing.length > 0) {
    sections.push({
      title: 'Testing',
      items: [{ label: 'Tools', value: answers.testing.map((id) => findLabel(plugins, id)).join(', ') }],
    });
  }

  // Logging & Monitoring
  if (answers.logging || answers.monitoring) {
    const items: ReviewItem[] = [];
    if (answers.logging) items.push({ label: 'Logging', value: findLabel(plugins, answers.logging) });
    if (answers.monitoring) items.push({ label: 'Monitoring', value: findLabel(plugins, answers.monitoring) });
    sections.push({ title: 'Logging & Monitoring', items });
  }

  // Dev Tools
  if (answers.devtools.length > 0) {
    sections.push({
      title: 'Dev Tools',
      items: [{ label: 'Tools', value: answers.devtools.map((id) => findLabel(plugins, id)).join(', ') }],
    });
  }

  // DevOps
  if (answers.devops.length > 0) {
    sections.push({
      title: 'DevOps',
      items: [{ label: 'CI/CD', value: answers.devops.map((id) => findLabel(plugins, id)).join(', ') }],
    });
  }

  // Deployment
  if (answers.deployment.length > 0) {
    sections.push({
      title: 'Deployment',
      items: [{ label: 'Targets', value: answers.deployment.map((id) => findLabel(plugins, id)).join(', ') }],
    });
  }

  return sections;
}

function buildPackages(plugins: Plugin[]): ReviewPackages {
  const groups: ReviewPackages['groups'] = [];

  const frontendDeps = plugins
    .filter((p) => p.meta.category.startsWith('frontend') || p.meta.category.startsWith('styling') ||
                   p.meta.category === 'state' || p.meta.category === 'forms' ||
                   p.meta.category === 'ui-library' || p.meta.category === 'api-client' ||
                   p.meta.category === 'mobile-navigation')
    .flatMap((p) => p.meta.deps.map((d) => d.name));

  const frontendDevDeps = plugins
    .filter((p) => p.meta.category.startsWith('frontend') || p.meta.category.startsWith('styling'))
    .flatMap((p) => p.meta.devDeps.map((d) => d.name));

  const backendDeps = plugins
    .filter((p) => p.meta.category === 'backend' || p.meta.category === 'database' ||
                   p.meta.category === 'orm' || p.meta.category === 'auth' ||
                   p.meta.category === 'backend-extras' || p.meta.category === 'api-style' ||
                   p.meta.category === 'logging')
    .flatMap((p) => p.meta.deps.map((d) => d.name));

  const backendDevDeps = plugins
    .filter((p) => p.meta.category === 'backend' || p.meta.category === 'orm')
    .flatMap((p) => p.meta.devDeps.map((d) => d.name));

  if (frontendDeps.length > 0) {
    groups.push({ label: 'Frontend Production', count: frontendDeps.length, packages: [...new Set(frontendDeps)] });
  }
  if (frontendDevDeps.length > 0) {
    groups.push({ label: 'Frontend Development', count: frontendDevDeps.length, packages: [...new Set(frontendDevDeps)] });
  }
  if (backendDeps.length > 0) {
    groups.push({ label: 'Backend Production', count: backendDeps.length, packages: [...new Set(backendDeps)] });
  }
  if (backendDevDeps.length > 0) {
    groups.push({ label: 'Backend Development', count: backendDevDeps.length, packages: [...new Set(backendDevDeps)] });
  }

  const pythonPackages = plugins.flatMap((p) =>
    (p.meta.pythonDeps ?? []).map((d) => (d.version ? `${d.name} ${d.version}` : d.name))
  );
  if (pythonPackages.length > 0) {
    const unique = [...new Set(pythonPackages)];
    groups.push({ label: 'Python (pip)', count: unique.length, packages: unique });
  }

  const total = groups.reduce((sum, g) => sum + g.count, 0);
  return { total, groups };
}

function buildEnvVars(plugins: Plugin[]): ReviewEnvVars {
  const allVars = plugins.flatMap((p) => p.meta.envVars);
  const grouped = groupBy(allVars, (v) => v.target);

  const groups = Object.entries(grouped).map(([target, vars]) => ({
    label: target === 'frontend' ? 'Frontend' : target === 'backend' ? 'Backend' : 'Root',
    vars: vars.map((v) => ({ key: v.key, comment: v.comment })),
  }));

  return { groups };
}

function buildScripts(plugins: Plugin[]): ReviewScripts {
  const allScripts = plugins.flatMap((p) => p.meta.scripts);
  const grouped = groupBy(allScripts, (s) => s.target);

  const groups = Object.entries(grouped).map(([target, scripts]) => ({
    label: target === 'frontend' ? 'Frontend' : target === 'backend' ? 'Backend' : 'Root',
    scripts: scripts.map((s) => ({ name: s.name, command: s.command, description: s.description })),
  }));

  return { groups };
}

function findLabel(plugins: Plugin[], id: string | null): string {
  if (!id || id === 'none') return 'None';
  const plugin = plugins.find((p) => p.meta.id === id);
  return plugin?.meta.label || id;
}

function formatStructure(answers: WizardAnswers): string {
  let label = answers.structure === 'single-app' ? 'Single App' :
              answers.structure === 'monorepo' ? 'Monorepo' : 'Microservices';

  if (answers.monorepoTool) {
    label += ` (${answers.monorepoTool})`;
  }

  return label;
}

// ─── Render Review Screen ────────────────────────────────────

export function renderReviewScreen(data: ReviewData): string {
  let output = '';

  const width = 62;
  const border = colors.border;

  output += `\n${border('╔' + '═'.repeat(width) + '╗')}\n`;
  output += `${border('║')}${colors.heading('  PROJECT REVIEW').padEnd(width + 10)}${border('║')}\n`;
  output += `${border('╠' + '═'.repeat(width) + '╣')}\n`;

  // Project info
  output += `${border('║')}  ${keyValue('Project:', data.projectName)}`.padEnd(width + 20) + `${border('║')}\n`;
  output += `${border('║')}  ${keyValue('Structure:', data.structure)}`.padEnd(width + 20) + `${border('║')}\n`;
  output += `${border('║')}  ${keyValue('Manager:', data.packageManager)}`.padEnd(width + 20) + `${border('║')}\n`;
  output += `${border('║')}`.padEnd(width + 1) + `${border('║')}\n`;

  // Sections
  for (const section of data.sections) {
    output += `${border('║')}  ${colors.sectionTitle(`─── ${section.title} ───`)}`.padEnd(width + 30) + `${border('║')}\n`;
    for (const item of section.items) {
      output += `${border('║')}  ${keyValue(`${item.label}:`, item.value)}`.padEnd(width + 20) + `${border('║')}\n`;
    }
    output += `${border('║')}`.padEnd(width + 1) + `${border('║')}\n`;
  }

  // Folder tree
  output += `${border('╠' + '═'.repeat(width) + '╣')}\n`;
  output += `${border('║')}  ${colors.heading('Folder Preview:')}`.padEnd(width + 15) + `${border('║')}\n`;
  for (const line of data.folderTree.split('\n').filter(Boolean)) {
    output += `${border('║')}  ${colors.path(line)}`.padEnd(width + 15) + `${border('║')}\n`;
  }

  // Packages
  output += `${border('╠' + '═'.repeat(width) + '╣')}\n`;
  output += `${border('║')}  ${colors.heading(`Packages (${data.packages.total} total):`)}`.padEnd(width + 15) + `${border('║')}\n`;
  for (const group of data.packages.groups) {
    output += `${border('║')}  ${colors.subheading(`${group.label} (${group.count}):`)}\n`;
    output += `${border('║')}    ${colors.muted(group.packages.join(', '))}\n`;
  }

  // Env vars
  output += `${border('╠' + '═'.repeat(width) + '╣')}\n`;
  output += `${border('║')} ${colors.heading('Environment Variables:')}`.padEnd(width + 15) + `${border('║')}\n`;
  for (const group of data.envVars.groups) {
    output += `${border('║')}  ${colors.subheading(`${group.label}:`)}\n`;
    for (const v of group.vars) {
      output += `${border('║')}    ${colors.label(v.key.padEnd(35))} ${colors.muted(`← ${v.comment}`)}\n`;
    }
  }

  // Scripts
  output += `${border('╠' + '═'.repeat(width) + '╣')}\n`;
  output += `${border('║')}  ${colors.heading('Scripts Available:')}`.padEnd(width + 15) + `${border('║')}\n`;
  for (const group of data.scripts.groups) {
    output += `${border('║')}  ${colors.subheading(`${group.label}:`)}\n`;
    for (const s of group.scripts) {
      const desc = s.description ? colors.muted(` — ${s.description}`) : '';
      output += `${border('║')}    ${colors.command(s.name.padEnd(18))} ${colors.muted(s.command)}${desc}\n`;
    }
  }

  // Conflicts & Warnings
  output += `${border('╠' + '═'.repeat(width) + '╣')}\n`;
  if (data.conflicts.length > 0) {
    for (const conflict of data.conflicts) {
      output += `${border('║')}  ${colors.error(`⚠ CONFLICT: ${conflict}`)}\n`;
    }
  } else {
    output += `${border('║')}  ${colors.success('⚠ No conflicts detected')}\n`;
    output += `${border('║')}  ${colors.success('✓ All plugin dependencies satisfied')}\n`;
  }

  if (data.warnings.length > 0) {
    for (const warning of data.warnings) {
      output += `${border('║')}  ${colors.warning(`⚠ ${warning}`)}\n`;
    }
  }

  output += `${border('╚' + '═'.repeat(width) + '╝')}\n`;

  return output;
}

export async function showReviewAndConfirm(data: ReviewData): Promise<'proceed' | 'back' | 'restart' | 'cancel'> {
  const { select } = await import('@inquirer/prompts');

  console.log(renderReviewScreen(data));

  const action = await select({
    message: 'What would you like to do?',
    choices: [
      { value: 'proceed', name: '🚀 Proceed with generation' },
      { value: 'back', name: '← Go back and modify' },
      { value: 'restart', name: '↻ Restart from beginning' },
      { value: 'cancel', name: '✖ Cancel' },
    ],
  });

  return action as 'proceed' | 'back' | 'restart' | 'cancel';
}