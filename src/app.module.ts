import { Module, ValidationPipe } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { configValidate } from './utils/config.validate';
import { DatabaseModule } from './database/database.module';
import { AccountModule } from './account/account.module';
import { APP_FILTER, APP_PIPE } from '@nestjs/core';
import { AllExceptionsFilter } from './utils/filters/all-exceptions.filter';

@Module({})
export class AppModule {
  static register({ shouldValidate = true }: { shouldValidate: boolean }) {
    const imports = [
      ConfigModule.forRoot({
        isGlobal: true,
        validate: shouldValidate && configValidate,
      }),
      DatabaseModule,
      AccountModule,
    ];
    const controllers = [];
    const providers = [
      {
        provide: APP_FILTER,
        useClass: AllExceptionsFilter,
      },
      {
        provide: APP_PIPE,
        useClass: ValidationPipe,
      },
    ];
    return {
      module: AppModule,
      imports,
      providers,
      controllers,
    };
  }
}
