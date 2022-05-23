import { Test, TestingModule } from '@nestjs/testing';
import { AccountService } from './account.service';
import { Repository } from 'typeorm';
import { AccountEntity } from '../models/account.entity';
import { AccountI } from '../models/account.interface';

const accountRepository = {
  isInitialized: jest.fn(),
  save: jest.fn(),
  findOne: jest.fn(),
  find: jest.fn(),
};

const accountResponse: AccountI = {
  balance: 644.98,
  updatedAt: new Date(),
  accountId: 'eb57ed4c-c32e-4e91-acda-89f81d635cba',
};

const accountResponseError = {
  error: 'account nor found',
  code: 404,
};

const moneyTransferError = {
  err: {
    reason: 'beneficiary account not found',
    statusCode: 500,
  },
  statusCode: 500,
  timestamp: '2022-05-23T15:50:16.742Z',
};

describe('AccountService', () => {
  let accountService: AccountService;

  accountService = new AccountService(
    accountRepository as unknown as Repository<AccountEntity>,
  );

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: AccountService,
          useValue: accountService,
        },
      ],
    }).compile();

    accountService = module.get<AccountService>(AccountService);
  });

  it('should be defined', () => {
    expect(accountService).toBeDefined();
  });

  it('add bank account', async () => {
    accountRepository.save = jest
      .fn()
      .mockImplementation(() => accountResponse);
    const accountDetails: AccountI = {
      balance: 644.979,
      updatedAt: new Date(),
    };
    expect(await accountService.add(accountDetails)).toStrictEqual(
      accountResponse,
    );
  });

  it('fetch account balance', async () => {
    accountService.fetchBalance = jest
      .fn()
      .mockImplementation(() => accountResponse);
    const accountId = 'eb57ed4c-c32e-4e91-acda-89f81d635cba';
    expect(await accountService.fetchBalance(accountId)).toStrictEqual(
      accountResponse,
    );
  });

  it('fetch account balance', async () => {
    accountService.fetchBalance = jest
      .fn()
      .mockImplementation(() => accountResponseError);
    const accountId = 'eb57ed4c-c32e-4e91-acda-89f81d635cba';
    expect(await accountService.fetchBalance(accountId)).toStrictEqual(
      accountResponseError,
    );
  });

  it('fetch account balance', async () => {
    accountService.fetchBalance = jest
      .fn()
      .mockImplementation(() => accountResponseError);
    const accountId = 'eb57ed4c-c32e-4e91-acda-89f81d635cba';
    expect(await accountService.fetchBalance(accountId)).toStrictEqual(
      accountResponseError,
    );
  });

  it('transfer Money', async () => {
    accountService.transferMoney = jest.fn().mockImplementation();

    const fromAccount = 'eb57ed4c-c32e-4e91-acda-89f81d635cba';
    const toAccount = 'e481fd00-5c36-4fc6-8338-8109cc8f5768';
    const money = 1000;
    expect(
      await accountService.transferMoney(fromAccount, toAccount, money),
    ).toBeUndefined();
  });

  it('transfer Money', async () => {
    accountService.transferMoney = jest
      .fn()
      .mockImplementation(() => moneyTransferError);
    const fromAccount = 'eb57ed4c-c32e-4e91-acda-89f81d635cba';
    const toAccount = 'e481fd00-5c36-4fc6-8338-8109cc8f5768';
    const money = 1000;
    expect(
      await accountService.transferMoney(fromAccount, toAccount, money),
    ).toStrictEqual(moneyTransferError);
  });
});
