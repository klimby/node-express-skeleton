import express from 'express';

export function loggingBefore (request: express.Request, response: express.Response, next: (err?: any) => any): any {
  console.log('do something Before...');
  next();
}

export function loggingAfter (request: express.Request, response: express.Response, next: (err?: any) => any): any {
  console.log('do something After...');
  next();
}
