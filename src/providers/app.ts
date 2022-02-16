import bodyParser               from 'body-parser';
import express, { Application } from 'express';
import { useExpressServer }     from 'routing-controllers';
import { App }                  from 'src/types/app-types';
import { Handler }              from '../exception/handler';
import { ExampleController }    from '../http/controllers/example-controller';
import { GlobalErrorHandler }   from '../http/middleware/global-error-handler';
import appConfig                from './app-config';
import log                      from './app-log';

/**
 * Application provider
 */
export class AppProvider implements App {

  readonly express: Application;

  constructor() {
    this.express = express();
  }

  /**
   * Init routes and middlewares
   */
  initRoutes(): void {
    this.express.use(bodyParser.json());

    const routePrefix = appConfig.routePrefix ? `/${appConfig.routePrefix}` : '';

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
    this.express.use(Handler.notFoundHandler);
  }

  /**
   * Start http server
   */
  startServer(): void {
    this.#clearConsole();
    const port = appConfig.port;
    this.express.listen(port, () => log.info(`Running on port ${port}`));
  }

  #clearConsole(): void {
    process.stdout.write('\x1B[2J\x1B[0f');
  }
}

/**
 * Application instance
 */
const app: App = new AppProvider();
export default app;
