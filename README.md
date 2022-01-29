# node-express-skeleton
Node.js+express+Typescript+Jest skeleton


8) npm install --save express,
9) npm install -D @types/express,
10) create src folder,
11) create src/index.ts with code below:
    import express from 'express'

const app = express();
const port = 5000;
app.get('/', (request, response) => {
response.send('Hello world!');
});
app.listen(port, () => console.log(`Running on port ${port}`));
13) npm run build,
14) npm run start,
15) localhost:5000


1) in tsconfig.json add: "sourceMap": true
2) int package.json add: "prestart": "npm run build",
3) In IntelliJ IDEA in Run/Debug Configurations choose: "npm" and add script
4) npm i ts-node-dev --save-dev
5) int package.json add: "server:watch": "ts-node-dev --respawn --transpile-only src/index.ts"
6) add IntelliJ IDEA npm for "server:watch" script
7) npm install dotenv
8) in index.ts add: dotenv.config();
9) create .env file in root dir of your project and add text below in .env file:
   PORT = 5000
   const port = process.env.PORT;


1) npm install log4js
2) in index.ts file:
   import log4js from 'log4js';
   ...
   const logger = log4js.getLogger();
   logger.level = process.env.LOG_LEVEL;
   ...
4) in .env file: LOG_LEVEL=error
5) in index.ts file:
   ...
   logger.info('log4js log info');
   logger.debug('log4js log debug');
   logger.error('log4js log error');
   ...
6) npm install eslint --save-dev
7)  npm init @eslint/config
8) "prebuild": "npm run lint"
9) "lint:fix": "eslint --cache --ext .ts . --fix",
10) "lint": "eslint --cache --ext .ts .",
    !!! --cache (only changed), .
11) IntelliJ IDEA -- file -- setting -- eslint -- automatic
12) "rules": {
    "semi": ["error", "always"]
    }


) npm install routing-controllers
2) npm install reflect-metadata
3) npm install express body-parser multer
4) npm install class-transformer class-validator
5) npm install -D @types/body-parser @types/multer

6) tsconfig.json
   "compilerOptions": {
   ...
   "emitDecoratorMetadata": true,
   "experimentalDecorators": true
   ...
   }
7) in index.ts
   // const app = express();

// logger.info('log4js log info');
// logger.debug('log4js log debug');
// logger.error('log4js log error');

// app.get('/', (request, response) => {
//   response.send('Hello world2!');
// });
7) in index.ts
   import { createExpressServer } from 'routing-controllers';
   import { UserController } from './UserController';

   const app = createExpressServer({
   controllers: [UserController], // we specify controllers we want to use
   });

8) controller/user-controller.ts
   import { Controller, Get, Param } from 'routing-controllers';
   import 'reflect-metadata';

   @Controller()
   export class UserController {
   @Get('/users/:id')
   getOne (@Param('id') id: number) {
   return 'This action returns user #' + id;
   }
   }
9) http://localhost:3001/users/1


1) middleware -- middleware.ts
2) middleware.ts
   export function loggingBefore (request: any, response: any, next?: (err?: any) => any): any {
   console.log('do something Before...');
   next();
   }

export function loggingAfter (request: any, response: any, next?: (err?: any) => any): any {
console.log('do something After...');
next();
}
3) user-controller.ts in class
   @UseBefore(loggingBefore)
   @UseAfter(loggingAfter)
   console.log('do something in GET function...');
4) user-controller.ts in function
   @UseBefore(loggingBefore)
   @UseAfter(loggingAfter)
5) user-controller.ts in function
   @UseInterceptor(function (action: Action, content: any) {
   console.log('change response...');
   return content;
   })
6) npm install express-http-context
7) index.ts

const app: Express = express();
app.use(bodyParser.json());
app.use(httpContext.middleware);
useExpressServer(app, {
controllers: [UserController]
});

app.use((req, res, next) => {
httpContext.ns.bindEmitter(req);
httpContext.ns.bindEmitter(res);
});

8) middleware.ts loggingBefore
   import httpContext from 'express-http-context';

   console.log('set traceId = 123');
   httpContext.set('traceId', 123);
9) middleware.ts loggingAfter
   console.log(`tracedId = ${httpContext.get('traceId')}`);


1) in user-controller.ts add:
   ...
   @Post('/users/:id')
   @OnUndefined(204)
   postOne (@Param('id') id: number, @Body() info: any) {
   console.log(JSON.stringify(info));
   }
   ...
2) in postman
   http://localhost:3001/users/1
   {
   "country":"Russia",
   "city":"SPb"
   }
3) model -- info.ts
4)
import { IsDefined } from 'class-validator';

export class Info {
@IsDefined()
country: string;
@IsDefined()
city: string;
}
8) postOne (@Param('id') id: number, @Body() info: Info) {
9) middleware -- global-error-handler.ts
10)
import { ExpressErrorMiddlewareInterface, Middleware } from 'routing-controllers';

@Middleware({ type: 'after' })
export class GlobalErrorHandler implements ExpressErrorMiddlewareInterface {
error (error: any, request: any, response: any, next: () => any) {
response.send({ ERROR: error });
next();
}
}
11)
useExpressServer(app, {
controllers: [UserController], // we specify controllers we want to use
middlewares: [GlobalErrorHandler],
defaultErrorHandler: false
});
