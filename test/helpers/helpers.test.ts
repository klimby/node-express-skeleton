import { Request } from 'express-serve-static-core';
import { Helpers } from '../../src/helpers/helpers';

describe('helpers test', () => {

      it('isJsonRequest test', () => {
        const mockRequest = new MockRequest() as unknown as Request;
        expect(Helpers.isJsonRequest(mockRequest))
            .toBeTruthy();
      });

      it('clearErrorStack test', () => {
        const string = ' asd   qwerty';
        const result = Helpers.clearErrorStack(string, 10);

        expect(result)
            .toEqual('asd...');
      });
    },
);

class MockRequest {

  xhr = true;
  contentType = 'application/json';
  acceptsValue = true;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  header(s: unknown): string {
    return this.contentType;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  accepts(s: unknown): string | boolean {
    return this.acceptsValue;
  }
}
