import {
  Request,
  Response,
}                        from 'express-serve-static-core';
import {
  ExpressErrorMiddlewareInterface,
  HttpError,
  Middleware,
}                        from 'routing-controllers';
import { Service }       from 'typedi';
import { Helpers }       from '../../helpers/helpers';
import { RequestCodes }  from '../../helpers/request-codes';

import { ConfigService } from '../../providers/config.service';
import { LogService }    from '../../providers/log.service';

@Service()
@Middleware({ type: 'after' })
export class GlobalErrorHandler implements ExpressErrorMiddlewareInterface {

  constructor(
      private config: ConfigService,
      private log: LogService
  ) {}

  error(error: Error | HttpError, request: Request, response: Response, next: (err?: Error) => void) {
    if (Helpers.isJsonRequest(request, this.config)) {

      const httpCode = 'httpCode' in error ? error['httpCode'] : 500;
      if (!error.message) {
        error.message = RequestCodes.getRequestByCode(httpCode, this.config.locale);
      }

      this.log.error(error.message, error);

      response.status(httpCode)
          .json(error);
    } else {
      next();
    }
  }
}
