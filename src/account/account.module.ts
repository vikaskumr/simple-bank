import { Module } from '@nestjs/common';
import { AccountController } from './controller/account.controller';
import { AccountService } from './service/account.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountEntity } from './models/account.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AccountEntity])],
  controllers: [AccountController],
  providers: [AccountService],
})
export class AccountModule {}
