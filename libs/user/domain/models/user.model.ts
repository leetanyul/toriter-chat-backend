export class User {
  constructor(
    public readonly id: number,
    public readonly email: string,
    public readonly nickname: string,
    public readonly createdAt: Date,
  ) {}

  static fromUpdateDTO(id: number, updateData: { email?: string; nickname?: string; password?: string }): User {
    return new this(
      id,
      updateData.email || '',
      updateData.nickname || '',
      new Date(), // createdAt은 업데이트 시 변경되지 않으므로 기본값 사용
    );
  }
}
