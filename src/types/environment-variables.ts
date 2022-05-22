export enum NODE_ENV {
  Production = 'production',
  Development = 'development',
  Test = 'test',
}

import { IsEnum, IsString } from 'class-validator';

export class EnvironmentVariables {
  @IsString()
  @IsEnum(NODE_ENV)
  NODE_ENV: NODE_ENV;
}
