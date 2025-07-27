import { Injectable } from '@nestjs/common';
import { ApiUtil } from '@/libs/shared/utils/api.util';
import { InfraGoogleLoginRequestDto } from '@/libs/auth/infrastructure/dtos/infra-google-login.request.dto';
import { InfraGoogleLoginResponseDto } from '@/libs/auth/infrastructure/dtos/infra-google-login.response.dto';
import { GoogleLoginInput } from '@/libs/auth/application/dtos/google-login.input';
import { GoogleLoginOutput } from '@/libs/auth/application/dtos/google-login.output';
import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';

@Injectable()
export class GoogleOauthHttpContext {
  constructor(
    private readonly apiUtil: ApiUtil,
    @InjectMapper() private readonly mapper: Mapper,
  ) {}

  async validateAccessToken(
    loginModel: GoogleLoginInput,
  ): Promise<GoogleLoginOutput> {
    // ✅ 매퍼로 변환
    const infraGoogleLoginDto = this.mapper.map(
      loginModel,
      GoogleLoginInput,
      InfraGoogleLoginRequestDto,
    );

    const url = 'https://www.googleapis.com/oauth2/v3/userinfo';
    const headers = this.apiUtil.getBearerTokenHeader(
      infraGoogleLoginDto.accessToken,
    );

    const response = await this.apiUtil.get<InfraGoogleLoginResponseDto>(
      url,
      {},
      headers,
    );

    // ✅ 매퍼로 변환
    return this.mapper.map(
      response,
      InfraGoogleLoginResponseDto,
      GoogleLoginOutput,
    );
  }
}
