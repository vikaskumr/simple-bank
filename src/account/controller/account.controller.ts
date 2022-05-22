import { Body, Controller, Get, Post } from '@nestjs/common';
import { AccountI } from '../models/account.interface';
import { AccountService } from '../service/account.service';

@Controller('accounts')
export class AccountController {
  constructor(private accountService: AccountService) {}

  @Post()
  public async add(@Body() account: AccountI): Promise<AccountI> {
    return this.accountService.add(account);
  }

  @Get()
  public async findAll(): Promise<AccountI[]> {
    return this.accountService.findAll();
  }
}
