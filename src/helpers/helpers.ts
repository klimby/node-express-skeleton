import { Request }   from 'express-serve-static-core';
import {
  trim,
  truncate,
} from 'lodash';
import { AppConfig } from '../types/config-types';

export class Helpers {
  static isJsonRequest(req: Request, appConfig: AppConfig): boolean {
    const apiPrefix = appConfig.routePrefix;
    const isJson = req.header('Content-Type') === 'application/json';
    return isJson || req.xhr || req.originalUrl.includes(`/${apiPrefix}/`);
  }

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
