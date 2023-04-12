<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

<h1 align="center">@nestutils/logger</h1>

## Description
This NestJS Module works out of the box with NestJS Applications. Currently Providing Feature of transporting logs to console only.

## Installation
In your existing NestJS-based project:
```
$ npm install --save @nestutils/logger
```


## Usage
To configure global options with Logger, it can be registered at AppModule with global configuration options.
```typescript
import { Module } from '@nestjs/common'
import { LoggerModule } from '@nestutils/logger';
@Module({
    imports: [
    LoggerModule.forRoot({
      timestamp: true, // Whether to print timestamp with logs or not.
      defaultLoggingContext: 'DefaultContext', // Default Logging Context, in case if context is not provided, it will be used.
      providerName: 'DefaultProviderName' // Provider Name of current instance, which will be used for DI.
    }),
      ]
})
export class AppModule {}
```

To Use it in some specific portion of application
```typescript
import { Controller, Get, Query } from '@nestjs/common';
import { Logger } from '@nestutils/logger';

@Controller()
export class AppController {
  private readonly logger = new Logger({
    context: AppController.name
  })

  @Get()
  getHello(@Query('name') name: string) {
    this.logger.log('Request Received');
    // Request Received

    this.logger.log('Request Received For {}',name); 
    // Request Received For Joy
  }
}
```

To make this logger as default application logger, edit main.ts file similar below
```typescript
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestutils/logger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule,
     {
    logger: new Logger({
      context: 'NestApplication'
      timestamp: true // Optional Property, true by default.
    })
  }
  );
  await app.listen(3000);
}
bootstrap();
```

## Contributions
Any suggestions, issues, bug-fixes, PR's are most welcomed. Thanks.

## Note
This project is currently in active development 🚧. Breaking changes are expected.