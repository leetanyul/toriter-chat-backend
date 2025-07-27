import { AutoMap } from '@automapper/classes';

export class InfraGoogleLoginRequestDto {
  @AutoMap()
  accessToken: string;

  @AutoMap()
  tokenType: string;

  @AutoMap()
  expiresIn: number;

  @AutoMap()
  scope: string;

  @AutoMap()
  authUser: number;

  @AutoMap()
  prompt: string;
}
