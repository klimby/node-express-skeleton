/**
 * Application config
 */
export interface AppConfig {

  /**
   * Server port. Default 3000
   */
  readonly port: number;

  /**
   * Router prefix. Default '/api'.
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
}


export enum LogFileFormat {
  Json = 'json',
  Text = 'text'
}

export interface LogConfig {

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
