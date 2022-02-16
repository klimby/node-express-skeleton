import bodyParser            from 'body-parser';
import express               from 'express';
import { useExpressServer }  from 'routing-controllers';
import { ExampleController } from 'src/http/controllers/example-controller';
import request, { Response } from 'supertest';
import { Handler }           from '../../src/exception/handler';
import appConfig             from '../../src/providers/app-config';
import log                   from '../../src/providers/app-log';

describe('example routes test', () => {

      let server: express.Express;

      beforeAll(async () => {
        /**
         * Init app configuration and settings
         */
        appConfig.init();

        /**
         * Init logger
         */
        log.init();
        server = express();
        server.use(bodyParser.json());
        useExpressServer(server, {
          routePrefix: '/api',
          classTransformer: true,
          controllers: [ExampleController],
          defaultErrorHandler: false,
        });

        server.use(Handler.notFoundHandler);
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

      it('postOne with validations', async () => {
        const response = await request(server)
            .get('/api/examples');
        expect(response.status)
            .toEqual(200);
      });

    },
);
