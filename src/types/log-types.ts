/**
 * Application logger
 */
export interface AppLog {

  /**
   * Init logger and set config. Run in index
   */
  init(): void;

  /**
   * Send informational log.
   * Informational: informational messages
   * @param message log message
   * @param ctx optional log context
   */
  info(message: string, ctx?: object): void;


  /**
   * Send notice log.
   * Notice: normal but significant condition
   * @param message log message
   * @param ctx optional log context
   */
  notice(message: string, ctx?: object): void;

  /**
   * Send warning log.
   * Warning: warning conditions
   * @param message log message
   * @param ctx optional log context
   */
  warning(message: string, ctx?: object): void;

  /**
   * Send warning log.
   * Error: error conditions
   * @param message log message
   * @param ctx optional log context
   */
  error(message: string, ctx?: object): void;

  /**
   * Send critical log
   * Critical: critical conditions
   * @param message log message
   * @param ctx optional log context
   */
  critical(message: string, ctx?: object): void;

  /**
   * Send emergency log
   * Emergency: system is unusable
   * @param message log message
   * @param ctx optional log context
   */
  emergency(message: string, ctx?: object): void;
}
