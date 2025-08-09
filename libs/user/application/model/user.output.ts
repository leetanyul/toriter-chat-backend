import { AutoMap } from '@automapper/classes';

export class UserOutput {
  @AutoMap()
  id: string;

  @AutoMap()
  name: string | null;

  @AutoMap()
  nickname: string;

  @AutoMap()
  email: string;

  @AutoMap()
  profileImage: string | null;

  @AutoMap()
  deletedAt: Date | null;

  @AutoMap()
  loginFailCount: number;

  @AutoMap()
  emailVerified: boolean;

  @AutoMap()
  oauthProvider: number;

  @AutoMap()
  oauthId: string;

  @AutoMap()
  statusId: number;

  @AutoMap()
  roleId: number;

  @AutoMap()
  phoneNumber: string | null;
}
