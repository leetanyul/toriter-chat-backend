export class UserEntity {
  constructor(
    public readonly id: number,
    public readonly email: string,
    public readonly nickname: string,
    public readonly createdAt: Date,
    public readonly password?: string,
  ) {}
}
