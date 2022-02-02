import dotenv        from 'dotenv';
import config        from 'config';
import {
  AppConfig,
  LogConfig,
  LogFileFormat,
} from '../types/app-config';


class ConfigProvider implements AppConfig{

  /**
   * Server port
   */
  readonly port: number;

  /**
   * Router prefix
   */
  readonly routePrefix: string;

  /**
   * Is production mode
   */
  readonly isProduction: boolean;

  /**
   * App name
   */
  readonly appName: string;

  /**
   * App version
   */
  readonly version: string;


  /**
   * Logger configuration
   */
  readonly logs: LogConfig;

  constructor(
  ) {
    dotenv.config();
    const port = config.get('port') as number ?? 3000;
    this.port = process.env.PORT ? +process.env.PORT : port;
    this.routePrefix = config.get('routePrefix') ?? '/api';
    this.isProduction = process.env.NODE_ENV !== 'development' && !!config.get('devMode');
    this.appName = process.env.npm_package_name ?? '';
    this.version = process.env.npm_package_version ?? '';
    const dayRotation: number = config.get('logs.dayRotation') as number ?? 5;
    const logFileContentFormat: LogFileFormat = config.get('logs.logFileContentFormat') === LogFileFormat.Text ? LogFileFormat.Text : LogFileFormat.Json;
    const utc: boolean = config.has('logs.utc') ? !!config.get('logs.utc') : false;
    this.logs = {dayRotation, logFileContentFormat, utc};
  }
}

/**
 * Application config
 */
const Config: AppConfig = new ConfigProvider();

export default Config;

