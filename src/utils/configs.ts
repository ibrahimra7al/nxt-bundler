import { Service } from 'typedi';

@Service()
export default class Configs {
  public get environment(): 'prod' | 'dev' {
    return this.get('NODE_ENV') === 'development' ? 'dev' : 'prod';
  }

  public canRun(env: 'prod' | 'dev' | 'both'): boolean {
    return env === 'both' || env === this.environment;
  }

  public get(configName: string): string {
    //this should cover globals - passed argv - enviroment variables
    return process.env[configName] || '';
  }
}
