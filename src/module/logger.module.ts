import { DynamicModule, Module, Global } from '@nestjs/common';
import { Logger } from '../logger/logger';
import {
  WINSTON_MODULE_NEST_PROVIDER,
  WINSTON_MODULE_PROVIDER,
} from '../constants/winston.contants';
import { LoggerOptions } from '../types';

@Global()
@Module({})
export class LoggerModule {
  static forRoot(options: LoggerOptions = {}): DynamicModule {
    // Set Global options into Winston Logger Service.
    Logger.setGlobalOptions(options);

    const winstonProvider = {
      provide: WINSTON_MODULE_NEST_PROVIDER,
      useFactory: () => {
        return new Logger();
      },
      inject: [WINSTON_MODULE_PROVIDER],
    };

    return {
      module: LoggerModule,
      providers: [winstonProvider],
      exports: [winstonProvider],
    };
  }
}
