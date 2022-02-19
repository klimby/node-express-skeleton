import { Locales } from './common-types';

export enum NodeEnv {
  Production='production',
  Development='development',
  Testing='testing',
}

/**
 * Application config
 */
export interface AppConfig {

  /**
   * Server port. Default 3000
   */
  readonly port: number;

  /**
   * Is production mode
   */
  readonly isProduction: boolean;

  /**
   * Is development mode
   */
  readonly isDevelopment: boolean;

  /**
   * Is testing mode
   */
  readonly isTesting: boolean;

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

  /**
   * App locale
   */
  readonly locale: Locales;

}

/**
 * Log file content format
 */
export enum LogFileFormat {
  /**
   * String as json
   */
  Json = 'json',
  /**
   * Simple string
   */
  Text = 'text'
}

/**
 * Log channels
 */
export enum LogChannel {

  /**
   * Send log to console
   */
  Console = 'console',

  /**
   * Write log files
   */
  File = 'file'
}

/**
 * Logging config
 */
export interface LogConfig {

  /**
   * Log channels
   */
  channels: LogChannel[];

  /**
   * Log rotation in days
   */
  dayRotation: number;

  /**
   * Log file content format - text or json
   */
  logFileContentFormat: LogFileFormat;

  /**
   * Use UTC timestamp for log file
   */
  utc: boolean;

}
