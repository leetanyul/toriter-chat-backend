import { Injectable } from '@nestjs/common';

export class GoogleUserInfoResponseModel {
  constructor(
    public sub: string,
    public name: string,
    public givenName: string,
    public familyName: string,
    public picture: string,
    public email: string,
    public emailVerified: boolean,
  ) {}
}

@Injectable()
export class GoogleAuthUserCase {
  constructor() {}
  async login(loginModel: GoogleUserInfoResponseModel): Promise<void> {
    // return googleUser;
  }
}
