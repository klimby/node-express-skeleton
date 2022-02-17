import { Container }  from 'typedi';
import { AppService } from './providers/app.service';
import { LogService } from './providers/log.service';

const app = Container.get(AppService);
const server = app.startServer();

const gracefulShutdownHandler = function gracefulShutdownHandler(signal: string) {
  const log = Container.get(LogService);
  log.info(`Caught ${signal}, gracefully shutting down`);

  setTimeout(() => {
    console.log('Shutting down application...');
    server.close(function () {
      console.log('All requests stopped, shutting down!');
      process.exit();
    });
  }, 0);
};

process.on('SIGINT', gracefulShutdownHandler);
process.on('SIGTERM', gracefulShutdownHandler);


