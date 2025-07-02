import { InfraGoogleValidateResponseDto } from '@/libs/auth/infrastructure/dtos/infra-google-validate-response.dto';
import { AutoMap } from '@automapper/classes';

export class GoogleUserInfoResponseModel {
  constructor(
    public readonly sub: string,
    public readonly name: string,
    public readonly givenName: string,
    public readonly familyName: string,
    public readonly picture: string,
    public readonly email: string,
    public readonly emailVerified: boolean,
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
