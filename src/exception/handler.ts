import {
  NextFunction,
  Request,
  Response,
}                        from 'express-serve-static-core';
import { NotFoundError } from 'routing-controllers';
import { Helpers }       from '../helpers/helpers';
import appConfig         from '../providers/app-config';
import appLog            from '../providers/app-log';

export class Handler {

  /**
   * Handle uncaught Exception end unhandled Rejection
   */
  static appHandler(): void {
    Handler.#handleUncaughtException();
    Handler.#handleUnhandledRejection();
  }

  /**
   * Handles all the not found routes (404 error)
   */
  static notFoundHandler(req: Request, res: Response, next: NextFunction): void {
    if(!res.headersSent) {
      if (Helpers.isJsonRequest(req, appConfig)) {
        const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        const message = `Path not found: '${req.originalUrl}'!`;
        const err = new NotFoundError(message);
        appLog.warning(message, { ip });
        res.status(err.httpCode)
            .json(err);
      } else {
        res.status(404).send(
            '<h1>Page not found on the server</h1>');
      }
    }
  }

  /**
   * Uncaught Exception handler
   * @private
   */
  static #handleUncaughtException(): void {
    process.on('uncaughtException', (error: Error) => {
      //throw error;
      const message = error.message ? error.message : 'Critical error!';
      appLog.critical(message, error);
      appLog.emergency('Critical error! System exit.');
      process.exit(1);
    });
  }

  /**
   * Get the unhandled rejection and throw it to another fallback handler we already have
   */
  static #handleUnhandledRejection(): void {
    // get the unhandled rejection and throw it to another fallback handler we already have.
    process.on('unhandledRejection', (reason: Error, promise: Promise<any>) => {
      throw reason;
    });
  }

}

