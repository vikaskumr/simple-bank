import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsDecimal } from 'class-validator';

export class GetAccountBalanceResponseDto {
  @IsDecimal()
  @ApiProperty({
    description: 'balance of the account',
    example: 4000.088,
    type: Number,
  })
  balance: number;

  @IsDate()
  @ApiProperty({
    description: 'updated date for the bank account',
    example: new Date(),
    type: String,
  })
  updated_at: Date;
}
