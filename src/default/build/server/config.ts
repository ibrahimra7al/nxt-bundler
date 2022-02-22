import Configs from '../../../core/config';
import Loader from '../../../core/loader';
import Plugin from '../../../core/plugin';
import plugins from './plugins';
import loaders from './loaders';
import Util from '../../../utils';
import nodeExternals from 'webpack-node-externals';

export default class MainConfigs extends Configs {
  protected _name: string = 'Server Build';
  protected _desc: string =
    'This Object define the webpack bundle configuration for nxt-server';
  protected plugins: Plugin[] = plugins.map((p) => new p());
  protected loaders: Loader<any>[] = loaders.map((l) => new l());
  protected entryFiles: any = this.getEntryFiles();
  protected output: any = this.getOutputFiles();
  protected target: string = 'node';
  protected ignoreWarnings: RegExp[] = [/^(?!CriticalDependenciesWarning$)/];
  protected externals = [nodeExternals()];
  protected externalsPresets = { node: true };
  protected context = this.getContext();

  protected getEntryFiles() {
    return {
      'server.bundle': Util.nxt.resolvePathRelativeToServer('./src/main.ts')
    };
  }

  protected getContext() {
    return Util.nxt.resolvePathRelativeToServer('./');
  }

  protected getOutputFiles() {
    return {
      filename: '[name].js',
      path: Util.nxt.resolvePathRelativeToServer('./build')
    };
  }
}
