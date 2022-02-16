import appConfig from '../../src/providers/app-config';

describe('app config test', () => {

      beforeAll(async () => {
        appConfig.init();
      });

      afterEach(() => {
        jest.restoreAllMocks();
      });

      it('config env test', () => {
        expect(appConfig.isDevelopment)
            .toBeFalsy();
        expect(appConfig.isTesting)
            .toBeTruthy();
        expect(appConfig.isProduction)
            .toBeFalsy();
      });

      it('config test', () => {
        expect(appConfig.locale)
            .toEqual('en');
      });

    },
);
