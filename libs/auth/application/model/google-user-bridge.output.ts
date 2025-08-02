import { AutoMap } from '@automapper/classes';

export class GoogleUserBridgeOutput {
  @AutoMap()
  id: string;
  @AutoMap()
  email: string;
  @AutoMap()
  name: string;
  nickname: string;
  @AutoMap()
  profileImage?: string;
  @AutoMap()
  roleName: string;
  @AutoMap()
  statusName: string;
}
