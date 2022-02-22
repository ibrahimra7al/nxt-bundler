import ServerConfigs from './server/config';
import ConfigsController from '../../core';

export default new ConfigsController(() => new ServerConfigs());
