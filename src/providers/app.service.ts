import bodyParser               from 'body-parser';
import express, { Application } from 'express';
import {
  NextFunction,
  Request,
  Response,
}                               from 'express-serve-static-core';
import http                     from 'http';
import {
  NotFoundError,
  useExpressServer,
}                               from 'routing-controllers';
import { Service }              from 'typedi';
import { Helpers }              from '../helpers/helpers';
import { ExampleController }    from '../http/controllers/example-controller';
import { GlobalErrorHandler }   from '../http/middleware/global-error-handler';

import { ConfigService } from './config.service';
import { LogService }    from './log.service';

@Service()
export class AppService {

  readonly express: Application;

  server: http.Server | undefined = undefined;

  constructor(
      private config: ConfigService,
      private log: LogService,
  ) {
    this.express = express();
    this.#initRoutes();
  }

  /**
   * Start http server
   */
  startServer(): http.Server {
    this.#clearConsole();
    const port = this.config.port;
    this.server  = this.express.listen(port, () => this.log.info(`Running on port ${port}`));
    return this.server;
  }

  /**
   * Init routes and middlewares
   */
  #initRoutes(): void {

    this.#handleUncaughtException();
    this.#handleUnhandledRejection();

    this.express.use(bodyParser.json());

    this.#addVersionRoutes();

    const routePrefix = this.config.routePrefix ? `/${this.config.routePrefix}` : '';

    useExpressServer(this.express, {
      routePrefix,
      classTransformer: true,
      controllers: [ExampleController],
      middlewares: [GlobalErrorHandler],
      defaultErrorHandler: false,
    });
    /**
     * 404 error
     */
    this.express.use(this.#notFoundHandler);
  }

  #addVersionRoutes(): void {
    const reg = /(^\/$)|(^\/api\/version$)|(^\/version$)/;
    this.express.get(reg,  (req: Request, res: Response) => {
      const version = this.config.version;
      const name = this.config.appName;
      if(Helpers.isJsonRequest(req, this.config)) {
        res.json({name, version});
      } else {
        res.send(`${name}. v.${version}`);
      }
    });
  }

  #clearConsole(): void {
    process.stdout.write('\x1B[2J\x1B[0f');
  }

  #notFoundHandler(req: Request, res: Response, next: NextFunction): void {
    if (!res.headersSent) {
      if (Helpers.isJsonRequest(req, this.config)) {
        const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        const message = `Path not found: '${req.originalUrl}'!`;
        const err = new NotFoundError(message);
        this.log.warning(message, { ip });
        res.status(err.httpCode)
            .json(err);
      } else {
        res.status(404)
            .send(
                '<h1>Page not found on the server</h1>');
      }
    }
  }

  /**
   * Uncaught Exception handler
   * @private
   */
  #handleUncaughtException(): void {
    process.on('uncaughtException', (error: Error) => {
      //throw error;
      const message = error.message ? error.message : 'Critical error!';
      this.log.critical(message, error);
      this.log.emergency('Critical error! System exit.');
      process.exit(1);
    });
  }

  /**
   * Get the unhandled rejection and throw it to another fallback handler we already have
   */
  #handleUnhandledRejection(): void {
    // get the unhandled rejection and throw it to another fallback handler we already have.
    process.on('unhandledRejection', (reason: Error, promise: Promise<unknown>) => {
      throw reason;
    });
  }

}
