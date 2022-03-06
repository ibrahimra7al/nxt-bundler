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
  protected _name: string = 'TsconfigPasthsPlugin';
  protected _desc: string = 'Plugin tos resolve typescript aliases';
  protected _isResolve: boolean = true;

  public init(): webpack.WebpackPluginInstance {
    const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
    return new TsconfigPathsPlugin({
      configFile: tsConfigFile
    });
  }
}

export class shit extends Plugin {
  protected _name: string = 'TsconfigPathsPlugin';
  protected _desc: string = 'Plugin to resolve typescript aliases';
  protected _isResolve: boolean = true;

  public init(): webpack.WebpackPluginInstance {
    const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
    var path = require('path');

    function MyConventionResolver(source?: any, target?: any) {}

    MyConventionResolver.prototype.apply = function (resolver?: any) {
      resolver
        .getHook('resolve')
        .tapAsync(
          { name: 'MyConventionResolver' },
          function (request: any, resolveContext: any, callback: any) {
            if (request.request[0] === '#') {
              console.log('shit');
              var req = request.request.substr(1);
              var obj = Object.assign({}, request, {
                request: req + '/' + path.basename(req) + '.js'
              });
              // return resolver.doResolve(target, obj, null, resolveContext, callback);
            }
            callback();
          }
        );
    };
    return new (MyConventionResolver as any)();
  }
}

export default [WebpackIgnoreModules, TsTypeChecker, shit, TsPathsPlugin];
