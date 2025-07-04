import { Injectable } from '@nestjs/common';
import { GoogleLoginModel } from '@/libs/auth/domain/models/google-login.model';
import { GoogleOauthHttpContext } from '@/libs/auth/infrastructure/http-context/google-oauth.http-context';
import { GoogleUserInfoResponseModel } from '../../domain/models/google-user-info-response.model';
import { AuthService } from '../../domain/services/auth.service';

@Injectable()
export class GoogleAuthUserCase {
  constructor(
    private readonly googleOauthHttpContext: GoogleOauthHttpContext,
  ) {}

  async login(
    loginModel: GoogleLoginModel,
  ): Promise<GoogleUserInfoResponseModel> {
    const googleUser =
      await this.googleOauthHttpContext.validateAccessToken(loginModel);

    if (!googleUser) {
      throw new Error('Invalid Google user');
    }

    AuthService.isVerified(googleUser);

    return googleUser;
  }
}
