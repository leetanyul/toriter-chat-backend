import { AutoMap } from '@automapper/classes';

export class OauthUserInput {
  @AutoMap()
  sub: string;

  @AutoMap()
  name: string;

  @AutoMap()
  picture: string;

  @AutoMap()
  email: string;
}
