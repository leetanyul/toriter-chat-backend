import { AutoMap } from '@automapper/classes';

export class GoogleLoginModel {
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

  // constructor(
  //   public accessToken: string,
  //   public tokenType: string,
  //   public expiresIn: number,
  //   public scope: string,
  //   public authUser: number,
  //   public prompt: string,
  // ) {}

  // static fromLoginDTO(loginDto: GoogleLoginRequestDTO): GoogleLoginModel {
  //   return new GoogleLoginModel(
  //     loginDto.access_token,
  //     loginDto.token_type,
  //     loginDto.expires_in,
  //     loginDto.scope,
  //     loginDto.authuser,
  //     loginDto.prompt,
  //   );
  // }
}
