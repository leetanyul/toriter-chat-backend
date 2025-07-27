import { Expose } from 'class-transformer';
import { GoogleLoginOutput } from '@libs/auth/application/dtos/google-login.output';

export class GoogleLoginResponseDto {
  @Expose()
  readonly sub: string;

  @Expose()
  readonly name: string;

  @Expose()
  readonly givenName: string;

  @Expose()
  readonly familyName: string;

  @Expose()
  readonly picture: string;

  @Expose()
  readonly email: string;

  @Expose()
  readonly emailVerified: boolean;

  constructor(
    sub: string,
    name: string,
    givenName: string,
    familyName: string,
    picture: string,
    email: string,
    emailVerified: boolean,
  ) {
    this.sub = sub;
    this.name = name;
    this.givenName = givenName;
    this.familyName = familyName;
    this.picture = picture;
    this.email = email;
    this.emailVerified = emailVerified;
  }

  static fromLoginModel(model: GoogleLoginOutput): GoogleLoginResponseDto {
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
