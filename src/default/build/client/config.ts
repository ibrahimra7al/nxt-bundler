import Configs from '../../../core/config';
import Loader from '../../../core/loader';
import Plugin from '../../../core/plugin';
import plugins from './plugins';
import loaders from './loaders';
import Util from '../../../utils';

export default class MainConfigs extends Configs {
  protected _name: string = 'Client Build';
  protected _desc: string =
    'This Object define the webpack bundle configuration for nxt-app';
  protected plugins: Plugin[] = plugins.map((p) => new p());
  protected loaders: Loader<any>[] = loaders.map((l) => new l());
  protected entryFiles: any = this.getEntryFiles();
  protected output: any = this.getOutputFiles();

  protected context = this.getContext();
  protected aliases = this.getAliases();

  protected getEntryFiles() {
    return Util.configs.environment === 'dev'
      ? [
          'webpack-hot-middleware/client?path=/__webpack_hmr&reload=true',
          Util.nxt.resolvePathRelativeToProject('entry')
        ]
      : [Util.nxt.resolvePathRelativeToProject('entry')];
  }

  protected getContext() {
    return Util.nxt.resolvePathRelativeToProject('./');
  }

  protected getOutputFiles() {
    return {
      path: Util.nxt.resolvePathRelativeToProject('./build'),
      filename: 'static/js/[name].[contenthash:8].js',
      chunkFilename: 'static/js/[name].[contenthash:8].chunk.js'
    };
  }

  protected getAliases() {
    return {
      '@build': Util.nxt.resolvePathRelativeToProject('./build')
    };
  }
}
