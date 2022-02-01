import winston, { format, Logger } from 'winston';
import { AppLog }                  from '../types/app-log';
import Config                      from './config-provider';

class LogsProvider implements AppLog {

  private logger: Logger;

  constructor() {
    this.logger = winston.createLogger(
        {
          level: 'debug',
          format: winston.format.json(),
          defaultMeta: { service: 'user-service' },
          transports: [
            new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
            new winston.transports.File({ filename: 'logs/combined.log' }),
          ],
        },
    );


    const { combine, timestamp, label, printf } = format;

    const myFormat = printf(({ level, message, label, timestamp }) => {
      const upperLevel = level.toUpperCase();
      return `[${timestamp}] ${label}.${upperLevel}: ${message}`;
    });

    if (process.env.NODE_ENV !== 'production') {
      this.logger.add(new winston.transports.Console({
       // format: winston.format.simple(),
        format: combine(
            label({ label: Config.appName }),
            timestamp(),
            myFormat
        ),
      }));
    }
  }

  info(message: string, ctx?: object) {
    this.logger.info(message, ctx);
  }
}

const Log: AppLog = new LogsProvider();

export default Log;
