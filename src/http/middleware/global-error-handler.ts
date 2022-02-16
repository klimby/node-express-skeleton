import {
  Request,
  Response,
}                       from 'express-serve-static-core';
import {
  ExpressErrorMiddlewareInterface,
  HttpError,
  Middleware,
}                       from 'routing-controllers';
import { Helpers }      from '../../helpers/helpers';
import { RequestCodes } from '../../helpers/request-codes';
import appConfig        from '../../providers/app-config';
import appLog           from '../../providers/app-log';

@Middleware({ type: 'after' })
export class GlobalErrorHandler implements ExpressErrorMiddlewareInterface {
  error(error: Error | HttpError, request: Request, response: Response, next: (err?: Error) => void) {
    if (Helpers.isJsonRequest(request, appConfig)) {

      const httpCode = 'httpCode' in error ? error['httpCode'] : 500;
      if (!error.message) {
        error.message = RequestCodes.getRequestByCode(httpCode, appConfig.locale);
      }

      appLog.error(error.message, error);

      response.status(httpCode)
          .json(error);
    } else {
      next();
    }
  }
}
