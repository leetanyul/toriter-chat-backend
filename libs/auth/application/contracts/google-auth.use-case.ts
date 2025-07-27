import { GoogleLoginInput } from '@libs/auth/application/dtos/google-login.input';
import { GoogleLoginOutput } from '@libs/auth/application/dtos/google-login.output';

export abstract class GoogleAuthUseCase {
  abstract login(input: GoogleLoginInput): Promise<GoogleLoginOutput>;
}
