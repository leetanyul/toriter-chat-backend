import { GoogleLoginInput } from '@/libs/auth/application/model/google-login.input';
import { GoogleLoginOutput } from '@/libs/auth/application/model/google-login.output';

export abstract class GoogleAuthUseCase {
  abstract login(input: GoogleLoginInput): Promise<GoogleLoginOutput>;
}
