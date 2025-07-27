import { Controller, Post, Body, Get, Req } from '@nestjs/common';
import { GoogleAuthUserCase } from '../../application/use-case/google-auth.use-case';
import { ResponseModel } from '@/libs/shared/models/response.model';
import { GoogleLoginRequestDto } from '../dtos/google-login.request.dto';
import { GoogleLoginResponseDto } from '@/libs/auth/presentation/dtos/google-login.response.dto';
import { GoogleLoginInput } from '@/libs/auth/application/dtos/google-login.input';
import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { PinoLoggerService } from '@/libs/shared/logger/pino-logger.service';
import { GoogleLoginOutput } from '@libs/auth/application/dtos/google-login.output';

@Controller('google')
export class GoogleAuthController {
  constructor(
    private readonly authService: GoogleAuthUserCase,
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
      GoogleLoginInput,
    );

    const result = await this.authService.login(loginModel);

    const responseDto = this.mapper.map(
      result,
      GoogleLoginOutput,
      GoogleLoginResponseDto,
    );

    return ResponseModel.ok(responseDto);
  }

  @Get('health')
  async test(@Req() req: Request): Promise<ResponseModel<string>> {
    this.logger.log('health check called');
    return ResponseModel.ok('health');
  }
}
