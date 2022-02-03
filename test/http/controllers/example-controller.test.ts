import bodyParser             from 'body-parser';
import express    from 'express';
import { useExpressServer }   from 'routing-controllers';
import { Example }              from 'src/models/example';
import { ExampleController } from 'src/http/controllers/example-controller';
import request               from 'supertest';

describe('UserController', () => {

      let server: express.Express;

      beforeAll(async () => {
        server = express();
        server.use(bodyParser.json());
        useExpressServer(server, {
          routePrefix: '/api',
          classTransformer: true,
          controllers: [ExampleController], // we specify controllers we want to use
        });
      });

      afterEach(() => {
        jest.restoreAllMocks();
      });

      it('postOne', () => {
        const userController = new ExampleController();
        const testBody = {
          name: 'SPb',
        };
        const res = userController.postOne(1, testBody as Example);
        expect(res)
            .toBeDefined();
      });

      it('postOne with validations', done => {
        request(server)
            .post('/api/users/1')
            .send({
              name: 'Russia',
              description: 'SPb',
            } as Example)
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
