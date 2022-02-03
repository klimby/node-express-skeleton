import { Handler } from './exception/handler';
import app         from './providers/app';
import appConfig   from './providers/app-config';
import log         from './providers/app-log';

/**
 * Init app configuration and settings
 */
appConfig.init();

/**
 * Init logger
 */
log.init();

Handler.appHandler();

/**
 * Set applications routes
 */
app.initRoutes();

/**
 * Start node server
 */
app.startServer();



