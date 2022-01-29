import bodyParser                from 'body-parser';
import dotenv                    from 'dotenv';
import express, { NextFunction } from 'express';
import httpContext          from 'express-http-context';
import { useExpressServer }      from 'routing-controllers';
import { BaseController }        from './http/controllers';
//import log4js    from 'log4js';

//const logger = log4js.getLogger();
//logger.level = process.env.LOG_LEVEL as string;

dotenv.config();

//logger.info('log4js log info');
//logger.debug('log4js log debug');
//logger.error('log4js log error');

const port = process.env.PORT;

const app: express.Express = express();

app.use(bodyParser.json());

app.use(httpContext.middleware);

useExpressServer(app, {
  routePrefix: '/api',
  classTransformer: true,
  controllers: [BaseController],
});

app.use((req: express.Request, res: express.Response, next: NextFunction) => {
  httpContext.ns.bindEmitter(req);
  httpContext.ns.bindEmitter(res);
});

/*const app = createExpressServer({
 controllers: [BaseController], // we specify controllers we want to use
 });*/

app.listen(port, () => console.log(`Running on port ${port}`));


