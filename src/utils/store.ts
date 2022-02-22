import { Service } from 'typedi';

@Service()
export default class Store {
  protected storeObj: { [key: string]: any } = {};

  public get(key: string): any {
    return this.storeObj[key];
  }

  public put(key: string, value: any): void {
    this.storeObj[key] = value;
  }
}
