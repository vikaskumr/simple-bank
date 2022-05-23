import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class TransferMoneyRequestDto {
  @IsString()
  @ApiProperty({
    description: 'money to be deducted from account',
    example: 'eb57ed4c-c32e-4e91-acda-89f81d635cba',
    type: String,
  })
  fromAccountId: string;

  @IsString()
  @ApiProperty({
    description: 'money to be transferred to account',
    example: 'e481fd00-5c36-4fc6-8338-8109cc8f5768',
    type: String,
  })
  toAccountId: string;

  @IsNumber()
  @ApiProperty({
    description: 'money to be transfrred',
    example: 4674.98,
    type: Number,
  })
  money: number;
}
