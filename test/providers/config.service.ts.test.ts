import { ConfigService } from '../../src/providers/config.service';
import { AppConfig }     from '../../src/types/config-types';

describe('config service test', () => {

  let config: AppConfig;

      beforeAll(async () => {
        config = new ConfigService();
      });

      afterEach(() => {
        jest.restoreAllMocks();
      });

      it('config env test', () => {
        expect(config.isDevelopment)
            .toBeFalsy();
        expect(config.isTesting)
            .toBeTruthy();
        expect(config.isProduction)
            .toBeFalsy();
      });

      it('config test', () => {
        expect(config.locale)
            .toEqual('en');
        expect(config.appName)
            .toEqual('node-server');
        expect(config.version)
            .toEqual('1.0.0');
      });

    },
);
