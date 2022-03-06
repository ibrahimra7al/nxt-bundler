import webpack from 'webpack';
import Plugin from '../../../core/plugin';
import { ReactLoadablePlugin as ReactLoadableWebpackPlugin } from 'react-loadable/webpack';
import * as ManifestWebpackPlugin from 'webpack-manifest-plugin';
import MiniCssExtractWebpackPlugin from 'mini-css-extract-plugin';
import ErrorOverlayWebpackPlugin from 'error-overlay-webpack-plugin';
import CaseSensitivePathsWebpackPlugin from 'case-sensitive-paths-webpack-plugin';

export class HotModuleReplacementPlugin extends Plugin {
  protected _name: string = 'HotModuleReplacementPlugin';
  protected _desc: string = 'Enable hot module replacement in development mode';
  protected _env: 'dev' | 'prod' | 'both' = 'dev';

  public init(): webpack.WebpackPluginInstance {
    return new webpack.HotModuleReplacementPlugin();
  }
}

export class CaseSensitivePathsPlugin extends Plugin {
  protected _name: string = 'CaseSensitivePathsPlugin';
  protected _desc: string =
    'plugin enforces the entire path of all required modules match the exact case of the actual path on disk';
  protected _env: 'dev' | 'prod' | 'both' = 'dev';

  public init(): webpack.WebpackPluginInstance {
    return new CaseSensitivePathsWebpackPlugin();
  }
}

export class ErrorOverlayPlugin extends Plugin {
  protected _name: string = 'ErrorOverlayPlugin';
  protected _desc: string =
    'plugin displays an error overlay in your application';
  protected _env: 'dev' | 'prod' | 'both' = 'dev';

  public init(): webpack.WebpackPluginInstance {
    return new ErrorOverlayWebpackPlugin();
  }
}

export class MiniCssExtractPlugin extends Plugin {
  protected _name: string = 'MiniCssExtractPlugin';
  protected _desc: string = 'extract all loaded css into separate css files';
  protected _env: 'dev' | 'prod' | 'both' = 'prod';

  public init(): webpack.WebpackPluginInstance {
    return new MiniCssExtractWebpackPlugin();
  }
}

export class ManifestPlugin extends Plugin {
  protected _name: string = 'ManifestPlugin';
  protected _desc: string = 'add all modules to manifest.json';

  public init(): webpack.WebpackPluginInstance {
    return new (ManifestWebpackPlugin as any)({
      fileName: 'asset-manifest.json'
    });
  }
}

export class ReactLoadablePlugin extends Plugin {
  protected _name: string = 'ReactLoadablePlugin';
  protected _desc: string =
    'loader to extract all loadable components meta data';

  public init(): webpack.WebpackPluginInstance {
    return new ReactLoadableWebpackPlugin({
      filename: 'build/react-loadable.json'
    }) as any;
  }
}

export default [
  HotModuleReplacementPlugin,
  CaseSensitivePathsPlugin,
  ErrorOverlayPlugin,
  MiniCssExtractPlugin,
  ManifestPlugin,
  ManifestPlugin,
  ReactLoadablePlugin
];
