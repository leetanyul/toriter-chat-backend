import { AutoMap } from '@automapper/classes';

export class InfraGoogleUserFindQueryDto {
  @AutoMap()
  providerId: number;

  @AutoMap()
  sub: string;
}
