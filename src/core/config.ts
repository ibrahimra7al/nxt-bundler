import webpack, { Configuration } from 'webpack';
import Loader, { WebpackLoaderObject } from './loader';
import Plugin from './plugin';
import Utils from '../utils';

type LoaderRules = Array<{
  use: Array<WebpackLoaderObject<any>>;
  test: RegExp | string;
  exclude: RegExp | undefined;
}>;

export default abstract class Configs {
  protected abstract _name: string;
  protected abstract _desc: string;
  protected abstract entryFiles: string[] | { [key: string]: string };
  protected abstract output: { filename: string; path: string };
  protected abstract plugins: Plugin[];
  protected abstract loaders: Loader<any>[];
  protected devtool: string;
  protected enableOptimization: boolean;
  protected watch: boolean;
  protected target: string | undefined;
  protected ignoreWarnings: RegExp[] | undefined;
  protected externals: Configuration['externals'] | undefined;
  protected externalsPresets: Configuration['externalsPresets'] | undefined;
  protected context: Configuration['context'] | undefined;
  protected aliases: { [index: string]: string | false | string[] } | undefined;

  public get name(): string {
    return this._name;
  }
  public get desc(): string {
    return this._desc;
  }

  protected get mode(): 'development' | 'production' {
    return Utils.configs.environment === 'dev' ? 'development' : 'production';
  }

  constructor() {
    this.devtool =
      this.mode === 'development'
        ? 'inline-cheap-module-source-map'
        : 'source-map';
    this.enableOptimization = this.mode === 'production';
    this.watch = this.mode === 'development';
  }

  protected buildLoaders(): LoaderRules {
    return this.loaders.reverse().reduce((prev: LoaderRules, current) => {
      const loaderConfigs = current.build();
      if (!loaderConfigs) return prev;
      const loadersGroup = prev.find(
        (a) => a.test.toString() === current.regex.toString()
      );
      if (loadersGroup) {
        loadersGroup.use.push(loaderConfigs);
        return prev;
      }
      return [
        ...prev,
        {
          test: current.regex,
          use: [loaderConfigs],
          exclude: current.excludeRegex
        }
      ];
    }, []);
  }

  protected buildPlugins(): webpack.WebpackPluginInstance[] {
    return this.plugins
      .filter((p) => !p.isOptimization)
      .filter((p) => !p.isResolve)
      .map((p) => p.build())
      .filter((p) => Boolean(p))
      .reduce((prev: any, current) => {
        if (current instanceof Array) return [...prev, ...current];
        else return [...prev, current];
      }, []) as any;
  }

  protected buildMinimizerPlugins(): webpack.WebpackPluginInstance[] {
    return this.plugins
      .filter((p) => p.isOptimization)
      .map((p) => p.build())
      .filter((p) => Boolean(p)) as any;
  }

  protected buildResolvePlugins(): webpack.ResolvePluginInstance[] {
    return this.plugins
      .filter((p) => p.isResolve)
      .map((p) => p.build())
      .filter((p) => Boolean(p)) as any;
  }

  public build(): Configuration {
    return {
      mode: this.mode,
      entry: this.entryFiles,
      devtool: this.devtool,
      module: { rules: this.buildLoaders() },
      target: this.target,
      performance: {
        hints: false
      },
      watch: this.mode === 'development' && this.watch,
      ignoreWarnings: this.ignoreWarnings,
      externals: this.externals,
      externalsPresets: this.externalsPresets,
      watchOptions: {
        ignored: ['node_modules']
      },
      plugins: this.buildPlugins(),
      optimization: {
        minimize: this.enableOptimization,
        minimizer: this.buildMinimizerPlugins()
      },
      stats: 'minimal',
      resolve: {
        plugins: this.buildResolvePlugins(),
        alias: this.aliases,
        extensions: ['', '.js', '.json', '.jsx', '.ts', '.tsx', '.pug']
      },
      context: this.context,
      output: this.output
    };
  }
}
