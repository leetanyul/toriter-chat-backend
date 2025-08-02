import { AutoMap } from '@automapper/classes';

export class GoogleUserOutput {
  @AutoMap()
  id: string;

  @AutoMap()
  email: string;

  @AutoMap()
  name: string;

  @AutoMap()
  nickname: string;

  @AutoMap()
  profileImage?: string;

  @AutoMap()
  roleName: string;

  @AutoMap()
  statusName: string;
}
