import fs from 'fs-extra';
import path from 'node:path';
import { FileWriteError } from '../shared/errors.js';
import { logger } from '../shared/logger.js';
import { ensureTrailingNewline } from '../shared/utils.js';

export interface WriteOptions {
  dryRun?: boolean;
  overwrite?: boolean;
}

export class FileWriter {
  private baseDir: string;
  private filesWritten: string[] = [];
  private dryRun: boolean;

  constructor(baseDir: string, options: WriteOptions = {}) {
    this.baseDir = baseDir;
    this.dryRun = options.dryRun ?? false;
  }

  async writeFile(relativePath: string, content: string): Promise<void> {
    const absolutePath = path.resolve(this.baseDir, relativePath);

    logger.debug(`Writing: ${relativePath}`);

    if (this.dryRun) {
      this.filesWritten.push(relativePath);
      return;
    }

    try {
      await fs.ensureDir(path.dirname(absolutePath));
      await fs.writeFile(absolutePath, ensureTrailingNewline(content), 'utf-8');
      this.filesWritten.push(relativePath);
    } catch (error) {
      throw new FileWriteError(relativePath, error as Error);
    }
  }

  async readFile(relativePath: string): Promise<string | null> {
    if (this.dryRun) return null;

    const absolutePath = path.resolve(this.baseDir, relativePath);

    try {
      if (await fs.pathExists(absolutePath)) {
        return await fs.readFile(absolutePath, 'utf-8');
      }
      return null;
    } catch {
      return null;
    }
  }

  async updateFile(relativePath: string, content: string): Promise<void> {
    const absolutePath = path.resolve(this.baseDir, relativePath);

    logger.debug(`Updating: ${relativePath}`);

    if (this.dryRun) return;

    try {
      await fs.writeFile(absolutePath, ensureTrailingNewline(content), 'utf-8');
    } catch (error) {
      throw new FileWriteError(relativePath, error as Error);
    }
  }

  async createDir(relativePath: string): Promise<void> {
    if (this.dryRun) return;

    const absolutePath = path.resolve(this.baseDir, relativePath);

    try {
      await fs.ensureDir(absolutePath);
    } catch (error) {
      throw new FileWriteError(relativePath, error as Error);
    }
  }

  async copyFile(sourcePath: string, destRelativePath: string): Promise<void> {
    if (this.dryRun) {
      this.filesWritten.push(destRelativePath);
      return;
    }

    const absoluteDest = path.resolve(this.baseDir, destRelativePath);

    try {
      await fs.ensureDir(path.dirname(absoluteDest));
      await fs.copy(sourcePath, absoluteDest);
      this.filesWritten.push(destRelativePath);
    } catch (error) {
      throw new FileWriteError(destRelativePath, error as Error);
    }
  }

  async fileExists(relativePath: string): Promise<boolean> {
    if (this.dryRun) return this.filesWritten.includes(relativePath);

    const absolutePath = path.resolve(this.baseDir, relativePath);
    return fs.pathExists(absolutePath);
  }

  getFilesWritten(): string[] {
    return [...this.filesWritten];
  }

  getBaseDir(): string {
    return this.baseDir;
  }

  getFileCount(): number {
    return this.filesWritten.length;
  }
}