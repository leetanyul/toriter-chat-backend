import { GoogleLoginInput } from '@/libs/auth/application/model/google-login.input';
import { UserLoginOutput } from '@libs/auth/application/model/user-login.output';

export abstract class GoogleAuthUseCase {
  abstract login(input: GoogleLoginInput): Promise<UserLoginOutput>;
}
