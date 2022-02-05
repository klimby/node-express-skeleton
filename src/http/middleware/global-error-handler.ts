import {
  Request,
  Response,
}                   from 'express-serve-static-core';
import {
  ExpressErrorMiddlewareInterface,
  Middleware,
}                   from 'routing-controllers';
import { ApiError } from '../../exception/api-error';
import { Helpers }  from '../../helpers/helpers';
import appConfig    from '../../providers/app-config';
import appLog       from '../../providers/app-log';

@Middleware({ type: 'after' })
export class GlobalErrorHandler implements ExpressErrorMiddlewareInterface {
  error(error: Error, request: Request, response: Response, next: (err?: Error) => any) {
    if (Helpers.isJsonRequest(request, appConfig)) {
      const apiError = new ApiError(error);
      appLog.error(apiError.message, apiError.getLogContext({}));
      response.status(apiError.httpCode).json(apiError.getResponseObject());
    } else {
      next();
    }
  }
}
