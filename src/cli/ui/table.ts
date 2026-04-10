import { colors } from './colors.js';

export interface TableColumn {
  key: string;
  label: string;
  width?: number;
  align?: 'left' | 'right' | 'center';
}

export interface TableOptions {
  columns: TableColumn[];
  rows: Record<string, string>[];
  title?: string;
  maxWidth?: number;
}

export function renderTable(options: TableOptions): string {
  const { columns, rows, title } = options;
  let output = '';

  // Calculate column widths
  const colWidths = columns.map((col) => {
    const headerLen = col.label.length;
    const maxDataLen = Math.max(
      ...rows.map((row) => (row[col.key] || '').length),
      0
    );
    return col.width || Math.min(Math.max(headerLen, maxDataLen) + 2, 40);
  });

  // Title
  if (title) {
    output += `\n${colors.heading(title)}\n`;
  }

  // Header
  const headerLine = columns
    .map((col, i) => padCell(col.label, colWidths[i], col.align))
    .join(colors.border(' │ '));
  output += `  ${headerLine}\n`;

  // Separator
  const separator = colWidths.map((w) => '─'.repeat(w)).join('─┼─');
  output += `  ${colors.border(separator)}\n`;

  // Rows
  for (const row of rows) {
    const rowLine = columns
      .map((col, i) => padCell(row[col.key] || '', colWidths[i], col.align))
      .join(colors.border(' │ '));
    output += `  ${rowLine}\n`;
  }

  return output;
}

function padCell(text: string, width: number, align: 'left' | 'right' | 'center' = 'left'): string {
  const stripped = text.replace(/\u001b\[[0-9;]*m/g, '');
  const padding = Math.max(0, width - stripped.length);

  switch (align) {
    case 'right':
      return ' '.repeat(padding) + text;
    case 'center': {
      const left = Math.floor(padding / 2);
      const right = padding - left;
      return ' '.repeat(left) + text + ' '.repeat(right);
    }
    default:
      return text + ' '.repeat(padding);
  }
}

export function renderPackageList(
  groups: Array<{ label: string; packages: string[] }>
): string {
  let output = '';

  for (const group of groups) {
    output += `  ${colors.subheading(`${group.label} (${group.packages.length}):`)} `;
    output += colors.muted(group.packages.join(', '));
    output += '\n';
  }

  return output;
}