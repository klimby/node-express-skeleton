import {
  HttpError,
  MethodNotAllowedError,
}                       from 'routing-controllers';
import { RequestCodes } from '../helpers/request-codes';
import { Locales }      from '../types/common-types';

export interface LogContext {
  httpCode: number;
  name?: string;
  stack?: string;

  [key: string]: any;
}

export class ApiError extends Error {

  /**
   * Error name
   */
  name: string;

  /**
   * Error message
   */
  message: string;

  /**
   * Error stack trace
   */
  stack?: string;

  /**
   * Http code
   */
  httpCode = 500;

  constructor(error: Error | HttpError, locale: Locales = Locales.en) {
    super(error.message);
    this.name = error.name;
    this.message = error.message;
    this.stack = error.stack;
    if (error instanceof HttpError) {
      this.httpCode = error.httpCode;
    }
    if (error instanceof MethodNotAllowedError) {
      this.httpCode = 405;
    }
    if (!this.message) {
      this.message = RequestCodes.getRequestByCode(this.httpCode, locale);
    }
  }

  /**
   * Get object for client json response
   */
  getResponseObject(): object {
    return {
      name: this.name,
      httpCode: this.httpCode,
      message: this.message,
    };
  }

  /**
   * Get context for logging
   * @param stack append stack trace
   * @param data additional data
   */
  getLogContext({ stack = true, data = {} }): LogContext {
    let o: LogContext = {
      httpCode: this.httpCode,
    };
    if (this.name) {
      o.name = this.name;
    }
    o = Object.assign(o, data);

    if (stack) {
      o.stack = this.stack;
    }
    return o;
  }

}
