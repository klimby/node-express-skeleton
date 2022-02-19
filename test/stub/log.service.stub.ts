import { LogService } from '../../src/providers/log.service';

export class LogServiceStub {

  private _logs: LogServiceStubObject[] = [];

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
    this.#addObject('info', message, ctx);
  }

  /**
   * Send notice log.
   * Notice: normal but significant condition
   * @param message log message
   * @param ctx optional log context
   */
  notice(message: string, ctx?: object): void {
    this.#addObject('notice', message, ctx);
  }

  /**
   * Send warning log.
   * Warning: warning conditions
   * @param message log message
   * @param ctx optional log context
   */
  warning(message: string, ctx?: object): void {
    this.#addObject('warning', message, ctx);
  }

  /**
   * Send warning log.
   * Error: error conditions
   * @param message log message
   * @param ctx optional log context
   */
  error(message: string, ctx?: object): void {
    this.#addObject('error', message, ctx);
  }

  /**
   * Send emergency log
   * Emergency: system is unusable
   * @param message log message
   * @param ctx optional log context
   */
  emergency(message: string, ctx?: object): void {
    this.#addObject('emergency', message, ctx);
  }

  /**
   * Send critical log
   * Critical: critical conditions
   * @param message log message
   * @param ctx optional log context
   */
  critical(message: string, ctx?: object): void {
    this.#addObject('critical', message, ctx);
  }

  #addObject(level: string, message: string, ctx?: object): void {
    this._logs.push({
      level, message, ctx
    });
  }
}

interface LogServiceStubObject {
  level: string;
  message: string;
  ctx?: object;
}
