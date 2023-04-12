import { Provider } from '@nestjs/common';
import { LoggerModule } from './logger.module';

describe('logger module test', () => {
  test('forRoot Method Test', () => {
    let module = LoggerModule.forRoot({});
    expect(module.providers?.length).toBe(1);
    expect(module.exports?.length).toBe(1);
  });
});
