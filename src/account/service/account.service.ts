import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { AccountEntity } from '../models/account.entity';
import { AccountI } from '../models/account.interface';
import { v4 as uuidv4 } from 'uuid';
import { InsufficientBalanceException } from '../exceptions/insufficient-balance.exception';
import { FromAccountNotFoundException } from '../exceptions/from-account-not-found.exception';
import { ToAccountNotFoundException } from '../exceptions/to-account-not-found.exception';
@Injectable()
export class AccountService {
  public logger;
  constructor(
    @InjectRepository(AccountEntity)
    private accountRepository: Repository<AccountEntity>,
  ) {
    this.logger = new Logger(AccountService.name);
  }

  public async add(accountDetails: AccountI): Promise<AccountI> {
    try {
      accountDetails.accountId = uuidv4();
      return this.accountRepository.save(accountDetails);
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

  public async fetchBalance(accountId: string): Promise<AccountI> {
    try {
      return this.accountRepository.findOne({
        where: {
          accountId,
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

  public async transferMoney(
    fromAccountId: string,
    toAccountId: string,
    transferMoney: number,
  ): Promise<void> {
    try {
      const accounts: AccountI[] = await this.accountRepository.find({
        where: {
          accountId: In([fromAccountId, toAccountId]),
        },
      });

      this.logger.log('accounts', JSON.stringify(accounts, null, 2));

      const fromAccount: AccountI = accounts.find(
        (account) => account.accountId === fromAccountId,
      );

      if (!fromAccount) {
        throw new FromAccountNotFoundException('beneficiary account not found');
      }

      if (fromAccount.balance < transferMoney) {
        throw new InsufficientBalanceException(
          'balance not sufficient in your account to make this transfer',
        );
      }

      const toAccount: AccountI = accounts.find(
        (account) => account.accountId === toAccountId,
      );

      if (!toAccount) {
        throw new ToAccountNotFoundException('recipient account not found');
      }

      fromAccount.balance = fromAccount.balance - transferMoney;
      toAccount.balance = toAccount.balance + transferMoney;

      this.logger.log('fromAccount.balance', fromAccount.balance);
      this.logger.log('toAccount.balance', toAccount.balance);

      this.logger.log('updating accounts as per the money transfers');
      await this.accountRepository.save(fromAccount);
      await this.accountRepository.save(toAccount);
    } catch (error) {
      this.logger.log(
        `failed to transfer money from ${fromAccountId} to ${toAccountId}`,
        error,
      );
      throw error;
    }
  }
}
