import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class GetAccountBalanceParamDto {
  @IsNumber()
  @ApiProperty({
    description: 'accountId',
    example: 1,
    type: Number,
  })
  accountId: number;
}

export class PostAccountBalanceBodyDto {
  @IsNumber()
  @ApiProperty({
    description: 'balance of the account',
    example: 5674.98,
    type: Number,
  })
  balance: number;

  @ApiProperty({
    description: 'date at which account was updated',
    example: new Date(),
    type: String,
  })
  updatedAt: Date;
}
