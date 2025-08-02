import { AutoMap } from '@automapper/classes';

export class GoogleUserInput {
  @AutoMap()
  sub: string;

  @AutoMap()
  name: string;

  @AutoMap()
  givenName: string;

  @AutoMap()
  familyName: string;

  @AutoMap()
  picture: string;

  @AutoMap()
  email: string;

  @AutoMap()
  emailVerified: boolean;
}
