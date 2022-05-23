import { NotFoundException } from '@nestjs/common';

export class FromAccountNotFoundException extends NotFoundException {
  constructor(public readonly additionalDetails) {
    super('beneficiary account not found');
  }
}
