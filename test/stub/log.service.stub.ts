import { LogService } from '../../src/providers/log.service';

export class LogServiceStub {

  private _messages: string[] = [];

  static create(): LogService {
    return new LogServiceStub() as unknown as LogService;
  }

  /**
   * Send informational log.
   * Informational: informational messages
   * @param message log message
   * @param ctx optional log context
   */
  info(message: string, ctx?: object) {
    this._messages.push(message);
  }

  /**
   * Send notice log.
   * Notice: normal but significant condition
   * @param message log message
   * @param ctx optional log context
   */
  notice(message: string, ctx?: object): void {
    this._messages.push(message);
  }

  /**
   * Send warning log.
   * Warning: warning conditions
   * @param message log message
   * @param ctx optional log context
   */
  warning(message: string, ctx?: object): void {
    this._messages.push(message);
  }

  /**
   * Send warning log.
   * Error: error conditions
   * @param message log message
   * @param ctx optional log context
   */
  error(message: string, ctx?: object): void {
    this._messages.push(message);
  }

  /**
   * Send emergency log
   * Emergency: system is unusable
   * @param message log message
   * @param ctx optional log context
   */
  emergency(message: string, ctx?: object): void {
    this._messages.push(message);
  }

  /**
   * Send critical log
   * Critical: critical conditions
   * @param message log message
   * @param ctx optional log context
   */
  critical(message: string, ctx?: object): void {
    this._messages.push(message);
  }
}
