import { Application } from 'express';

/**
 * Application
 */
export interface ExpressApplication {
  readonly app: Application;

  /**
   * Init routes and middlewares
   */
  initRoutes(): void;

  /**
   * Start http server
   */
  startServer(): void;
}
