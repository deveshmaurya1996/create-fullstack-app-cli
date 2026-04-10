export function toKebabCase(str: string): string {
  return str
    .replace(/([a-z])([A-Z])/g, '\$1-\$2')
    .replace(/[\s_]+/g, '-')
    .toLowerCase();
}

export function toCamelCase(str: string): string {
  return str
    .replace(/[-_\s]+(.)?/g, (_, char) => (char ? char.toUpperCase() : ''))
    .replace(/^(.)/, (char) => char.toLowerCase());
}

export function toPascalCase(str: string): string {
  const camel = toCamelCase(str);
  return camel.charAt(0).toUpperCase() + camel.slice(1);
}

export function toSnakeCase(str: string): string {
  return str
    .replace(/([a-z])([A-Z])/g, '\$1_\$2')
    .replace(/[-\s]+/g, '_')
    .toLowerCase();
}

export function toUpperSnakeCase(str: string): string {
  return toSnakeCase(str).toUpperCase();
}

export function deepMerge<T extends Record<string, unknown>>(target: T, ...sources: Partial<T>[]): T {
  const result = { ...target };

  for (const source of sources) {
    for (const key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        const targetVal = result[key];
        const sourceVal = source[key];

        if (
          isPlainObject(targetVal) &&
          isPlainObject(sourceVal)
        ) {
          (result as Record<string, unknown>)[key] = deepMerge(
            targetVal as Record<string, unknown>,
            sourceVal as Record<string, unknown>
          );
        } else if (Array.isArray(targetVal) && Array.isArray(sourceVal)) {
          (result as Record<string, unknown>)[key] = [...targetVal, ...sourceVal];
        } else if (sourceVal !== undefined) {
          (result as Record<string, unknown>)[key] = sourceVal;
        }
      }
    }
  }

  return result;
}

export function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

export function sortKeys<T>(obj: Record<string, T>): Record<string, T> {
  return Object.keys(obj)
    .sort()
    .reduce(
      (sorted, key) => {
        sorted[key] = obj[key];
        return sorted;
      },
      {} as Record<string, T>
    );
}

export function deduplicate<T>(arr: T[]): T[] {
  return [...new Set(arr)];
}

export function deduplicateBy<T>(arr: T[], keyFn: (item: T) => string): T[] {
  const seen = new Set<string>();
  return arr.filter((item) => {
    const key = keyFn(item);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

export function groupBy<T>(arr: T[], keyFn: (item: T) => string): Record<string, T[]> {
  return arr.reduce(
    (groups, item) => {
      const key = keyFn(item);
      if (!groups[key]) groups[key] = [];
      groups[key].push(item);
      return groups;
    },
    {} as Record<string, T[]>
  );
}

export function sanitizeProjectName(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9-_]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

export function indent(text: string, spaces: number): string {
  const prefix = ' '.repeat(spaces);
  return text
    .split('\n')
    .map((line) => (line.trim() ? `${prefix}${line}` : line))
    .join('\n');
}

export function stripTrailingNewlines(text: string): string {
  return text.replace(/\n+$/, '\n');
}

export function ensureTrailingNewline(text: string): string {
  return text.endsWith('\n') ? text : `${text}\n`;
}

export function arrayToSentence(arr: string[]): string {
  if (arr.length === 0) return '';
  if (arr.length === 1) return arr[0];
  if (arr.length === 2) return `${arr[0]} and ${arr[1]}`;
  return `${arr.slice(0, -1).join(', ')}, and ${arr[arr.length - 1]}`;
}