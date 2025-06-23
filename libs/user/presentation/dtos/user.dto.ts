export class UserDTO {
  constructor(
    public readonly id: number,
    public readonly email: string,
    public readonly nickname: string,
  ) {}

  static fromDomain(user: any): UserDTO {
    return new UserDTO(user.id, user.email, user.nickname);
  }
}
