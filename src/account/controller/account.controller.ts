import { Body, Controller, Get, HttpStatus, Param, Post } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import {
  GetAccountBalanceParamDto,
  PostAccountBalanceBodyDto,
} from '../dto/request/get-account-balance-param.dto';
import { GetAccountBalanceResponseDto } from '../dto/response/get-account-response.dto';
import { AccountI } from '../models/account.interface';
import { AccountService } from '../service/account.service';

@Controller('accounts')
export class AccountController {
  constructor(private accountService: AccountService) {}

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'fetched GeoJSON features successfully from openstreetmap api',
    type: () => GetAccountBalanceResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description:
      'Validation failed or some requirements were not fully satisfied',
  })
  @Post()
  public async add(
    @Body() accountDetails: PostAccountBalanceBodyDto,
  ): Promise<AccountI> {
    return this.accountService.add(accountDetails);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'fetched GeoJSON features successfully from openstreetmap api',
    type: () => GetAccountBalanceResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description:
      'Validation failed or some requirements were not fully satisfied',
  })
  @Get()
  public async findAll(): Promise<AccountI[]> {
    return this.accountService.findAll();
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'fetched GeoJSON features successfully from openstreetmap api',
    type: () => GetAccountBalanceResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description:
      'Validation failed or some requirements were not fully satisfied',
  })
  @Get('/:accountId/fetchBalance')
  public async fetchBalance(
    @Param() { accountId }: GetAccountBalanceParamDto,
  ): Promise<AccountI> {
    return this.accountService.fetchBalance(accountId);
  }
}
