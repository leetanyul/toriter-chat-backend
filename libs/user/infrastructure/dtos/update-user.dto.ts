export class UpdateUserEntityDTO {
  constructor(
    public readonly email?: string,
    public readonly nickname?: string,
  ) {}
}
