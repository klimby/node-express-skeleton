import { RequestCodes } from '../../src/helpers/request-codes';
import { Locales }      from '../../src/types/common-types';

describe('helper request code test', () => {

      it('get Request By Code test', () => {
        const codesMap = RequestCodes['_getCodes']();
        for (const [code, value] of codesMap) {
          const result = RequestCodes.getRequestByCode(code, Locales.en);
          expect(result)
              .toEqual(value.en);
        }
      });
    },
);
