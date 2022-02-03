import App    from './providers/app-provider';
import Config from './providers/config-provider';
import Log    from './providers/logs-provider';

/**
 * Init app configuration and settings
 */
Config.init();

/**
 * Init logger
 */
Log.init();

/**
 * Set applications routes
 */
App.initRoutes();

/**
 * Start node server
 */
App.startServer();



