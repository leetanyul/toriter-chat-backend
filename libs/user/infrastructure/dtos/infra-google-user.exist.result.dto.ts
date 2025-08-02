import { AutoMap } from '@automapper/classes';

export class InfraGoogleUserExistsResultDto {
  @AutoMap()
  exists: boolean;
}
