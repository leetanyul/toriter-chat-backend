export class InfraGoogleValidateResponseDto {
  constructor(
    public readonly sub: string,
    public readonly name: string,
    public readonly given_name: string,
    public readonly family_name: string,
    public readonly picture: string,
    public readonly email: string,
    public readonly email_verified: boolean,
  ) {}
}
