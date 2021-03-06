import { Request }   from 'express-serve-static-core';
import {
  trim,
  truncate,
} from 'lodash';

export class Helpers {

  /**
   * Is json request sign
   * @param req request instance
   * @param appConfig app config
   */
  static isJsonRequest(req: Request): boolean {
    const apiPrefix = 'api';
    const isJson = req.header('Content-Type') === 'application/json' && !!req.accepts('application/json');
    return isJson || req.xhr || req.originalUrl.includes(`/${apiPrefix}/`);
  }

  /**
   * Clear error stack string
   * @param stack error stack
   * @param length trim string to length, default 300
   */
  static clearErrorStack(stack: string, length = 300):string {
    let result = stack.replace(/\\n/g, ' ');
    result = result.replace(/\s{2,}/g, ' ');
    result = truncate(result, {
      length,
      separator: ' ',
    });
    return  trim(result);
  }
}
