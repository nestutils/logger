import { Injectable } from '@nestjs/common';
import { LoggerService } from '@nestjs/common';
import { LogLevels, LoggerOptions } from '../types';
import { LoggerUtils } from '../utils/logger.util';

@Injectable()
export class Logger implements LoggerService {
  private loggerUtil = new LoggerUtils();
  private loggerOptions: Required<LoggerOptions>;
  private static globalLoggerOptions = Logger.buildDefaultLoggerOptions({});

  /**
   * Sets the default global logging properties of logger
   * @param options A Javascript Object, which contains the default global properties of logger
   */
  public static setGlobalOptions(options: LoggerOptions) {
    this.globalLoggerOptions = Logger.buildDefaultLoggerOptions(options);
  }

  /**
   * Create a new object of Logger
   * @param options A Javascript Object, which contains the properties of logger
   */
  constructor(options: LoggerOptions = {}) {
    // Create New Instance of Logger & set it in current instance.
    this.loggerOptions = {
      timestamp:
        options.timestamp === false
          ? false
          : Logger.globalLoggerOptions.timestamp,
      context: options.context || Logger.globalLoggerOptions.context,
      providerName:
        options.providerName || Logger.globalLoggerOptions.providerName,
    };
  }

  /**
   * Method is used to create the logger options with default parameters.
   * @param options A Javascript Object, which contains the properties of logger
   * @returns Logger properties with all the parameters filled with provided or default values
   */
  private static buildDefaultLoggerOptions(
    options: LoggerOptions,
  ): Required<LoggerOptions> {
    return {
      timestamp: options.timestamp === false ? false : true,
      context: options.context || 'unknown',
      providerName: options.providerName || '',
    };
  }

  /**
   * Method is used to log the given message to console with additional parameters
   * @param logLevel Level of log, it can be debug, info, warn or error
   * @param message Log message, which needs to be printed
   * @param data data paremeters with needs to be printed along with message
   * @param meta Additional Metadata about log message
   */
  private logMessage(
    logLevel: LogLevels,
    message: any,
    data: any[],
    meta: any = {},
  ): void {
    let messageString = this.loggerUtil.getLoggableObject(message, data);
    let timestampString = this.loggerOptions.timestamp
      ? new Date().toISOString()
      : undefined;
    const finalLoggingObject = {
      level: logLevel,
      timestamp: timestampString,
      context: this.loggerOptions.context,
      message: messageString,
      ...meta,
    };
    console.log(JSON.stringify(finalLoggingObject));
  }

  /**
   * Prints the given message and data parameters to console with the debug level
   * @param message Log message, which needs to be printed
   * @param data data paremeters with needs to be printed along with message
   */
  public debug(message: any, ...data: any[]) {
    this.logMessage(LogLevels.debug, message, data);
  }

  /**
   * Prints the given message and data parameters to console with the info level
   * @param message Log message, which needs to be printed
   * @param data data paremeters with needs to be printed along with message
   * @deprecated This method is deprecated and will be removed in next major release. Instead of log, use info method, which have the same functionality.
   */
  public log(message: any, ...data: any[]) {
    this.info(message, ...data);
  }

  /**
   * Prints the given message and data parameters to console with the info level
   * @param message Log message, which needs to be printed
   * @param data data paremeters with needs to be printed along with message
   */
  public info(message: any, ...data: any[]) {
    this.logMessage(LogLevels.info, message, data);
  }

  /**
   * Prints the given message and data parameters to console with the warn level
   * @param message Log message, which needs to be printed
   * @param data data paremeters with needs to be printed along with message
   */
  public warn(message: any, ...data: any[]) {
    this.logMessage(LogLevels.warn, message, data);
  }

  /**
   * Prints the given message and data parameters to console with the error level
   * @param message Log message, which needs to be printed
   * @param data data paremeters with needs to be printed along with message
   */
  public error(message: any, ...data: any[]) {
    // If Message is an error instance, then print it beautifully.
    if (message instanceof Error) {
      const { message: msg, name, stack, ...meta } = message;
      this.logMessage(LogLevels.error, msg, data, { stack, ...meta });
    } else {
      this.logMessage(LogLevels.error, message, data);
    }
  }
}
