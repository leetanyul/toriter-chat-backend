import { GoogleUserInput } from '@/libs/user/application/dtos/google-user.input';
import { GoogleUserOutput } from '@/libs/user/application/dtos/google-user.output';

export abstract class OauthUserUseCase {
  abstract checkOrCreateGoogleUser(
    input: GoogleUserInput,
  ): Promise<GoogleUserOutput>;
}
