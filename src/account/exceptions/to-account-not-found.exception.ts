import { NotFoundException } from '@nestjs/common';

export class ToAccountNotFoundException extends NotFoundException {
  constructor(public readonly additionalDetails) {
    super('recipient account not found ');
  }
}
