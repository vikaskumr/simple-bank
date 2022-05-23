import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AccountEntity } from '../models/account.entity';
import { AccountI } from '../models/account.interface';

@Injectable()
export class AccountService {
  public logger;
  constructor(
    @InjectRepository(AccountEntity)
    private accountRepository: Repository<AccountEntity>,
  ) {
    this.logger = new Logger(AccountService.name);
  }

  public async add(account: AccountI): Promise<AccountI> {
    try {
      return this.accountRepository.save(account);
    } catch (error) {
      this.logger.log('failed to add account', error);
      throw error;
    }
  }

  public async findAll(): Promise<AccountI[]> {
    try {
      return this.accountRepository.find();
    } catch (error) {
      this.logger.log('failed to find accounts', error);
      throw error;
    }
  }

  public async fetchBalance(accountId): Promise<AccountI> {
    try {
      return this.accountRepository.findOne({
        where: {
          account_id: accountId,
        },
      });
    } catch (error) {
      this.logger.log(
        `failed to fetch balance of account with account id: ${accountId}`,
        error,
      );
      throw error;
    }
  }
}
