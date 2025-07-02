import { GoogleUserInfoResponseModel } from '@/libs/auth/domain/models/google-user-info-response.model';

export class GoogleLoginResponseDto {
  constructor(
    public readonly sub: string,
    public readonly name: string,
    public readonly givenName: string,
    public readonly familyName: string,
    public readonly picture: string,
    public readonly email: string,
    public readonly emailVerified: boolean,
  ) {}

  static fromLoginModel(
    model: GoogleUserInfoResponseModel,
  ): GoogleLoginResponseDto {
    return new GoogleLoginResponseDto(
      model.sub,
      model.name,
      model.givenName,
      model.familyName,
      model.picture,
      model.email,
      model.emailVerified,
    );
  }
}
