import { Format } from 'logform';
import {
  DEFAULT_HANDLER_NAME,
  WINSTON_MODULE_NEST_PROVIDER,
} from '../constants/winston.contants';
import { LogFormat, LoggerOptions, LogLevels } from '../types';
import { Logger, createLogger, transports, format } from 'winston';

/**
 * create a new instance of winston by the options provided.
 * @param options logger options.
 * @returns new instance of winston logger.
 */
export const getWinstonLogger = (
  loggingOptions: Required<LoggerOptions>,
): Logger => {
  // Initialize Formatting Options, Used By Logger.
  let formattingOptions: Format[] = [];
  if (loggingOptions.timestamp) {
    // If format of timestamp is provided, then use it
    if (typeof loggingOptions.timestamp === 'string') {
      formattingOptions.push(
        format.timestamp({ format: loggingOptions.timestamp }),
      );
    }
    // otherwise keep default format of timestamp.
    else {
      formattingOptions.push(format.timestamp());
    }
  }
  if (loggingOptions.useStringInterpolation) {
    formattingOptions.push(format.splat());
  }
  if (loggingOptions.logFormat === LogFormat.SIMPLE) {
    formattingOptions.push(format.simple());
  } else {
    formattingOptions.push(format.json());
  }

  return createLogger({
    // For Printing into console.
    transports: [new transports.Console()],
    defaultMeta: {},
    format: format.combine(...formattingOptions),
    exitOnError: false,
    level: loggingOptions.allowedLogLevels,
  });
};

/**
 * Converts Partial logger options to fully qualified logging options.
 * @param options
 */
export const getRequiredLoggerOptions = (
  options: LoggerOptions = {},
): Required<LoggerOptions> => {
  // Default Logging Options.
  let defaultOptions: Required<LoggerOptions> = {
    timestamp: true,
    useStringInterpolation: true,
    logFormat: LogFormat.JSON,
    context: DEFAULT_HANDLER_NAME,
    defaultLoggingContext: DEFAULT_HANDLER_NAME,
    allowedLogLevels: LogLevels.debug,
    providerName: WINSTON_MODULE_NEST_PROVIDER,
  };

  return {
    ...defaultOptions,
    ...options,
    context:
      options.context || options.defaultLoggingContext || DEFAULT_HANDLER_NAME,
  };
};

/**
 * Captures the number of format (i.e. %s strings) in a given string.
 * @type {RegExp}
 */
export const formatRegExp: RegExp = /%[scdjifoO%]/g;

/**
 * Captures the number of escaped % signs in a format string (i.e. %s strings).
 * @type {RegExp}
 */
export const escapedPercent: RegExp = /%%/g;

/**
 * Checks if a string contains placeholders or not.
 * @param value
 * @returns
 */
export const isStringContainsPlaceholder = (value: string) => {
  if ('string' !== typeof value) {
    return false;
  }

  // Calculates Percents, which needs to be escaed.
  const percents = value.match(escapedPercent);
  const escapes = (percents && percents.length) || 0;

  // Calculate Total Percents.
  const tokens = (value && value.match && value.match(formatRegExp)) || [];

  // The expected splat is the number of tokens minus the number of escapes
  const expectedSplat = tokens.length - escapes;

  return expectedSplat > 0;
};
