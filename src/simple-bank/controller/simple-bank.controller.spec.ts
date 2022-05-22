import { Test, TestingModule } from '@nestjs/testing';
import { SimpleBankController } from './simple-bank.controller';

describe('SimpleBankController', () => {
  let controller: SimpleBankController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SimpleBankController],
    }).compile();

    controller = module.get<SimpleBankController>(SimpleBankController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
