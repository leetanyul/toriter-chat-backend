import { InfraGoogleValidateResponseDto } from '@/libs/auth/infrastructure/dtos/infra-google-validate-response.dto';
import { AutoMap } from '@automapper/classes';

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

  static fromDto(
    dto: InfraGoogleValidateResponseDto,
  ): GoogleUserInfoResponseModel {
    return new GoogleUserInfoResponseModel(
      dto.sub,
      dto.name,
      dto.given_name,
      dto.family_name,
      dto.picture,
      dto.email,
      dto.email_verified,
    );
  }
}
