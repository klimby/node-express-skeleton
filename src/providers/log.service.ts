import {
  Format,
  TimestampOptions,
}                        from 'logform';
import { Service }       from 'typedi';
import winston, {
  format,
  Logger,
}                        from 'winston';
import DailyRotateFile   from 'winston-daily-rotate-file';
import { Helpers }       from '../helpers/helpers';
import {
  LogChannel,
  LogFileFormat,
}                        from '../types/config-types';
import { ConfigService } from './config.service';

@Service()
export class LogService {

  /**
   * Winston Logger instance
   */
  private _logger!: Logger;

  readonly #logDir = 'logs';

  constructor(
      private config: ConfigService,
  ) {
    this._init();
  }

  /**
   * Send informational log.
   * Informational: informational messages
   * @param message log message
   * @param ctx optional log context
   */
  info(message: string, ctx?: object) {
    this._logger.info(message, ctx);
  }

  /**
   * Send notice log.
   * Notice: normal but significant condition
   * @param message log message
   * @param ctx optional log context
   */
  notice(message: string, ctx?: object): void {
    this._logger.notice(message, ctx);
  }

  /**
   * Send warning log.
   * Warning: warning conditions
   * @param message log message
   * @param ctx optional log context
   */
  warning(message: string, ctx?: object): void {
    this._logger.warning(message, ctx);
  }

  /**
   * Send warning log.
   * Error: error conditions
   * @param message log message
   * @param ctx optional log context
   */
  error(message: string, ctx?: object): void {
    this._logger.error(message, ctx);
  }

  /**
   * Send emergency log
   * Emergency: system is unusable
   * @param message log message
   * @param ctx optional log context
   */
  emergency(message: string, ctx?: object): void {
    this._logger.emerg(message, ctx);
  }

  /**
   * Send critical log
   * Critical: critical conditions
   * @param message log message
   * @param ctx optional log context
   */
  critical(message: string, ctx?: object): void {
    this._logger.crit(message, ctx);
  }

  /**
   * Init logger and set config. Run in index
   */
  private _init(): void {
    this._logger = winston.createLogger(
        {
          levels: winston.config.syslog.levels,
          level: 'debug',
          exitOnError: false,
        },
    );

    this._setExceptionsHandler();
    this._setRejectionsHandler();

    if (this.config.logs.channels.includes(LogChannel.File)) {
      this._setFileLogger();
      this._setFileErrorLogger();
    }
    if (this.config.logs.channels.includes(LogChannel.Console)) {
      this._setConsoleLogger();
    }
  }

  /**
   * Aet unhandled exceptions log handler
   */
  private _setExceptionsHandler(): void {
    this._logger.exceptions.handle(
        new winston.transports.File({
          filename: 'exceptions.log',
          dirname: this.#logDir,
        }),
    );
  }

  /**
   * Set promise rejections log handler
   */
  private _setRejectionsHandler(): void {
    this._logger.rejections.handle(
        new winston.transports.File({
          filename: 'rejections.log',
          dirname: this.#logDir,
        }),
    );
  }

  /**
   * Set error logger
   */
  private _setFileErrorLogger(): void {
    const { combine, timestamp, label, metadata } = format;

    const errorFilter = winston.format((info) => {
      return this._isError(info.level) ? info : false;
    });

    const fileFormat = this.config.logs.logFileContentFormat === LogFileFormat.Json ? this._getFileJsonFormat()
                                                                                    : this._getFileTextFormat();
    const timestampOptions = this._getTimestampFileOptions();

    this._logger.add(new winston.transports.File({
      level: 'error',
      filename: 'errors.log',
      dirname: this.#logDir,
      format: combine(
          errorFilter(),
          metadata(),
          label({ label: this.config.appName }),
          timestamp(timestampOptions),
          fileFormat,
      ),
    }));
  }

  private _isError(level: string): boolean {
    return ['error', 'crit', 'alert', 'emerg'].includes(level);
  }

  /**
   * Set console logger
   */
  private _setConsoleLogger(): void {
    const { combine, timestamp, label, colorize, align, metadata } = format;
    const logFormat = this._getConsoleFormat();
    this._logger.add(new winston.transports.Console({
      level: 'debug',
      format: combine(
          metadata(),
          label({ label: this.config.appName }),
          timestamp(this._getTimestampConsoleOptions()),
          align(),
          logFormat,
          colorize({ all: true }),
      ),
    }));
  }

  /**
   * Set logger for file
   */
  private _setFileLogger(): void {
    const { combine, timestamp, label, metadata } = format;

    const fileFormat = this.config.logs.logFileContentFormat === LogFileFormat.Json ? this._getFileJsonFormat()
                                                                                    : this._getFileTextFormat();
    const timestampOptions = this._getTimestampFileOptions();

    const transport: DailyRotateFile = new DailyRotateFile({
      level: 'info',
      filename: 'combined-%DATE%.log',
      dirname: this.#logDir,
      datePattern: 'YYYY-MM-DD',
      maxFiles: `${this.config.logs.dayRotation}d`,
      zippedArchive: true,
      auditFile: 'storage/log-audit.json',
      format: combine(
          metadata(),
          label({ label: this.config.appName }),
          timestamp(timestampOptions),
          fileFormat,
      ),
    });

    this._logger.add(transport);
  }

  /**
   * Get format for log file in json style
   */
  private _getFileJsonFormat(): Format {
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
  private _getFileTextFormat(): Format {
    const { printf } = format;
    return printf(({ level, message, label, timestamp, metadata }) => {
      let result = `[${timestamp}] ${label}.${level.toUpperCase()}: ${message}`;
      if (metadata && Object.keys(metadata).length !== 0) {
        if ('stack' in metadata && typeof metadata['stack'] === 'string') {
          metadata['stack'] = Helpers.clearErrorStack(metadata['stack']);
        }
        const meta = JSON.stringify(metadata);
        result = `${result}. ${meta}`;
      }
      return result;
    });
  }

  /**
   * Get console log format
   */
  private _getConsoleFormat(): Format {
    const { printf } = format;
    return printf(({ level, message, label, timestamp, metadata }) => {
      if ('stack' in metadata && typeof metadata['stack'] === 'string') {
        message += `\n\t${metadata['stack']}`;
      }

      let result = `[${timestamp}] ${label}.${level.toUpperCase()}: ${message}`;
      if (!this._isError(level) && metadata && Object.keys(metadata).length !== 0) {
        const meta = JSON.stringify(metadata);
        result = `${result}. ${meta}`;
      }
      return result;
    });
  }

  /**
   * Get timestamp options. Undefined = toISOString()
   */
  private _getTimestampConsoleOptions(): TimestampOptions | undefined {
    return this.config.logs.utc ? undefined : { format: 'YYYY-MM-DD HH:mm:ss.SSS' };
  }

  /**
   * Timestamp for file
   */
  private _getTimestampFileOptions(): TimestampOptions | undefined {
    return this.config.logs.utc ? undefined : { format: 'YYYY-MM-DDTHH:mm:ss.SSSZ' };
  }
}
