import { Module } from '@nestjs/common';
import { SimpleBankController } from './controller/simple-bank.controller';
import { SimpleBankService } from './service/simple-bank.service';

@Module({
  controllers: [SimpleBankController],
  providers: [SimpleBankService],
})
export class SimpleBankModule {}
