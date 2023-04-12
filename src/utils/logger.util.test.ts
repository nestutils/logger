import { LoggerUtils } from './logger.util';
import 'jest';

describe('logger util test', () => {
  const loggerUtils = new LoggerUtils();

  test('must return the same string', () => {
    expect(loggerUtils.getLoggableObject('Test Message')).toEqual(
      'Test Message',
    );
  });

  test('must return the same string with empty array', () => {
    expect(loggerUtils.getLoggableObject('Test Message', [])).toEqual(
      'Test Message',
    );
  });

  test('must return stringified object', () => {
    expect(
      loggerUtils.getLoggableObject({ packageName: '@nestutils/logger' }),
    ).toEqual('{"packageName":"@nestutils/logger"}');
  });

  test('must replace string correctly', () => {
    expect(loggerUtils.getLoggableObject('Test Message {}', ['Hello'])).toEqual(
      'Test Message Hello',
    );
  });

  test('must replace numbers string correctly', () => {
    expect(loggerUtils.getLoggableObject('Test Message {}', ['0'])).toEqual(
      'Test Message 0',
    );
    expect(loggerUtils.getLoggableObject('Test Message {}', ['123'])).toEqual(
      'Test Message 123',
    );
  });

  test('must replace numbers correctly', () => {
    expect(loggerUtils.getLoggableObject('Test Message {}', [0])).toEqual(
      'Test Message 0',
    );
    expect(loggerUtils.getLoggableObject('Test Message {}', [123])).toEqual(
      'Test Message 123',
    );
  });

  test('must replace additional parameters correctly', () => {
    expect(
      loggerUtils.getLoggableObject('Test Message {}', [0, 'Next']),
    ).toEqual('Test Message 0 Next');
    expect(
      loggerUtils.getLoggableObject('Test Message {}', ['123', 'Another']),
    ).toEqual('Test Message 123 Another');
  });

  test('should print null and undefined correctly', () => {
    expect(
      loggerUtils.getLoggableObject('Test Message {}', [0, undefined, 1]),
    ).toEqual('Test Message 0 undefined 1');
    expect(loggerUtils.getLoggableObject('Test Message {}', [null])).toEqual(
      'Test Message null',
    );
  });
});
