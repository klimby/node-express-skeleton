import config      from 'config';
import dotenv      from 'dotenv';
import { Service } from 'typedi';
import { Locales } from '../types/common-types';
import {
  AppConfig,
  LogChannel,
  LogConfig,
  LogFileFormat,
  NodeEnv,
} from '../types/config-types';

@Service()
export class ConfigService implements AppConfig{

  /**
   * Server port. Default 3000
   */
  readonly port: number = 3000;

  /**
   * App name
   */
  readonly appName: string = 'app';

  /**
   * App version
   */
  readonly version: string = '0.0.0';

  /**
   * Node env
   */
  #nodeEnv: NodeEnv = NodeEnv.Production;

  /**
   * Logger configuration
   */
  readonly logs: LogConfig = {
    channels: [LogChannel.Console, LogChannel.File],
    dayRotation: 5,
    logFileContentFormat: LogFileFormat.Json,
    utc: false,
  };

  /**
   * App locale
   */
  readonly locale: Locales = Locales.en;

  constructor() {
    dotenv.config();
    if (process.env.NODE_ENV === NodeEnv.Development || process.env.NODE_ENV === NodeEnv.Testing) {
      this.#nodeEnv = process.env.NODE_ENV;
    }

    const appName = process.env.HOSTNAME ?? process.env.npm_package_name;
    if (appName) {
      this.appName = appName;
    }

    if (process.env.npm_package_version) {
      this.version = process.env.npm_package_version;
    }
    if (process.env.NODE_SERVER_PORT) {
      this.port = +process.env.NODE_SERVER_PORT;
    }
    if (process.env.LOCALE) {
      const locale = process.env.LOCALE.toLowerCase();
      this.locale = locale === Locales.ru ? Locales.ru : Locales.en;
    }
    if (config.has('logs')) {
      this.logs = config.get('logs');
    }
  }

  /**
   * Is production mode
   */
  get isProduction(): boolean {
    return this.#nodeEnv === NodeEnv.Production;
  }

  /**
   * Is development mode
   */
  get isDevelopment(): boolean {
    return this.#nodeEnv === NodeEnv.Development;
  }


  /**
   * Is testing mode
   */
  get isTesting(): boolean {
    return this.#nodeEnv === NodeEnv.Testing;
  }

}
