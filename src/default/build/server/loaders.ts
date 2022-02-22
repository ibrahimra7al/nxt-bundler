import Loader from '../../../core/loader';
import utils from '../../../utils';

const tsRegex: RegExp = /(?<!spec)\.(ts|tsx)$/;
const pugPugRegex: RegExp = /.pug$/;
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

export class pugLoader extends Loader<{}> {
  protected _name: string = 'pug-loader';
  protected _desc: string = 'compiles pug files & loads them';
  protected _regex: RegExp = pugPugRegex;

  public init() {
    return {
      loader: this.name,
      options: {
        sourceMap: true,
        url: false
      }
    };
  }
}

/* [Attention] -> ordering matters in loaders */
/* first -> last */

export default [tsLoader, pugLoader];
