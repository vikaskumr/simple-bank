import { Test, TestingModule } from '@nestjs/testing';
import { AccountController } from './account.controller';
import { AccountI } from '../models/account.interface';
import { AccountService } from '../service/account.service';
import { AccountEntity } from '../models/account.entity';
jest.mock('node-fetch');
import { Repository } from 'typeorm';

const accountServiceMock = {
  isInitialized: jest.fn(),
};

const accountRepository = {
  isInitialized: jest.fn(),
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

describe('AccountController', () => {
  let controller: AccountController;
  let accountService: AccountService;

  beforeEach(async () => {
    jest.clearAllMocks();

    // partial mocking - reason behind casting to "any"
    accountService = new AccountService(
      accountRepository as unknown as Repository<AccountEntity>,
    );

    const module: TestingModule = await Test.createTestingModule({
      controllers: [AccountController],
      providers: [
        {
          provide: AccountService,
          useValue: accountService,
        },
      ],
    }).compile();

    controller = module.get<AccountController>(AccountController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('add bank account', async () => {
    accountService.add = jest.fn().mockImplementation(() => accountResponse);
    const accountDetails: AccountI = {
      balance: 644.979,
      updatedAt: new Date(),
    };
    expect(await controller.add(accountDetails)).toStrictEqual(accountResponse);
  });

  it('fetch account balance', async () => {
    accountService.fetchBalance = jest
      .fn()
      .mockImplementation(() => accountResponse);
    expect(
      await controller.fetchBalance({
        accountId: 'eb57ed4c-c32e-4e91-acda-89f81d635cba',
      }),
    ).toStrictEqual(accountResponse);
  });

  it('fetch account balance', async () => {
    accountService.fetchBalance = jest
      .fn()
      .mockImplementation(() => accountResponseError);
    expect(
      await controller.fetchBalance({
        accountId: 'eb57ed4c-c32e-4e91-acda-89f81d635cba',
      }),
    ).toStrictEqual(accountResponseError);
  });

  it('fetch account balance', async () => {
    accountService.fetchBalance = jest
      .fn()
      .mockImplementation(() => accountResponseError);
    expect(
      await controller.fetchBalance({
        accountId: 'eb57ed4c-c32e-4e91-acda-89f81d635cba',
      }),
    ).toStrictEqual(accountResponseError);
  });

  it('transfer Money', async () => {
    accountService.transferMoney = jest.fn().mockImplementation();
    expect(
      await controller.transferMoney({
        fromAccountId: 'eb57ed4c-c32e-4e91-acda-89f81d635cba',
        toAccountId: 'e481fd00-5c36-4fc6-8338-8109cc8f5768',
        money: 1000,
      }),
    ).toBeUndefined();
  });

  it('transfer Money', async () => {
    accountService.transferMoney = jest
      .fn()
      .mockImplementation(() => moneyTransferError);
    expect(
      await controller.transferMoney({
        fromAccountId: 'eb57ed4c-c32e-4e91-acda-89f81d635cba',
        toAccountId: 'e481fd00-5c36-4fc6-8338-8109cc8f5768',
        money: 1000,
      }),
    ).toStrictEqual(moneyTransferError);
  });
});
