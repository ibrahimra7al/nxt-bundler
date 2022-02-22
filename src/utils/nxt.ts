import { Inject, Service } from 'typedi';
import path from 'path';
import FileSystem from './filesystem';

@Service()
export default class NXT {
  @Inject()
  protected readonly filesystem: FileSystem;

  protected readonly nxtServerPackage: string = '@atypon/nxt-server';

  public resolvePathRelativeToServer(relativePath: string): string {
    return this.filesystem.joinPaths(
      this.filesystem.getExecutionPath(),
      `./node_modules/${this.nxtServerPackage}/`,
      relativePath
    );
  }

  public resolvePathRelativeToProject(relativePath: string): string {
    return this.filesystem.joinPaths(
      this.filesystem.getExecutionPath(),
      relativePath
    );
  }
}
