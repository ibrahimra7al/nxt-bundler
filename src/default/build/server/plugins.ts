import webpack from 'webpack';
import Plugin from '../../../core/plugin';
import utils from '../../../utils';

const tsConfigFile: string =
  utils.nxt.resolvePathRelativeToServer('tsconfig.json');

export class WebpackIgnoreModules extends Plugin {
  protected _name: string = 'Webpack Ignore Plugins';
  protected _desc: string =
    'ignores files that are imported {used in nestjs default}';

  public init(): webpack.WebpackPluginInstance {
    const checkResource = (resource: any) => {
      const lazyImports = [
        '@nestjs/microservices',
        'cache-manager',
        'class-validator',
        'class-transformer'
      ];
      if (!lazyImports.includes(resource)) {
        return false;
      }
      try {
        require.resolve(resource, {
          paths: [process.cwd()]
        });
      } catch (err) {
        return true;
      }
      return false;
    };
    return new webpack.IgnorePlugin({
      checkResource
    });
  }
}

export class TsTypeChecker extends Plugin {
  protected _name: string = 'ForkTsCheckerWebpackPlugins';
  protected _desc: string =
    'runs typescript type checker on a separate process';

  public init(): webpack.WebpackPluginInstance {
    const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
    return new ForkTsCheckerWebpackPlugin({
      typescript: {
        configFile: tsConfigFile
      }
    });
  }
}

export class TsPathsPlugin extends Plugin {
  protected _name: string = 'TsconfigPathsPlugin';
  protected _desc: string = 'Plugin to resolve typescript aliases';

  public init(): webpack.WebpackPluginInstance {
    const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

    return new TsconfigPathsPlugin({
      configFile: tsConfigFile
    });
  }
}

export default [WebpackIgnoreModules, TsTypeChecker];
