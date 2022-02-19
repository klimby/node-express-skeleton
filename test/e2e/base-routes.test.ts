import { Application }       from 'express';
import request               from 'supertest';
import { AppService }        from '../../src/providers/app.service';
import { ConfigServiceStub } from '../stub/config.service.stub';
import { LogServiceStub }    from '../stub/log.service.stub';

describe('base routes test', () => {

      let server: Application;
      const appName = 'app';
      const version = '1.0.0';

      beforeAll(async () => {
        const config = ConfigServiceStub.create({
          appName,
          version,
        });
        const log = LogServiceStub.create();
        const app = new AppService(config, log);
        server = app.express;
      });

      afterEach(() => {
        jest.restoreAllMocks();
      });

      it('get base version json', async () => {
        const response = await request(server)
            .get('/')
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
        ;

        expect(response.status)
            .toEqual(200);
        expect(response.headers['content-type'])
            .toMatch(/json/);
        expect(response.body)
            .toHaveProperty('name', appName);
        expect(response.body)
            .toHaveProperty('version', version);
      });

      it('get base version text', async () => {
        const response = await request(server)
            .get('/');

        expect(response.status)
            .toEqual(200);
        expect(response.headers['content-type'])
            .toMatch(/text\/html/);
        expect(response.text)
            .toBe(`${appName}. v.${version}`);
      });

      it('get version json', async () => {
        const response = await request(server)
            .get('/version')
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
        ;

        expect(response.status)
            .toEqual(200);
        expect(response.headers['content-type'])
            .toMatch(/json/);
        expect(response.body)
            .toHaveProperty('name', appName);
        expect(response.body)
            .toHaveProperty('version', version);
      });

      it('get api version json', async () => {
        const response = await request(server)
            .get('/api/version')
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
        ;

        expect(response.status)
            .toEqual(200);
        expect(response.headers['content-type'])
            .toMatch(/json/);
        expect(response.body)
            .toHaveProperty('name', appName);
        expect(response.body)
            .toHaveProperty('version', version);
      });

      it('404 error', async () => {
        const response = await request(server)
            .get('/api/asdasdasdadsdsdad')
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
        ;

        expect(response.status)
            .toEqual(404);
      });

    },
);
