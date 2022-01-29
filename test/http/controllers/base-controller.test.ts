import { BaseController } from 'src/http/controllers';
import { Info }           from 'src/models';

describe('UserController', () => {
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
            .toBeUndefined();
      });
    },
);
