import { ExampleController } from 'src/http/controllers/example-controller';

describe('ExampleController test', () => {

      afterEach(() => {
        jest.restoreAllMocks();
      });

      it('getAll', () => {
        const controller = new ExampleController();
        const res = controller.getAll();
        expect(res)
            .toBeDefined();
      });

      it('getOne', () => {
        const controller = new ExampleController();
        const res = controller.getOne(1);
        expect(res)
            .toBeDefined();
      });

    },
);
