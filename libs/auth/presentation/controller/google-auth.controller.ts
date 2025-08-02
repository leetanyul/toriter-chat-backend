import { Controller, Post, Body, Get, Req } from '@nestjs/common';
import { GoogleAuthUseCase } from '@libs/auth/application/contracts/google-auth.use-case';
import { ResponseModel } from '@libs/shared/models/response.model';
import { GoogleLoginRequestDto } from '../dtos/google-login.request.dto';
import { GoogleLoginResponseDto as UserLoginResponseDto } from '@/libs/auth/presentation/dtos/user-login.response.dto';
import { GoogleLoginInput } from '@/libs/auth/application/model/google-login.input';
import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { PinoLoggerService } from '@libs/shared/logger/pino-logger.service';
import { UserLoginOutput } from '@libs/auth/application/model/user-login.output';

@Controller('google')
export class GoogleAuthController {
  constructor(
    private readonly authService: GoogleAuthUseCase,
    private readonly logger: PinoLoggerService,
    @InjectMapper() private readonly mapper: Mapper,
  ) {}

  @Post('login')
  async login(
    @Body() loginDto: GoogleLoginRequestDto,
  ): Promise<ResponseModel<UserLoginResponseDto>> {
    const loginModel = this.mapper.map(
      loginDto,
      GoogleLoginRequestDto,
      GoogleLoginInput,
    );

    const result = await this.authService.login(loginModel);

    const responseDto = this.mapper.map(
      result,
      UserLoginOutput,
      UserLoginResponseDto,
    );

    return ResponseModel.ok(responseDto);
  }

  @Get('health')
  async test(@Req() req: Request): Promise<ResponseModel<string>> {
    this.logger.log('health check called');
    return ResponseModel.ok('health');
  }
}
