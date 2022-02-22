import { Configuration } from 'webpack';
import Util from '../utils';
import Configs from './config';

export default class ConfigsController {
  protected _configs: (() => Configs)[];

  constructor(...configs: (() => Configs)[]) {
    this._configs = configs;
  }

  public get configs(): Configs[] {
    return this._configs.map((c) => c());
  }

  public init(): Configuration[] {
    return this.configs.map((c) => c.build());
  }
}
