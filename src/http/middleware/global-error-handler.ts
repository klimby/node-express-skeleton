import { ExpressErrorMiddlewareInterface, Middleware } from 'routing-controllers';

@Middleware({ type: 'after' })
export class GlobalErrorHandler implements ExpressErrorMiddlewareInterface {
  error (error: any, request: any, response: any, next: () => any) {
    response.status(error.statusCode || error.httpCode).json(error);
    response.send({ ERROR: error });
    next();
  }
}
