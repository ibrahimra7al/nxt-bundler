export default abstract class Helper<In, Out> {
  protected abstract _name: string;
  protected abstract _desc: string;

  public abstract apply(input: In): Out;

  public get name(): string {
    return this._name;
  }
  public get desc(): string {
    return this._desc;
  }
}
