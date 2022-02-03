import config from 'config';
import dotenv from 'dotenv';
import {
  AppConfig,
  LogChannel,
  LogConfig,
  LogFileFormat,
  NodeEnv,
}             from '../types/app-config';

class ConfigProvider implements AppConfig {

  /**
   * Server port
   */
  #port = 3000;

  /**
   * Router prefix
   */
  #routePrefix = '/api';

  /**
   * App name
   */
  #appName = 'app';

  /**
   * App version
   */
  #version = '0.0.0';

  /**
   * Logger configuration
   */
  #logs: LogConfig = {
    channels: [LogChannel.Console, LogChannel.File],
    dayRotation: 5,
    logFileContentFormat: LogFileFormat.Json,
    utc: false,
  };

  /**
   * Node env
   */
  #nodeEnv: NodeEnv = NodeEnv.Production;

  constructor() {
    dotenv.config();
    this.#setNodeEnv();
  }

  /**
   * Get logs config
   */
  get logs(): LogConfig {
    return this.#logs;
  }

  /**
   * App name
   */
  get appName(): string {
    return this.#appName;
  }

  /**
   * App version
   */
  get version(): string {
    return this.#version;
  }

  /**
   * Server port. Default 3000
   */
  get port(): number {
    return this.#port;
  }

  /**
   * Router prefix. Default '/api'.
   */
  get routePrefix(): string {
    return this.#routePrefix;
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

  /**
   * Init config. Use in index before all or in tests
   * @param appConfig partial config (for test cases)
   */
  init(appConfig?: Partial<AppConfig>) {
    this.#setPort();
    this.#setPrefix();
    this.#setAppName();
    this.#setVersion();
    this.#setLogs(appConfig);
  }

  /**
   * Set logs config
   * @param appConfig
   */
  #setLogs(appConfig?: Partial<AppConfig>): void {

   if(appConfig?.logs?.channels && Array.isArray(appConfig?.logs?.channels)) {
     this.#logs.channels = appConfig.logs.channels;
   } else if(config.has('logs.channels') && Array.isArray(config.get('logs.channels'))) {
     const channels = config.get('logs.channels') as LogChannel[];
     this.#logs.channels = [];
     for (const ch of [LogChannel.File, LogChannel.Console]) {
       if(channels.includes(ch)) {
         this.#logs.channels.push(ch);
       }
     }
   }

    if (appConfig?.logs?.dayRotation) {
      this.#logs.dayRotation = appConfig.logs.dayRotation;
    } else if (config.has('logs.dayRotation')) {
      this.#logs.dayRotation = config.get('logs.dayRotation') as number;
    }

    let logFileContentFormat: LogFileFormat = LogFileFormat.Text;
    if (appConfig?.logs?.logFileContentFormat) {
      logFileContentFormat = appConfig.logs.logFileContentFormat;
    } else if (config.has('logs.logFileContentFormat')) {
      logFileContentFormat = config.get('logs.logFileContentFormat');
    }
    this.#logs.logFileContentFormat = logFileContentFormat === LogFileFormat.Text ? LogFileFormat.Text : LogFileFormat.Json;

    if (appConfig?.logs && 'utc' in appConfig.logs) {
      this.#logs.utc = appConfig.logs.utc;
    } else if (config.has('logs.utc')) {
      this.#logs.utc = !!config.get('logs.utc');
    }

  }

  #setAppName(): void {
    if (process.env.npm_package_name) {
      this.#appName = process.env.npm_package_name;
    }
  }

  #setVersion(): void {
    if (process.env.npm_package_version) {
      this.#version = process.env.npm_package_version;
    }
  }

  #setPort(): void {
    if (process.env.PORT) {
      this.#port = +process.env.PORT;
    }
  }

  #setPrefix(): void {
    if (config.has('routePrefix')) {
      this.#routePrefix = config.get('routePrefix');
    }
  }

  /**
   * Set env
   */
  #setNodeEnv(): void {
    if (process.env.NODE_ENV === NodeEnv.Development || process.env.NODE_ENV === NodeEnv.Testing) {
      this.#nodeEnv = process.env.NODE_ENV;
    }
  }

}

/**
 * Application config
 */
const Config: AppConfig = new ConfigProvider();

export default Config;

