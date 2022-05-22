import { Test, TestingModule } from '@nestjs/testing';
import { SimpleBankService } from './simple-bank.service';

describe('SimpleBankService', () => {
  let service: SimpleBankService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SimpleBankService],
    }).compile();

    service = module.get<SimpleBankService>(SimpleBankService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
