import { Injectable } from '@nestjs/common';
import { GoogleLoginInput } from '@/libs/auth/application/dtos/google-login.input';
import { GoogleOauthHttpContext } from '@/libs/auth/infrastructure/http-context/google-oauth.http-context';
import { GoogleLoginOutput } from '../dtos/google-login.output';
import { AuthService } from '../../domain/services/auth.service';

@Injectable()
export class GoogleAuthUserCase {
  constructor(
    private readonly googleOauthHttpContext: GoogleOauthHttpContext,
  ) {}

  async login(loginModel: GoogleLoginInput): Promise<GoogleLoginOutput> {
    const googleUser =
      await this.googleOauthHttpContext.validateAccessToken(loginModel);

    if (!googleUser) {
      throw new Error('Invalid Google user');
    }

    AuthService.isVerified(googleUser);

    return googleUser;
  }
}
