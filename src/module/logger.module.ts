import { DynamicModule, Module, Global } from '@nestjs/common';
import { Logger } from '../service/logger.service';
import { LOGGER_MODULE_NEST_PROVIDER } from '../constants/logger.contants';
import { LoggerOptions } from '../types';

@Global()
@Module({})
export class LoggerModule {
  static forRoot(options: LoggerOptions = {}): DynamicModule {
    // Set Global options into Logger Service.
    Logger.setGlobalOptions(options);

    const loggerProvider = {
      provide: options.providerName || LOGGER_MODULE_NEST_PROVIDER,
      useFactory: () => {
        return new Logger(options);
      },
    };

    return {
      module: LoggerModule,
      providers: [loggerProvider],
      exports: [loggerProvider],
    };
  }
}
