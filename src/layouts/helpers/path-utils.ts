import path from 'node:path';

export function normalizePath(p: string): string {
  return p.replace(/\\/g, '/');
}

export function joinPaths(...parts: string[]): string {
  return normalizePath(path.join(...parts));
}

export function ensureLeadingSlash(p: string): string {
  const normalized = normalizePath(p);
  return normalized.startsWith('/') ? normalized : `/${normalized}`;
}

export function removeLeadingSlash(p: string): string {
  const normalized = normalizePath(p);
  return normalized.startsWith('/') ? normalized.slice(1) : normalized;
}

export function getDirectory(filePath: string): string {
  return normalizePath(path.dirname(filePath));
}