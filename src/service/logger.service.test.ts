import { Logger } from './logger.service';
import 'jest';

describe('logger util test without providing the global options', () => {
  const loggerService = new Logger({
    context: 'TestContext',
  });

  // Save the original console.log function
  const originalConsoleLog = console.log;
  // Create a mock function to replace console.log
  let mockedConsoleLog = jest.fn();

  beforeEach(() => {
    // Replace console.log with the mocked function
    mockedConsoleLog = jest.fn();
    console.log = mockedConsoleLog;
  });

  afterAll(() => {
    // Restore the original console.log function
    console.log = originalConsoleLog;
  });

  test('must print the debug log on console', () => {
    loggerService.debug('Debug Message');
    // Assert that console.log was called
    expect(mockedConsoleLog).toHaveBeenCalled();

    // Get the first argument passed to console.log
    const printedString = mockedConsoleLog.mock.calls[0][0];

    // Assert that the printed string contains the expected substring
    expect(printedString).toContain('Debug Message');
    expect(printedString).toContain('debug');
    expect(printedString).toContain('timestamp');
  });

  test('must print the info log on console', () => {
    loggerService.log('Hi User');
    // Assert that console.log was called
    expect(mockedConsoleLog).toHaveBeenCalled();

    // Get the first argument passed to console.log
    const printedString = mockedConsoleLog.mock.calls[0][0];

    // Assert that the printed string contains the expected substring
    expect(printedString).toContain('Hi User');
    expect(printedString).toContain('info');
    expect(printedString).toContain('timestamp');
  });

  test('must print the info log on console', () => {
    loggerService.info('Info Message');
    // Assert that console.log was called
    expect(mockedConsoleLog).toHaveBeenCalled();

    // Get the first argument passed to console.log
    const printedString = mockedConsoleLog.mock.calls[0][0];

    // Assert that the printed string contains the expected substring
    expect(printedString).toContain('Info Message');
    expect(printedString).toContain('info');
    expect(printedString).toContain('timestamp');
  });

  test('must print the warn log on console', () => {
    loggerService.warn('Warning Message');
    // Assert that console.log was called
    expect(mockedConsoleLog).toHaveBeenCalled();

    // Get the first argument passed to console.log
    const printedString = mockedConsoleLog.mock.calls[0][0];

    // Assert that the printed string contains the expected substring
    expect(printedString).toContain('Warning Message');
    expect(printedString).toContain('warn');
    expect(printedString).toContain('timestamp');
  });

  test('must print the error log on console', () => {
    loggerService.error('Error Message');
    // Assert that console.log was called
    expect(mockedConsoleLog).toHaveBeenCalled();

    // Get the first argument passed to console.log
    const printedString = mockedConsoleLog.mock.calls[0][0];

    // Assert that the printed string contains the expected substring
    expect(printedString).toContain('Error Message');
    expect(printedString).toContain('error');
    expect(printedString).toContain('timestamp');
  });

  test('must print the error message and stacktrace on console', () => {
    let error = new Error('Default Error Message');
    error.stack = 'Error StackTrace At Line 5';
    loggerService.error(error);
    // Assert that console.log was called
    expect(mockedConsoleLog).toHaveBeenCalled();

    // Get the first argument passed to console.log
    const printedString = mockedConsoleLog.mock.calls[0][0];

    // Assert that the printed string contains the expected substring
    expect(printedString).toContain('Default Error Message');
    expect(printedString).toContain('Error StackTrace At Line 5');
    expect(printedString).toContain('stack');
  });
});

describe('logger util test with providing the global options', () => {
  const globalOptions = {
    context: 'GlobalContext',
    timestamp: false,
  };

  Logger.setGlobalOptions(globalOptions);

  const loggerService = new Logger();

  // Save the original console.log function
  const originalConsoleLog = console.log;
  // Create a mock function to replace console.log
  let mockedConsoleLog = jest.fn();

  beforeEach(() => {
    // Replace console.log with the mocked function
    mockedConsoleLog = jest.fn();
    console.log = mockedConsoleLog;
  });

  afterAll(() => {
    // Restore the original console.log function
    console.log = originalConsoleLog;
  });

  test('must not contain timestamp field', () => {
    loggerService.debug('Debug Message');
    // Assert that console.log was called
    expect(mockedConsoleLog).toHaveBeenCalled();

    // Get the first argument passed to console.log
    const printedString = mockedConsoleLog.mock.calls[0][0];

    // Assert that the printed string contains the expected substring
    expect(printedString).toContain('Debug Message');
    expect(printedString).not.toContain('timestamp');
  });
});
