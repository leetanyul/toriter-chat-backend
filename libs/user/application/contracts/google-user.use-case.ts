import { GoogleUserInput } from '@/libs/user/application/model/google-user.input';
import { GoogleUserOutput } from '@/libs/user/application/model/google-user.output';

export abstract class GoogleUserCase {
  abstract checkOrCreateGoogleUser(
    params: GoogleUserInput,
  ): Promise<GoogleUserOutput>;
}
