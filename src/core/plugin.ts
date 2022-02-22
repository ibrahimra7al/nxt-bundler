import webpack from 'webpack';
import Utils from '../utils';

export default abstract class Plugin {
  protected abstract _name: string;
  protected abstract _desc: string;
  protected _env: 'dev' | 'prod' | 'both' = 'both';
  protected _isOptimization: boolean = false;
  protected _isResolve: boolean = false;

  public abstract init():
    | webpack.WebpackPluginInstance
    | webpack.WebpackPluginInstance[];

  public get name(): string {
    return this._name;
  }

  public get desc(): string {
    return this._desc;
  }

  public get isOptimization(): boolean {
    return this._isOptimization;
  }

  public get isResolve(): boolean {
    return this._isResolve;
  }

  public build():
    | webpack.WebpackPluginInstance
    | webpack.WebpackPluginInstance[]
    | null {
    if (Utils.configs.canRun(this._env)) return this.init();
    return null;
  }
}
