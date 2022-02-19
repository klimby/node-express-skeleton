import { ConfigService } from '../../src/providers/config.service';
import {
  LogChannel,
  LogConfig,
  LogFileFormat,
  NodeEnv,
}                        from '../../src/types/config-types';

export class ConfigServiceStub {


  /**
   * Server port. Default 3000
   */
  port = 3000;

  /**
   * App name
   */
  appName = 'app';

  /**
   * App version
   */
  version = '0.0.0';

  nodeEnv: NodeEnv = NodeEnv.Testing;

  logs: LogConfig = {
    channels: [],
    dayRotation: 5,
    logFileContentFormat: LogFileFormat.Json,
    utc: false,
  };


  static create(config: Partial<ConfigServiceStub>, logs: Partial<LogConfig> = {}): ConfigService {
    let o = new ConfigServiceStub();
    o = Object.assign(o, config);
    o.logs = Object.assign(o.logs, logs);
    return o as unknown as ConfigService;
  }

  /**
   * Is production mode
   */
  get isProduction(): boolean {
    return this.nodeEnv === NodeEnv.Production;
  }

  /**
   * Is development mode
   */
  get isDevelopment(): boolean {
    return this.nodeEnv === NodeEnv.Development;
  }


  /**
   * Is testing mode
   */
  get isTesting(): boolean {
    return this.nodeEnv === NodeEnv.Testing;
  }
}
