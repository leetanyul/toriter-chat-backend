import { Injectable } from '@nestjs/common';
import { UserRepositoryImpl } from '@/libs/user/infrastructure/repositories/user.repository.impl';
import { GoogleLoginModel } from '@/libs/auth/domain/models/google-login.model';
import { GoogleOauthHttpContext } from '@/libs/auth/infrastructure/http-context/google-oauth.http-context';
import { GoogleUserInfoResponseModel } from '../../domain/models/google-user-info-response.model';
import { AuthService } from '../../domain/services/auth.service';

@Injectable()
export class GoogleAuthUserCase {
  constructor(
    private readonly userRepository: UserRepositoryImpl,
    private readonly googleOauthHttpContext: GoogleOauthHttpContext,
    private readonly authService: AuthService,
  ) {}

  async login(
    loginModel: GoogleLoginModel,
  ): Promise<GoogleUserInfoResponseModel> {
    const googleUser =
      await this.googleOauthHttpContext.validateAccessToken(loginModel);
    console.log('Google user:', googleUser);
    if (!googleUser) {
      throw new Error('Invalid Google user');
    }

    AuthService.isVerified(googleUser);

    return googleUser;
  }
}
