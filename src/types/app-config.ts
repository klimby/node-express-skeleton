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
}
