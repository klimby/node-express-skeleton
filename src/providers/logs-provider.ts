import {
  Format,
  TimestampOptions,
} from 'logform';
import winston, {
  format,
  Logger,
}                       from 'winston';
import { AppConfig }    from '../types/app-config';
import { AppLog }       from '../types/app-log';
import Config           from './config-provider';
import  DailyRotateFile from 'winston-daily-rotate-file';

/**
 * Log provider
 * Syslog levels:
 *               0       Emergency: system is unusable
 *               1       Alert: action must be taken immediately
 *               2       Critical: critical conditions
 *               3       Error: error conditions
 *               4       Warning: warning conditions
 *               5       Notice: normal but significant condition
 *               6       Informational: informational messages
 *               7       Debug: debug-level messages
 */
class LogsProvider implements AppLog {

  /**
   * Winston Logger instance
   */
  #logger: Logger;

  /**
   * App config
   * @private
   */
  #config: AppConfig;

  constructor() {
    this.#config = Config;
    this.#logger = winston.createLogger(
        {
          levels: winston.config.syslog.levels,
          level: 'debug',
          format: winston.format.json(),
          //     defaultMeta: { service: Config.appName },
          transports: [
            new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
          ],
        },
    );

    const { combine, timestamp, label, printf, colorize, align, json, metadata } = format;

    this.#setFileLogger();
    this.#setConsoleLogger();
  }

  /**
   * Send informational log.
   * Informational: informational messages
   * @param message log message
   * @param ctx optional log context
   */
  info(message: string, ctx?: object) {
    this.#logger.info(message, ctx);
  }

  /**
   * Send notice log.
   * Notice: normal but significant condition
   * @param message log message
   * @param ctx optional log context
   */
  notice(message: string, ctx?: object): void {
    this.#logger.notice(message, ctx);
  }

  /**
   * Send warning log.
   * Warning: warning conditions
   * @param message log message
   * @param ctx optional log context
   */
  warning(message: string, ctx?: object): void {
    this.#logger.warning(message, ctx);
  }

  /**
   * Send warning log.
   * Error: error conditions
   * @param message log message
   * @param ctx optional log context
   */
  error(message: string, ctx?: object): void {
    this.#logger.error(message, ctx);
  }

  #setFileErrorLogger(): void {

  }

  #setFileLogger(): void {

    const { combine, timestamp, label, metadata } = format;

    const fileFormat = this.#getFileJsonFormat();

    const transport: DailyRotateFile = new DailyRotateFile({
      level: 'info',
      filename: 'combined-%DATE%.log',
      dirname: 'logs',
      datePattern: 'YYYY-MM-DD',
      maxFiles: `${this.#config.logs.dayRotation}d`,
      zippedArchive: true,
      auditFile: 'storage/log-audit.json',
      format: combine(
          timestamp(),
          metadata(),
          label({ label: this.#config.appName }),
          fileFormat,
      ),
    });

    this.#logger.add(transport);
  }

  /**
   * Get format for log file in json style
   */
  #getFileJsonFormat(): Format {
    const { printf } = format;

    return printf(({ level, message, label, timestamp, metadata }) => {
      let o = { timestamp, label, level, message };
      if (metadata) {
        o = Object.assign(o, metadata);
      }
      return `${JSON.stringify(o)}`;
    });
  }

  /**
   * Set console log format
   * @private
   */
  #setConsoleLogger(): void {
    const { combine, timestamp, label, printf, colorize, align, metadata } = format;

    /**
     * Set console message format
     */
    const consoleFormat = printf(({ level, message, label, timestamp, metadata }) => {
      let result = `[${timestamp}] ${label}.${level.toUpperCase()}: ${message}`;
      if (metadata) {
        const meta = JSON.stringify(metadata);
        result = `${result}. ${meta}`;
      }
      return result;
    });

    /**
     * undefined - toISOString()
     */
    const timestampOpt: TimestampOptions | undefined =  this.#config.logs.utc ? undefined : {format: 'YYYY-MM-DD HH:mm:ss.SSS'};

    this.#logger.add(new winston.transports.Console({
      level: 'debug',
      format: combine(
          metadata(),
          label({ label: this.#config.appName }),
          timestamp(timestampOpt),
          align(),
          consoleFormat,
          colorize({ all: true }),
      ),
    }));
  }
}

const Log: AppLog = new LogsProvider();

export default Log;
