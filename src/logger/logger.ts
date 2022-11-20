import { Injectable } from '@nestjs/common';
import { LoggerService } from '@nestjs/common';
import { createLogger } from 'winston';
import { LoggerOptions } from '../types';
import { getWinstonLogger } from '../utils/winston.utils';

@Injectable()
export class Logger implements LoggerService {
  private logger = createLogger();
  private static globalLoggerOptions = {};

  constructor(options: LoggerOptions = {}) {
    // Create New Instance of Logger & set it in current instance.
    this.updateLoggingOptions(options);
  }

  public static setGlobalOptions(options: LoggerOptions) {
    this.globalLoggerOptions = options;
  }

  public updateLoggingOptions(options: LoggerOptions) {
    // Merge Currently Provided Options With Global Options.
    // globalLoggerOptions will be on higher priority then local options.
    options = { ...options, ...Logger.globalLoggerOptions };
    // Create New Instance of Logger & set it in current instance.
    this.logger = getWinstonLogger(options);
  }

  public log(message: any, ...data: any[]) {
    this.info(message, ...data);
  }

  public info(message: any, ...data: any[]) {
    this.logger.info(message, ...data);
  }

  public debug(message: any, ...data: any[]) {
    this.logger.debug(message, ...data);
  }

  public verbose(message: any, ...data: any[]) {
    this.debug(message, ...data);
  }

  public warn(message: any, ...data: any[]) {
    this.logger.warn(message, ...data);
  }

  public error(message: any, trace?: string) {
    // If Message is an error instance, then print it beautifully.
    if (message instanceof Error) {
      const { message: msg, name, stack, ...meta } = message;
      this.logger.error(msg, {
        stack: [trace || message.stack],
        ...meta,
      });
    } else {
      this.logger.error(message, trace);
    }
  }

  public alert(message: any, trace?: string) {
    // If Message is an error instance, then print it beautifully.
    if (message instanceof Error) {
      const { message: msg, name, stack, ...meta } = message;
      this.logger.alert(msg, {
        stack: [trace || message.stack],
        ...meta,
      });
    } else {
      this.logger.alert(message, trace);
    }
  }
}
