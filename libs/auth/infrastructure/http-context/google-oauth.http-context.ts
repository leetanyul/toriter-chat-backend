import { Injectable } from '@nestjs/common';
import { ApiUtil } from '@/libs/shared/utils/api.util';
import { InfraGoogleLoginDto } from '@/libs/auth/infrastructure/dtos/infra-google-login.dto';
import { InfraGoogleValidateResponseDto } from '@/libs/auth/infrastructure/dtos/infra-google-validate-response.dto';
import { GoogleLoginModel } from '@/libs/auth/domain/models/google-login.model';
import { GoogleUserInfoResponseModel } from '@/libs/auth/domain/models/google-user-info-response.model';

@Injectable()
export class GoogleOauthHttpContext {
  constructor(private readonly apiUtil: ApiUtil) {}

  async validateAccessToken(
    loginModel: GoogleLoginModel,
  ): Promise<GoogleUserInfoResponseModel> {
    const infraGoogleLoginDto = InfraGoogleLoginDto.fromLoginModel(loginModel);
    const url = 'https://www.googleapis.com/oauth2/v3/userinfo';
    const headers = this.apiUtil.getBearerTokenHeader(
      infraGoogleLoginDto.accessToken,
    );
    const response = await this.apiUtil.get<InfraGoogleValidateResponseDto>(
      url,
      {},
      headers,
    );
    return GoogleUserInfoResponseModel.fromDto(response);
  }
}
