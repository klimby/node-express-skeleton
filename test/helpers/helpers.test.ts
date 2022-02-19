import { Request }       from 'express-serve-static-core';
import { Helpers }       from '../../src/helpers/helpers';
import { ConfigService } from '../../src/providers/config.service';

describe('helpers test', () => {

      it('isJsonRequest test', () => {
        const mockRequest = new MockRequest() as unknown as Request;
        const appConfig = new ConfigService();
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

  header(s: unknown): string {
    return this.contentType;
  }

  accepts(s: unknown): string | boolean {
    return this.acceptsValue;
  }
}
