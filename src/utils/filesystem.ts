import { Service } from 'typedi';
import fs from 'fs-extra';
import path from 'path';

@Service()
export default class FileSystem {
  public fileExist(path: string): boolean {
    return fs.existsSync(path);
  }

  public resolveRealPath(path: string): string {
    return fs.realpathSync(path);
  }

  public readFile(path: string) {
    return fs.readFileSync(path, 'utf8');
  }

  public pathContent(path: string): string[] {
    return fs.readdirSync(path);
  }

  public isFile(path: string): boolean {
    return fs.statSync(path).isFile();
  }

  public isDirectory(path: string): boolean {
    try {
      return fs.statSync(path).isDirectory();
    } catch (e) {
      return false;
    }
  }

  public joinPaths(...paths: string[]): string {
    return path.join(...paths);
  }

  public getExecutionPath(): string {
    return process.cwd();
  }

  public emptyDirectoryContent(path: string): void {
    fs.emptyDirSync(path);
  }
}
