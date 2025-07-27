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
}
