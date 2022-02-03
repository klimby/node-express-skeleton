import bodyParser               from 'body-parser';
import express, { Application } from 'express';
import { useExpressServer }     from 'routing-controllers';
import { ExampleController }    from '../http/controllers/example-controller';
import { GlobalErrorHandler }   from '../http/middleware/global-error-handler';
import { ExpressApplication }   from '../types/app';
import Config                   from './config-provider';
import Log                      from './logs-provider';

/**
 * Application provider
 */
class AppProvider implements ExpressApplication {

  readonly app: Application;

  constructor() {
    this.app = express();
  }

  /**
   * Init routes and middlewares
   */
  initRoutes(): void {
    this.app.use(bodyParser.json());

    const routePrefix = Config.routePrefix;

    useExpressServer(this.app, {
      routePrefix,
      classTransformer: true,
      controllers: [ExampleController],
      middlewares: [GlobalErrorHandler],
      defaultErrorHandler: false,
    });

    /*process.on('uncaughtException', (error: Error) => {
      throw error;
    });*/
  }

  /**
   * Start http server
   */
  startServer(): void {
    this.#clearConsole();
    const port = Config.port;
    this.app.listen(port, () => Log.info(`Running on port ${port}`));
  }


  #clearConsole(): void {
    process.stdout.write('\x1B[2J\x1B[0f');
  }
}

/**
 * Application instance
 */
const App: ExpressApplication = new AppProvider();
export default App;
