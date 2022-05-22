import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AccountEntity } from '../models/account.entity';
import { AccountI } from '../models/account.interface';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(AccountEntity)
    private accountRepository: Repository<AccountEntity>,
  ) {}

  public async add(account: AccountI): Promise<AccountI> {
    return this.accountRepository.save(account);
  }

  public async findAll(): Promise<AccountI[]> {
    return this.accountRepository.find();
  }
}
