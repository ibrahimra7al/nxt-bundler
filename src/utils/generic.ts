import { Service } from 'typedi';
import chalk, { ForegroundColor } from 'chalk';

@Service()
export default class Generic {
  public get console() {
    return {
      color: null,
      withColors: function (color: ForegroundColor): typeof this {
        (this.color as ForegroundColor | null) = color;
        return this;
      },
      log: function (message: string): void {
        if (this.color) message = (chalk[this.color] as any)(message);
        console.log(message);
      }
    };
  }
}
