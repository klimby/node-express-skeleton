import { Request }   from 'express-serve-static-core';
import { AppConfig } from '../types/config-types';

export class Helpers {
  static isJsonRequest(req: Request, appConfig: AppConfig): boolean {
    const apiPrefix = appConfig.routePrefix;
    const isJson = req.header('Content-Type') === 'application/json';
    return isJson || req.xhr || req.originalUrl.includes(`/${apiPrefix}/`);
  }
}
