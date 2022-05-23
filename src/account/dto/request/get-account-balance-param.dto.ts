import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class GetAccountBalanceParamDto {
  @IsString()
  @ApiProperty({
    description: 'accountId',
    example: 1,
    type: String,
  })
  accountId: string;
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
