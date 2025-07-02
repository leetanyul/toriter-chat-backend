import { GoogleUserInfoResponseModel } from '../models/google-user-info-response.model';

export class AuthService {
  static assertEmailVerified(googleUser: GoogleUserInfoResponseModel): void {
    if (!googleUser.emailVerified) {
      throw new Error('Google email is not verified.');
    }
  }

  static isVerified(googleUser: GoogleUserInfoResponseModel): boolean {
    console.log('isVerified:', googleUser);
    return googleUser.emailVerified;
  }
}
