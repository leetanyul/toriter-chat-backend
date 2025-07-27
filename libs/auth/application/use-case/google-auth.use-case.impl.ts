import { Injectable } from '@nestjs/common';
import { GoogleLoginInput } from '@libs/auth/application/dtos/google-login.input';
import { GoogleLoginOutput } from '@libs/auth/application/dtos/google-login.output';
import { AuthService } from '@libs/auth/domain/services/auth.service';
import { GoogleAuthUseCase } from '@libs/auth/application/contracts/google-auth.use-case';
import { GoogleOauthService } from '@libs/auth/infrastructure/contracts/google-oauth.service';
import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { InfraGoogleLoginRequestDto } from '@libs/auth/infrastructure/dtos/infra-google-login.request.dto';
import { InfraGoogleLoginResponseDto } from '@libs/auth/infrastructure/dtos/infra-google-login.response.dto';

@Injectable()
export class GoogleAuthUseCaseImpl implements GoogleAuthUseCase {
  constructor(
    private readonly googleOauthService: GoogleOauthService,
    @InjectMapper() private readonly mapper: Mapper,
  ) {}

  async login(loginModel: GoogleLoginInput): Promise<GoogleLoginOutput> {
    const requestDto = this.mapper.map(
      loginModel,
      GoogleLoginInput,
      InfraGoogleLoginRequestDto,
    );

    const responseDto: InfraGoogleLoginResponseDto =
      await this.googleOauthService.validateAccessTokenByRequest(requestDto);

    const result = this.mapper.map(
      responseDto,
      InfraGoogleLoginResponseDto,
      GoogleLoginOutput,
    );

    AuthService.isVerified(result);

    const testUser: TestUserId = {
      userId: '00000000-0000-0000-0000-000000000003',
    };
    return result;
  }
}

export class TestUserId {
  public userId: string;
}
