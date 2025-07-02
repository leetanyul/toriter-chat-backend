import { IsNotEmpty, IsString, IsOptional, IsNumber } from 'class-validator';
import { AutoMap } from '@automapper/classes';

export class GoogleLoginRequestDto {
  @IsNotEmpty()
  @IsString()
  @AutoMap()
  accessToken: string;

  @IsNotEmpty()
  @IsString()
  @AutoMap()
  tokenType: string;

  @IsOptional()
  @IsNumber()
  @AutoMap()
  expiresIn?: number;

  @IsOptional()
  @IsString()
  @AutoMap()
  scope?: string;

  @IsOptional()
  @IsNumber()
  @AutoMap()
  authUser?: number;

  @IsOptional()
  @IsString()
  @AutoMap()
  prompt?: string;

  constructor(
    accessToken: string,
    tokenType: string,
    expiresIn?: number,
    scope?: string,
    authUser?: number,
    prompt?: string,
  ) {
    this.accessToken = accessToken;
    this.tokenType = tokenType;
    this.expiresIn = expiresIn;
    this.scope = scope;
    this.authUser = authUser;
    this.prompt = prompt;

    if (!accessToken || !tokenType) {
      throw new Error('access_token and token_type are required fields');
    }
  }
}
