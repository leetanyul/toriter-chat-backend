import { AutoMap } from '@automapper/classes';

export class InfraGoogleLoginResponseDto {
  @AutoMap()
  sub: string;

  @AutoMap()
  name: string;

  @AutoMap()
  given_name: string;

  @AutoMap()
  family_name: string;

  @AutoMap()
  picture: string;

  @AutoMap()
  email: string;

  @AutoMap()
  email_verified: boolean;
}
