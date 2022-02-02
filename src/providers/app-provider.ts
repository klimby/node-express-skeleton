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
  }

  /**
   * Start http server
   */
  startServer(): void {
    const port = Config.port;
    this.app.listen(port, () => Log.info(`Running on port ${port}`, {foo: 'bar'}));
  }
}

/**
 * Application instance
 */
const App: ExpressApplication = new AppProvider();
export default App;
