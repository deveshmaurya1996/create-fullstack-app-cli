import type { WizardAnswers, WizardDraft, Plugin } from '../shared/types.js';
import type { WizardPhase } from './types.js';
import { getPromptsForPhase } from './prompt-definitions.js';
import { isQuestionVisible } from './visibility.js';
import { runPrompt } from './prompt-runner.js';
import { buildAnswers, collectActivePluginIds } from './build-answers.js';
import { buildReviewData, showReviewAndConfirm } from './review.js';
import { createInitialState, applyNavigation, recordAnswer } from './navigation.js';
import { pluginRegistry } from '../plugins/registry.js';
import { checkConflicts } from '../plugins/conflict-checker.js';
import { checkDependencies } from '../plugins/dependency-checker.js';
import { colors } from './ui/colors.js';

export interface WizardResult {
  answers: WizardAnswers;
  activePlugins: Plugin[];
  cancelled: boolean;
}

export async function runWizard(initialName?: string): Promise<WizardResult> {
  await pluginRegistry.initialize();

  let state = createInitialState();

  // Pre-fill project name if provided via CLI arg
  if (initialName) {
    state = recordAnswer(state, 'projectName', initialName);
  }

  while (!state.completed && !state.cancelled) {
    const currentPhase = state.currentPhase;

    if (currentPhase === 'review') {
      const result = await handleReviewPhase(state.draft);

      switch (result) {
        case 'proceed':
          state = { ...state, completed: true };
          break;
        case 'back':
          state = applyNavigation(state, { type: 'back' });
          break;
        case 'restart':
          state = applyNavigation(state, { type: 'restart' });
          break;
        case 'cancel':
          state = applyNavigation(state, { type: 'cancel' });
          break;
      }
      continue;
    }

    const phasePrompts = getPromptsForPhase(currentPhase);
    const hasAnyVisiblePrompt = phasePrompts.some((p) => isQuestionVisible(p.id, state.draft));
    if (!hasAnyVisiblePrompt) {
      state = applyNavigation(state, { type: 'next' });
      continue;
    }

    printPhaseHeader(currentPhase);

    let promptIndex = 0;
    let phaseCompleted = true;

    while (promptIndex < phasePrompts.length) {
      const prompt = phasePrompts[promptIndex];

      if (!isQuestionVisible(prompt.id, state.draft)) {
        promptIndex++;
        continue;
      }

      if (
        state.draft[prompt.id as keyof WizardDraft] !== undefined &&
        promptIndex < state.currentPromptIndex
      ) {
        promptIndex++;
        continue;
      }

      try {
        const value = await runPrompt(prompt, state.draft);

        const transformedValue = prompt.transform
          ? prompt.transform(value, state.draft)
          : value;

        state = recordAnswer(state, prompt.id, transformedValue);
        promptIndex++;
      } catch (error) {
        if ((error as Error).message?.includes('User force closed')) {
          state = applyNavigation(state, { type: 'cancel' });
          phaseCompleted = false;
          break;
        }
        throw error;
      }
    }

    if (phaseCompleted && !state.cancelled) {
      state = applyNavigation(state, { type: 'next' });
    }
  }

  if (state.cancelled) {
    return {
      answers: buildAnswers(state.draft),
      activePlugins: [],
      cancelled: true,
    };
  }

  const answers = buildAnswers(state.draft);
  const pluginIds = collectActivePluginIds(answers);
  const activePlugins = pluginRegistry.getPluginsByIds(pluginIds);

  return {
    answers,
    activePlugins,
    cancelled: false,
  };
}

async function handleReviewPhase(
  draft: WizardDraft
): Promise<'proceed' | 'back' | 'restart' | 'cancel'> {
  const answers = buildAnswers(draft);
  const pluginIds = collectActivePluginIds(answers);
  const activePlugins = pluginRegistry.getPluginsByIds(pluginIds);

  const conflictResult = checkConflicts(activePlugins);
  const depResult = checkDependencies(activePlugins);

  const folderTree = buildSimplePreview(answers);

  const reviewData = buildReviewData(answers, activePlugins, folderTree);

  if (conflictResult.hasConflicts) {
    reviewData.conflicts = conflictResult.conflicts.map((c) => c.reason);
  }

  if (!depResult.satisfied) {
    reviewData.warnings.push(
      ...depResult.missingDeps.map(
        (d) => `${d.plugin} requires: ${d.missing.join(', ')}`
      )
    );
  }

  if (depResult.suggestions.length > 0) {
    reviewData.warnings.push(
      ...depResult.suggestions.map((s) => s.reason)
    );
  }

  return showReviewAndConfirm(reviewData);
}

function buildSimplePreview(answers: WizardAnswers): string {
  const lines: string[] = [];
  lines.push(`${answers.projectName}/`);

  if (answers.structure === 'monorepo') {
    lines.push('├── apps/');
    if (answers.webFramework) lines.push('│   ├── web/');
    if (answers.mobileFramework) lines.push('│   ├── mobile/');
    if (answers.backendFramework) lines.push('│   └── api/');
    lines.push('├── packages/');
    lines.push('│   └── shared/');
    lines.push('├── turbo.json');
    lines.push('└── package.json');
  } else if (answers.structure === 'microservices') {
    if (answers.webFramework || answers.mobileFramework) lines.push('├── frontend/');
    lines.push('├── gateway/');
    lines.push('├── services/');
    lines.push('├── shared/');
    lines.push('├── infrastructure/');
    lines.push('├── docker-compose.yml');
    lines.push('└── package.json');
  } else {
    // Single app
    const hasFE = answers.webFramework || answers.mobileFramework;
    const hasBE = answers.backendFramework;

    if (hasFE && hasBE) {
      const feDir = answers.mobileFramework ? 'mobile' : 'client';
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

    if (answers.devops.includes('docker')) lines.push('├── docker-compose.yml');
    if (answers.devops.includes('github-actions')) lines.push('├── .github/workflows/');
    lines.push('├── .gitignore');
    lines.push('├── README.md');
    lines.push('└── package.json');
  }

  return lines.join('\n');
}

function printPhaseHeader(phase: WizardPhase): void {
  const labels: Record<WizardPhase, string> = {
    'project-shape': '📦 Project Shape',
    'frontend': '🎨 Frontend',
    'backend': '⚙️ Backend',
    'shared-concerns': '🔧 Shared Concerns',
    'review': '📋 Review',
  };

  console.log();
  console.log(colors.heading(labels[phase] || phase));
  console.log(colors.muted('─'.repeat(40)));
  console.log();
}