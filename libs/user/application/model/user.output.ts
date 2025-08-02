import { AutoMap } from '@automapper/classes';

export class UserOutput {
  @AutoMap()
  id: string;

  @AutoMap()
  name: string;

  @AutoMap()
  nickname: string;

  @AutoMap()
  email: string;

  @AutoMap()
  profile_image: string;

  @AutoMap()
  deleted_at: Date;

  @AutoMap()
  login_fail_count: number;

  @AutoMap()
  email_verified: boolean;

  @AutoMap()
  oauth_provider: number;

  @AutoMap()
  oauth_id: string;

  @AutoMap()
  status_id: number;

  @AutoMap()
  role_id: number;

  @AutoMap()
  phone_number: string;
}
