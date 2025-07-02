import { Controller, Post, Body, Get, Req, Query, Param } from '@nestjs/common';
import { AuthUserCase } from '../../application/use-case/auth.use-case';
import {
  ResponseModel,
  ResponseCode,
} from '@/libs/shared/models/response.model';
import { GoogleLoginRequestDto } from '../dtos/google-login-request.dto';
import { GoogleLoginResponseDto } from '@/libs/auth/presentation/dtos/google-login-response.dto';
import { GoogleLoginModel } from '@/libs/auth/domain/models/google-login.model';
import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Logger } from 'nestjs-pino';
import { PinoLoggerService } from '@/libs/shared/logger/pino-logger.service';
import { RateLimit } from 'nestjs-rate-limiter';

import { IsString, IsNotEmpty, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';
export class TestParamDto {
  @IsString()
  @IsNotEmpty()
  message: string;

  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  d: number;
}

@Controller('google')
export class GoogleController {
  constructor(
    private readonly authService: AuthUserCase,
    private readonly logger: PinoLoggerService,
    @InjectMapper() private readonly mapper: Mapper,
  ) {}

  @Post('login')
  @RateLimit({ points: 10, duration: 60 })
  async login(
    @Body() loginDto: GoogleLoginRequestDto,
  ): Promise<ResponseModel<GoogleLoginResponseDto>> {
    const loginModel = this.mapper.map(
      loginDto,
      GoogleLoginRequestDto,
      GoogleLoginModel,
    );
    console.log('mapped login model:', loginModel);
    const result = await this.authService.login(loginModel);
    console.log('Login result:', result);
    const responseDto = GoogleLoginResponseDto.fromLoginModel(result);
    console.log('Response DTO:', responseDto);
    return ResponseModel.ok(responseDto);
  }

  @Get('health')
  async test(@Req() req: Request): Promise<ResponseModel<string>> {
    this.logger.log('health check called');
    return ResponseModel.ok('health');
  }

  @Get('test/:message/:d')
  async test2(@Param() params: TestParamDto): Promise<ResponseModel<string>> {
    this.logger.log('health check called');
    return ResponseModel.ok('health');
  }
}
