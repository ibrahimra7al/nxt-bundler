import { Container, Inject, Service } from 'typedi';
import Configs from './configs';
import FileSystem from './filesystem';
import NXT from './nxt';
import Generic from './generic';
import Store from './store';

@Service()
export class Utils {
  @Inject()
  public fileSystem: FileSystem;

  @Inject()
  public configs: Configs;

  @Inject()
  public nxt: NXT;

  @Inject()
  public generic: Generic;

  @Inject()
  public store: Store;
}

export default Container.get(Utils);
