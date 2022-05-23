import { BadRequestException } from '@nestjs/common';

export class InsufficientBalanceException extends BadRequestException {
  constructor(public readonly additionalDetails) {
    super('Insuffiecient balance.');
  }
}
