import { AutoMap } from '@automapper/classes';

export class LatestPolicyResponseDto {
  @AutoMap()
  policyId: number;

  @AutoMap()
  type: string;

  @AutoMap()
  version: number;

  @AutoMap()
  isRequired: boolean;

  @AutoMap()
  agreed: boolean;

  @AutoMap()
  title: string;

  @AutoMap()
  content: string;
}
