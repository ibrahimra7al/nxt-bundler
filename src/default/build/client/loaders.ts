import Loader from '../../../core/loader';
import utils from '../../../utils';
import * as MiniCssExtractPlugin from 'mini-css-extract-plugin';

const tsRegex: RegExp = /(?<!spec)\.(ts|tsx)$/;
const scssRegex: RegExp = /\.s?css$/;
const scssGlobalRegex: RegExp = /\.global\.s?css$/;

const tsConfigFile: string =
  utils.nxt.resolvePathRelativeToProject('tsconfig.json');

export class tsLoader extends Loader<{
  transpileOnly: boolean;
  configFile: string;
}> {
  protected _name: string = 'ts-loader';
  protected _desc: string = 'compiles ts files & loads them';
  protected _regex: RegExp = tsRegex;
  protected _excludeRegex: RegExp = /node_modules/;

  public init() {
    return {
      loader: this.name,
      options: {
        configFile: tsConfigFile,
        transpileOnly: false
      }
    };
  }
}

export class babelLoader extends Loader<{
  cacheDirectory: boolean;
  compact: boolean;
}> {
  protected _name: string = 'babel-loader';
  protected _desc: string = 'compiles ts files & loads them';
  protected _regex: RegExp = tsRegex;

  public init() {
    return {
      loader: this.name,
      options: {
        cacheDirectory: utils.configs.environment === 'dev',
        compact: utils.configs.environment === 'prod'
      }
    };
  }
}

export class styleLoader extends Loader<{}> {
  protected _name: string = 'style-loader';
  protected _desc: string = 'loads style as style tag';
  protected _regex: RegExp = scssRegex;
  protected _env: 'dev' | 'prod' | 'both' = 'dev';
  protected _excludeRegex: RegExp | undefined = scssGlobalRegex;

  public init() {
    return {
      loader: this.name,
      options: {}
    };
  }
}

export class extractCssLoader extends Loader<{}> {
  protected _name: string = MiniCssExtractPlugin.loader;
  protected _desc: string = 'extract css into css files';
  protected _regex: RegExp = scssRegex;
  protected _env: 'dev' | 'prod' | 'both' = 'prod';
  protected _excludeRegex: RegExp | undefined = scssGlobalRegex;

  public init() {
    return {
      loader: this.name,
      options: {}
    };
  }
}

export class cssLoader extends Loader<{
  localsConvention: string;
  modules: boolean;
}> {
  protected _name: string = 'css-loader';
  protected _desc: string = 'loads scss as string';
  protected _regex: RegExp = scssRegex;
  protected _excludeRegex: RegExp = scssGlobalRegex;

  public init() {
    return {
      loader: this.name,
      options: {
        localsConvention: 'camelCase',
        modules: true
      }
    };
  }
}

export class postCssLoader extends Loader<{
  ident: string;
  plugins: () => void;
}> {
  protected _name: string = 'postcss-loader';
  protected _desc: string = 'parse css and apply a couple of plugins';
  protected _regex: RegExp = scssRegex;
  protected _excludeRegex: RegExp | undefined = scssGlobalRegex;

  public init() {
    return {
      loader: this.name,
      options: {
        ident: 'postcss',
        plugins: () => [
          require('postcss-flexbugs-fixes'),
          require('autoprefixer')({
            flexbox: 'no-2009'
          })
        ]
      }
    };
  }
}

export class scssLoader extends Loader<{}> {
  protected _name: string = 'sass-loader';
  protected _desc: string = 'loads scss file and compiles them into css';
  protected _regex: RegExp = scssRegex;
  protected _excludeRegex: RegExp | undefined = scssGlobalRegex;

  public init() {
    return {
      loader: this.name,
      options: {}
    };
  }
}

export class importGlobLoader extends Loader<{}> {
  protected _name: string = 'import-glob-loader';
  protected _desc: string = 'enables using glob patterns with imports';
  protected _regex: RegExp = scssRegex;
  protected _excludeRegex: RegExp | undefined = scssGlobalRegex;
  public init() {
    return {
      loader: this.name,
      options: {}
    };
  }
}

export class styleLoaderForGlobalScss extends styleLoader {
  protected _regex: RegExp = scssGlobalRegex;
  protected _excludeRegex: RegExp | undefined = undefined;
}

export class extractCssLoaderForGlobalScss extends extractCssLoader {
  protected _regex: RegExp = scssGlobalRegex;
  protected _excludeRegex: RegExp | undefined = undefined;
}

export class cssLoaderForGlobalScss extends Loader<{}> {
  protected _name: string = 'css-loader';
  protected _desc: string = 'loads scss as string';
  protected _regex: RegExp = scssGlobalRegex;
  protected _excludeRegex: RegExp | undefined = undefined;

  public init() {
    return {
      loader: this.name,
      options: {}
    };
  }
}

export class postCssLoaderForGlobalScss extends postCssLoader {
  protected _regex: RegExp = scssGlobalRegex;
  protected _excludeRegex: RegExp | undefined = undefined;
}

export class scssLoaderForGlobalScss extends scssLoader {
  protected _regex: RegExp = scssGlobalRegex;
  protected _excludeRegex: RegExp = undefined as any;
}

export class importGlobLoaderForGlobalScss extends importGlobLoader {
  protected _regex: RegExp = scssGlobalRegex;
  protected _excludeRegex: RegExp = undefined as any;
}

/* [Attention] -> ordering matters in loaders */
/* first -> last */

export default [
  tsLoader,
  babelLoader,
  importGlobLoaderForGlobalScss,
  scssLoaderForGlobalScss,
  postCssLoaderForGlobalScss,
  cssLoaderForGlobalScss,
  extractCssLoaderForGlobalScss,
  styleLoaderForGlobalScss,
  importGlobLoader,
  scssLoader,
  postCssLoader,
  cssLoader,
  extractCssLoader,
  styleLoader
];
