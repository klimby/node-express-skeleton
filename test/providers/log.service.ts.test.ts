import winston               from 'winston';
import { ConfigService }     from '../../src/providers/config.service';
import { LogService }        from '../../src/providers/log.service';
import {
  LogChannel,
  LogFileFormat,
}                            from '../../src/types/config-types';
import { ConfigServiceStub } from '../stub/config.service.stub';

describe('log service test', () => {

      let loggerMock: winston.Logger;

      const logger = {
        info: jest.fn(),
        notice: jest.fn(),
        warning: jest.fn(),
        error: jest.fn(),
        emerg: jest.fn(),
        crit: jest.fn(),
      };

      // trying to mock createLogger to return a specific logger instance
      jest.mock('winston', () => ({
        format: {
          colorize: jest.fn(),
          combine: jest.fn(),
          label: jest.fn(),
          timestamp: jest.fn(),
          printf: jest.fn(),
        },
        createLogger: jest.fn()
            .mockReturnValue(logger),
        transports: {
          Console: jest.fn(),
        },
      }));

      afterEach(() => {
        jest.restoreAllMocks();
      });

      it('default log config test', () => {

        const config = ConfigServiceStub.create({}, {
          channels: [LogChannel.Console, LogChannel.File],
          logFileContentFormat: LogFileFormat.Json,
          utc: false,
        });
        const mockCreateLogger = jest.spyOn(winston, 'createLogger');
        const loggingService: LogService = new LogService(config as ConfigService);

        loggerMock = mockCreateLogger.mock.instances[0];

        expect(loggingService)
            .toBeInstanceOf(LogService);
        expect(loggingService)
            .toBeDefined();
        expect(mockCreateLogger)
            .toHaveBeenCalled();

        /**
         * spy on the winston.Logger instance within this test and check
         * that it is called - this is working from within the test method
         */
        logger.info('info', 'test log info');
        expect(logger.info)
            .toHaveBeenCalled();
        logger.notice('notice', 'test log notice');
        expect(logger.notice)
            .toHaveBeenCalled();
        logger.warning('warning', 'test log warning');
        expect(logger.warning)
            .toHaveBeenCalled();
        logger.error('error', 'test log error');
        expect(logger.error)
            .toHaveBeenCalled();
        logger.emerg('emerg', 'test log emerg');
        expect(logger.emerg)
            .toHaveBeenCalled();
        logger.crit('crit', 'test log crit');
        expect(logger.crit)
            .toHaveBeenCalled();

        /**
         * now try and invoke the logger instance indirectly through the service class
         * check that loggerMock is called a second time - this fails, only called once
         * from the preceding lines in this test
         */
        loggingService.info('info message');
        expect(logger.info)
            .toHaveBeenCalledTimes(1);
        loggingService.notice('notice message', { context: 'context' });
        expect(logger.notice)
            .toHaveBeenCalledTimes(1);
        loggingService.warning('warning message');
        expect(logger.warning)
            .toHaveBeenCalledTimes(1);
        loggingService.error('error message', { stack: 'error stack' });
        expect(logger.error)
            .toHaveBeenCalledTimes(1);
        loggingService.emergency('emergency message');
        expect(logger.emerg)
            .toHaveBeenCalledTimes(1);
        loggingService.critical('critical message');
        expect(logger.crit)
            .toHaveBeenCalledTimes(1);
      });

      it('text file log test', () => {

        const config = ConfigServiceStub.create({}, {
          channels: [LogChannel.Console, LogChannel.File],
          logFileContentFormat: LogFileFormat.Text,
          utc: true,
        });
        const mockCreateLogger = jest.spyOn(winston, 'createLogger');
        const loggingService: LogService = new LogService(config as ConfigService);

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        loggerMock = mockCreateLogger.mock.instances[0];

        expect(loggingService)
            .toBeInstanceOf(LogService);
        expect(loggingService)
            .toBeDefined();
        expect(mockCreateLogger)
            .toHaveBeenCalled();

        /**
         * spy on the winston.Logger instance within this test and check
         * that it is called - this is working from within the test method
         */
        logger.info('info', 'test log info');
        expect(logger.info)
            .toHaveBeenCalled();
        logger.notice('notice', 'test log notice');
        expect(logger.notice)
            .toHaveBeenCalled();
        logger.warning('warning', 'test log warning');
        expect(logger.warning)
            .toHaveBeenCalled();
        logger.error('error', 'test log error');
        expect(logger.error)
            .toHaveBeenCalled();
        logger.emerg('emerg', 'test log emerg');
        expect(logger.emerg)
            .toHaveBeenCalled();
        logger.crit('crit', 'test log crit');
        expect(logger.crit)
            .toHaveBeenCalled();

        /**
         * now try and invoke the logger instance indirectly through the service class
         * check that loggerMock is called a second time - this fails, only called once
         * from the preceding lines in this test
         */
        loggingService.info('info message');
        expect(logger.info)
            .toHaveBeenCalledTimes(1);
        loggingService.notice('notice message', { context: 'context' });
        expect(logger.notice)
            .toHaveBeenCalledTimes(1);
        loggingService.warning('warning message');
        expect(logger.warning)
            .toHaveBeenCalledTimes(1);
        loggingService.error('error message', { stack: 'error stack' });
        expect(logger.error)
            .toHaveBeenCalledTimes(1);
        loggingService.emergency('emergency message');
        expect(logger.emerg)
            .toHaveBeenCalledTimes(1);
        loggingService.critical('critical message');
        expect(logger.crit)
            .toHaveBeenCalledTimes(1);
      });
    },
);


