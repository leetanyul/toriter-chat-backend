import { GoogleLoginModel } from '@/libs/auth/domain/models/google-login.model';

export class InfraGoogleLoginDto {
  constructor(
    public accessToken: string,
    public tokenType: string,
    public expiresIn: number,
    public scope: string,
    public authUser: number,
    public prompt: string,
  ) {}

  static fromLoginModel(loginModel: GoogleLoginModel): InfraGoogleLoginDto {
    return new InfraGoogleLoginDto(
      loginModel.accessToken,
      loginModel.tokenType,
      loginModel.expiresIn,
      loginModel.scope,
      loginModel.authUser,
      loginModel.prompt,
    );
  }
}
