import { Application } from 'express';

import request, { Response } from 'supertest';
import { Container }         from 'typedi';
import { AppService }        from '../../src/providers/app.service';

describe('example routes test', () => {

      let server: Application;

      beforeAll(async () => {
        const app = Container.get(AppService);
        server = app.express;
      });

      afterEach(() => {
        jest.restoreAllMocks();
      });

      it('get all', function(done) {
        request(server)
            .get('/api/examples')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function(err, res: Response) {
              if (err) {
                return done(err);
              }
              return done();
            });
      });

      it('get by id', function(done) {
        request(server)
            .get('/api/examples/1')
            .set('Accept', 'application/json')
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function(err, res: Response) {
              if (err) {
                return done(err);
              }
              return done();
            });
      });

    },
);
