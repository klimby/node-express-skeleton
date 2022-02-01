import bodyParser             from 'body-parser';
import express    from 'express';
import { useExpressServer }   from 'routing-controllers';
import { GlobalErrorHandler } from '../../../src/http/middleware';
import { Info }               from 'src/models';
import { BaseController }     from '../../../src/http/controllers';
import request from 'supertest';

describe('UserController', () => {

      let server: express.Express;

      beforeAll(async () => {
        server = express();
        server.use(bodyParser.json());
        useExpressServer(server, {
          routePrefix: '/api',
          classTransformer: true,
          controllers: [BaseController], // we specify controllers we want to use
          middlewares: [GlobalErrorHandler],
          defaultErrorHandler: false,
        });
      });

      afterEach(() => {
        jest.restoreAllMocks();
      });

      it('postOne', () => {
        const userController = new BaseController();
        const testBody = {
          city: 'SPb',
        };
        const res = userController.postOne(1, testBody as Info);
        expect(res)
            .toBeDefined();
      });

      it('postOne with validations', done => {
        request(server)
            .post('/api/users/1')
            .send({
              country: 'Russia',
              city: 'SPb',
            } as Info)
            .expect(204)
            .end((err: any, res: any) => {
              if (err) {
                throw new Error(JSON.stringify(res.body));
              }
              done();
            });
      });

    },
);
