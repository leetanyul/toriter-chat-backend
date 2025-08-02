import { GoogleLoginOutput } from '../../application/model/google-login.output';

export class AuthService {
  static assertEmailVerified(googleUser: GoogleLoginOutput): void {
    if (!googleUser.emailVerified) {
      throw new Error('Google email is not verified.');
    }
  }

  static isVerified(googleUser: GoogleLoginOutput): boolean {
    console.log('isVerified:', googleUser);
    return googleUser.emailVerified;
  }
}
