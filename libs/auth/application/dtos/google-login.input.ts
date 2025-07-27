import { AutoMap } from '@automapper/classes';

export class GoogleLoginInput {
  @AutoMap()
  public accessToken: string;
  @AutoMap()
  public tokenType: string;
  @AutoMap()
  public expiresIn: number;
  @AutoMap()
  public scope: string;
  @AutoMap()
  public authUser: number;
  @AutoMap()
  public prompt: string;
}
