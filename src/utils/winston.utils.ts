import { Format } from 'logform';
import { DEFAULT_HANDLER_NAME, WINSTON_MODULE_NEST_PROVIDER } from '../constants/winston.contants';
import { LogFormat, LoggerOptions, LogLevels } from '../types';
import { Logger, createLogger, transports, format } from 'winston';

/**
 * create a new instance of winston by the options provided.
 * @param options logger options.
 * @returns new instance of winston logger.
 */
export const getWinstonLogger = (options: LoggerOptions = {}): Logger => {
  const loggingOptions = getRequiredLoggerOptions(options);

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
    defaultMeta: {
      // Printing handler into logs.
      handler: loggingOptions.context,
    },
    format: format.combine(...formattingOptions),
    exitOnError: false,
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
    providerName: WINSTON_MODULE_NEST_PROVIDER
  };

  return { ...defaultOptions, ...options };
};
