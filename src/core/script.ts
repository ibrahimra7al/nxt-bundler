export default abstract class Script {
  protected abstract _name: string;
  protected abstract _desc: string;

  public abstract init(): Promise<void>;

  public get name(): string {
    return this._name;
  }

  public get desc(): string {
    return this._desc;
  }
}
