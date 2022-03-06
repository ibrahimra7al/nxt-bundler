import Loader from '../../../core/loader';
import utils from '../../../utils';

const tsRegex: RegExp = /(?<!spec)\.(ts|tsx)$/;
const pugPugRegex: RegExp = /.pug$/;
const scssRegex: RegExp = /\.s?css$/;
const tsConfigFile: string =
  utils.nxt.resolvePathRelativeToServer('tsconfig.json');

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
  presets: any[];
}> {
  protected _name: string = 'babel-loader';
  protected _desc: string = 'compiles ts files & loads them';
  protected _regex: RegExp = tsRegex;
  protected _excludeRegex: RegExp = /node_modules/;

  public init() {
    return {
      loader: this.name,
      options: {
        presets: [
          [
            '@babel/preset-env',
            {
              targets: { node: 'current' }
            }
          ]
        ],
        plugins: [
          [
            'css-modules-transform',
            {
              camelCase: true,
              extensions: ['.css', '.scss'],
              generateScopedName: '[hash:base64]',
              ignore: 'src/styles'
            }
          ],
          'dynamic-import-node'
        ]
      }
    };
  }
}

export class cssLoader extends Loader<{
  localsConvention: string;
  modules: boolean;
}> {
  protected _name: string = 'css-loader';
  protected _desc: string = 'loads css files as css modules';
  protected _regex: RegExp = scssRegex;

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

export class scssLoader extends Loader<{}> {
  protected _name: string = 'sass-loader';
  protected _desc: string = 'loads scss files as css file';
  protected _regex: RegExp = scssRegex;

  public init() {
    return {
      loader: this.name,
      options: {}
    };
  }
}

export class importGlobLoader extends Loader<{}> {
  protected _name: string = 'import-glob-loader';
  protected _desc: string = 'parse glob imports lime file/*.scss';
  protected _regex: RegExp = scssRegex;

  public init() {
    return {
      loader: this.name,
      options: {}
    };
  }
}
export class pugLoader extends Loader<{}> {
  protected _name: string = 'pug-loader';
  protected _desc: string = 'compiles pug files & loads them';
  protected _regex: RegExp = pugPugRegex;

  public init() {
    const PugPlugin = require('pug-plugin');
    return {
      loader: PugPlugin.loader,
      options: {}
    };
  }
}

/* [Attention] -> ordering matters in loaders */
/* first -> last */

export default [
  tsLoader,
  babelLoader,
  importGlobLoader,
  scssLoader,
  cssLoader,
  pugLoader
];
