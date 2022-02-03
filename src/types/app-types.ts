import { Application } from 'express';

/**
 * Application
 */
export interface App {
  readonly express: Application;

  /**
   * Init routes and middlewares
   */
  initRoutes(): void;

  /**
   * Start http server
   */
  startServer(): void;
}
