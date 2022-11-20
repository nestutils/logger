import { Injectable } from '@nestjs/common';
import { LoggerService } from '@nestjs/common';
import { createLogger } from 'winston';
import { LoggerOptions } from '../types';
import {
  getRequiredLoggerOptions,
  getWinstonLogger,
  isStringContainsPlaceholder,
} from '../utils/winston.utils';

@Injectable()
export class Logger implements LoggerService {
  private logger = createLogger();
  private static globalLoggerOptions = {};
  private currentOptions = getRequiredLoggerOptions({});

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
    this.currentOptions = getRequiredLoggerOptions(options);
    // Create New Instance of Logger & set it in current instance.
    this.logger = getWinstonLogger(this.currentOptions);
  }

  public log(message: any, ...data: any[]) {
    this.info(message, ...data);
  }

  public info(message: any, ...data: any[]) {
    const isPlaceholdersAvailableInMessage =
      isStringContainsPlaceholder(message);
    // If Message Itself contains placeholder, then treat data as placeholders.
    if (isPlaceholdersAvailableInMessage) {
      this.logger.info(message, ...data, {
        context: this.currentOptions.context,
      });
    }
    // If Message does not have any placeholders, but additional data is provided.
    else if (data && data.length > 0) {
      const currentContext = data[0];
      let otherItems = data.slice(1);
      this.logger.info(message, ...otherItems, { context: currentContext });
    } else {
      this.logger.info(message, { context: this.currentOptions.context });
    }
  }

  public debug(message: any, ...data: any[]) {
    const isPlaceholdersAvailableInMessage =
      isStringContainsPlaceholder(message);
    // If Message Itself contains placeholder, then treat data as placeholders.
    if (isPlaceholdersAvailableInMessage) {
      this.logger.debug(message, ...data, {
        context: this.currentOptions.context,
      });
    }
    // If Message does not have any placeholders, but additional data is provided.
    else if (data && data.length > 0) {
      const currentContext = data[0];
      let otherItems = data.slice(1);
      this.logger.debug(message, ...otherItems, { context: currentContext });
    } else {
      this.logger.debug(message, { context: this.currentOptions.context });
    }
  }

  public verbose(message: any, ...data: any[]) {
    const isPlaceholdersAvailableInMessage =
      isStringContainsPlaceholder(message);
    // If Message Itself contains placeholder, then treat data as placeholders.
    if (isPlaceholdersAvailableInMessage) {
      this.logger.verbose(message, ...data, {
        context: this.currentOptions.context,
      });
    }
    // If Message does not have any placeholders, but additional data is provided.
    else if (data && data.length > 0) {
      const currentContext = data[0];
      let otherItems = data.slice(1);
      this.logger.verbose(message, ...otherItems, { context: currentContext });
    } else {
      this.logger.verbose(message, { context: this.currentOptions.context });
    }
  }

  public warn(message: any, ...data: any[]) {
    const isPlaceholdersAvailableInMessage =
      isStringContainsPlaceholder(message);
    // If Message Itself contains placeholder, then treat data as placeholders.
    if (isPlaceholdersAvailableInMessage) {
      this.logger.warn(message, ...data, {
        context: this.currentOptions.context,
      });
    }
    // If Message does not have any placeholders, but additional data is provided.
    else if (data && data.length > 0) {
      const currentContext = data[0];
      let otherItems = data.slice(1);
      this.logger.warn(message, ...otherItems, { context: currentContext });
    } else {
      this.logger.warn(message, { context: this.currentOptions.context });
    }
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
      this.logger.error(
        message,
        { trace },
        { context: this.currentOptions.context },
      );
    }
  }

  public alert(message: any, trace?: string) {
    // If Message is an error instance, then print it beautifully.
    if (message instanceof Error) {
      const { message: msg, name, stack, ...meta } = message;
      this.logger.alert(
        msg,
        {
          stack: [trace || message.stack],
          ...meta,
        },
        { context: this.currentOptions.context },
      );
    } else {
      this.logger.alert(
        message,
        { trace },
        { context: this.currentOptions.context },
      );
    }
  }
}
