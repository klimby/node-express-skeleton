import {
  Format,
  TimestampOptions,
}                      from 'logform';
import {
  AppConfig,
  LogChannel,
  LogFileFormat,
}                      from '../types/config-types';
import { AppLog }      from '../types/log-types';
import winston, {
  format,
  Logger,
}                      from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';

import appConfig from './app-config';

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
class LogProvider implements AppLog {

  /**
   * Winston Logger instance
   */
  #logger: Logger;

  readonly #logDir = 'logs';

  constructor() {

    this.#logger = winston.createLogger(
        {
          levels: winston.config.syslog.levels,
          level: 'debug',
          exitOnError: false,
        },
    );
  }

  /**
   * App config
   */
  get #config(): AppConfig {
    return appConfig;
  }

  /**
   * Init logger and set config. Run in index
   */
  init(): void {
    this.#setExceptionsHandler();
    this.#setRejectionsHandler();

    if (this.#config.logs.channels.includes(LogChannel.File)) {
      this.#setFileLogger();
      this.#setFileErrorLogger();
    }
    if (this.#config.logs.channels.includes(LogChannel.Console)) {
      this.#setConsoleLogger();
    }
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

  /**
   * Send emergency log
   * Emergency: system is unusable
   * @param message log message
   * @param ctx optional log context
   */
  emergency(message: string, ctx?: object): void {
    this.#logger.emerg(message, ctx);
  }

  /**
   * Send critical log
   * Critical: critical conditions
   * @param message log message
   * @param ctx optional log context
   */
  critical(message: string, ctx?: object): void {
    this.#logger.crit(message, ctx);
  }

  /**
   * Aet unhandled exceptions log handler
   */
  #setExceptionsHandler(): void {
    this.#logger.exceptions.handle(
        new winston.transports.File({
          filename: 'exceptions.log',
          dirname: this.#logDir,
        }),
    );
  }

  /**
   * Set promise rejections log handler
   */
  #setRejectionsHandler(): void {
    this.#logger.rejections.handle(
        new winston.transports.File({
          filename: 'rejections.log',
          dirname: this.#logDir,
        }),
    );
  }

  /**
   * Set error logger
   */
  #setFileErrorLogger(): void {
    const { combine, timestamp, label, metadata } = format;

    const errorFilter = winston.format((info) => {
      return ['error', 'crit', 'alert', 'emerg'].includes(info.level) ? info : false;
    });

    const fileFormat = this.#config.logs.logFileContentFormat === LogFileFormat.Json ? this.#getFileJsonFormat()
                                                                                     : this.#getFileTextFormat();
    const timestampOptions = this.#getTimestampFileOptions();

    this.#logger.add(new winston.transports.File({
      level: 'error',
      filename: 'errors.log',
      dirname: this.#logDir,
      format: combine(
          errorFilter(),
          metadata(),
          label({ label: this.#config.appName }),
          timestamp(timestampOptions),
          fileFormat,
      ),
    }));
  }

  /**
   * Set console logger
   */
  #setConsoleLogger(): void {
    const { combine, timestamp, label, colorize, align, metadata } = format;
    const logFormat = this.#getConsoleFormat();
    this.#logger.add(new winston.transports.Console({
      level: 'debug',
      format: combine(
          metadata(),
          label({ label: this.#config.appName }),
          timestamp(this.#getTimestampConsoleOptions()),
          align(),
          logFormat,
          colorize({ all: true }),
      ),
    }));
  }

  /**
   * Set logger for file
   */
  #setFileLogger(): void {
    const { combine, timestamp, label, metadata } = format;

    const fileFormat = this.#config.logs.logFileContentFormat === LogFileFormat.Json ? this.#getFileJsonFormat()
                                                                                     : this.#getFileTextFormat();
    const timestampOptions = this.#getTimestampFileOptions();

    const transport: DailyRotateFile = new DailyRotateFile({
      level: 'info',
      filename: 'combined-%DATE%.log',
      dirname: this.#logDir,
      datePattern: 'YYYY-MM-DD',
      maxFiles: `${this.#config.logs.dayRotation}d`,
      zippedArchive: true,
      auditFile: 'storage/log-audit.json',
      format: combine(
          metadata(),
          label({ label: this.#config.appName }),
          timestamp(timestampOptions),
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
   * Get format for log file in text style
   */
  #getFileTextFormat(): Format {
    return this.#getConsoleFormat();
  }

  /**
   * Get console log format
   */
  #getConsoleFormat(): Format {
    const { printf } = format;
    return printf(({ level, message, label, timestamp, metadata }) => {
      let result = `[${timestamp}] ${label}.${level.toUpperCase()}: ${message}`;
      if (metadata && Object.keys(metadata).length !== 0) {
        const meta = JSON.stringify(metadata);
        result = `${result}. ${meta}`;
      }
      return result;
    });
  }

  /**
   * Get timestamp options. Undefined = toISOString()
   */
  #getTimestampConsoleOptions(): TimestampOptions | undefined {
    return this.#config.logs.utc ? undefined : { format: 'YYYY-MM-DD HH:mm:ss.SSS' };
  }

  /**
   * Timestamp for file
   */
  #getTimestampFileOptions(): TimestampOptions | undefined {
    return this.#config.logs.utc ? undefined : { format: 'YYYY-MM-DDTHH:mm:ss.SSSZ' };
  }

}

const appLog: AppLog = new LogProvider();

export default appLog;
