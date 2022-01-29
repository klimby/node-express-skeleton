import express from 'express';
import httpContext from 'express-http-context';

export function loggingBefore (request: express.Request, response: express.Response, next: (err?: any) => any): any {
  console.log('do something Before...');
  httpContext.set('traceId', 123);
  next();
}

export function loggingAfter (request: express.Request, response: express.Response, next: (err?: any) => any): any {
  console.log('do something After...');
  console.log(`tracedId = ${httpContext.get('traceId')}`);
  next();
}
