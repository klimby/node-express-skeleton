/**
 * Application logger
 */
export interface AppLog {

  /**
   *
   * @param message log message
   */
  info(message: string, ctx?: object): void;
}
