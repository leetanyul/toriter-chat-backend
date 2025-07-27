import { Injectable } from '@nestjs/common';
import { ApiUtil } from '@/libs/shared/utils/api.util';
import { InfraGoogleLoginRequestDto } from '@/libs/auth/infrastructure/dtos/infra-google-login.request.dto';
import { InfraGoogleLoginResponseDto } from '@/libs/auth/infrastructure/dtos/infra-google-login.response.dto';
import { GoogleOauthService } from '@/libs/auth/infrastructure/contracts/google-oauth.service';

@Injectable()
export class GoogleOauthHttpContext implements GoogleOauthService {
  constructor(private readonly apiUtil: ApiUtil) {}

  async validateAccessTokenByRequest(
    request: InfraGoogleLoginRequestDto,
  ): Promise<InfraGoogleLoginResponseDto> {
    const url = 'https://www.googleapis.com/oauth2/v3/userinfo';
    const headers = this.apiUtil.getBearerTokenHeader(request.accessToken);

    return this.apiUtil.get<InfraGoogleLoginResponseDto>(url, {}, headers);
  }
}
