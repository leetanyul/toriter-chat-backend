import { Controller, Post, Body, Get, Req } from '@nestjs/common';
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

@Controller('google')
export class GoogleController {
  constructor(
    private readonly authService: AuthUserCase,
    private readonly logger: PinoLoggerService,
    @InjectMapper() private readonly mapper: Mapper,
  ) {}

  @Post('login')
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
}
