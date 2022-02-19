import { Application }       from 'express';
import request               from 'supertest';
import { AppService }        from '../../src/providers/app.service';
import { ConfigServiceStub } from '../stub/config.service.stub';
import { LogServiceStub }    from '../stub/log.service.stub';

describe('example routes test', () => {

      let server: Application;

      beforeAll(async () => {
        const config = ConfigServiceStub.create({});
        const log = LogServiceStub.create();
        const app = new AppService(config, log);
        server = app.express;
      });

      afterEach(() => {
        jest.restoreAllMocks();
      });

      it('get all', async () => {
        const response = await request(server)
            .get('/api/examples')
            .set('Accept', 'application/json');

        expect(response.status)
            .toEqual(200);
        expect(response.headers['content-type'])
            .toMatch(/json/);
        expect(response.body)
            .toHaveProperty('data');
        expect(response.body)
            .toHaveProperty('meta');
        expect(Array.isArray(response.body.data))
            .toBeTruthy();
      });

      it('get by id', async () => {
        const response = await request(server)
            .get('/api/examples/1')
            .set('Accept', 'application/json');

        expect(response.status)
            .toEqual(200);
        expect(response.headers['content-type'])
            .toMatch(/json/);
        expect(response.body)
            .toHaveProperty('data');
        expect(response.body)
            .toHaveProperty('meta');
        expect(response.body)
            .toHaveProperty('data.name');
        expect(response.body)
            .toHaveProperty('data.description');
        expect(response.body)
            .toHaveProperty('data.id', 1);
      });

      it('create example', async () => {
        const response = await request(server)
            .post('/api/examples')
            .set('Accept', 'application/json')
            .send({
              name: 'name',
              description: 'description',
            });

        expect(response.status)
            .toEqual(200);
        expect(response.headers['content-type'])
            .toMatch(/json/);
        expect(response.body)
            .toHaveProperty('data.name', 'name');
        expect(response.body)
            .toHaveProperty('data.description', 'description');
        expect(response.body)
            .toHaveProperty('data.id');
      });

      it('update example', async () => {
        const response = await request(server)
            .put('/api/examples/1')
            .set('Accept', 'application/json')
            .send({
              name: 'name 2',
              description: 'description 2',
            });

        expect(response.status)
            .toEqual(200);
        expect(response.headers['content-type'])
            .toMatch(/json/);
        expect(response.body)
            .toHaveProperty('data.name', 'name 2');
        expect(response.body)
            .toHaveProperty('data.description', 'description 2');
        expect(response.body)
            .toHaveProperty('data.id', 1);
      });

      it('delete example', async () => {

        const response = await request(server)
            .delete('/api/examples/1')
            .set('Accept', 'application/json');

        expect(response.status)
            .toEqual(204);
      });

      it('not found model', async () => {
        const response = await request(server)
            .delete('/api/examples/100')
            .set('Accept', 'application/json');

        expect(response.status)
            .toEqual(404);
      });

    },
);
