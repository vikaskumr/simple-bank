import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { configValidate } from './utils/config.validate';
import { DatabaseModule } from './database/database.module';
import { AccountModule } from './account/account.module';

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
    const controllers = [AppController];
    const providers = [AppService];
    return {
      module: AppModule,
      imports,
      providers,
      controllers,
    };
  }
}
