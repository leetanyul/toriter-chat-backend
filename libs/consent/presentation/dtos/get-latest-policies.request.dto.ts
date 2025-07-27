import { AutoMap } from '@automapper/classes';
import { IsString, IsUUID } from 'class-validator';
import { Transform } from 'class-transformer';

export class GetLatestPoliciesRequestDto {
  @AutoMap()
  @IsString()
  userId: string;
}
