import { AutoMap } from '@automapper/classes';

export class InfraLatestPolicyEntityDto {
  @AutoMap()
  policyId: number;

  @AutoMap()
  type: string;

  @AutoMap()
  version: number;

  @AutoMap()
  isRequired: number; // 0 | 1

  @AutoMap()
  agreed: number | null; // 0 | 1 | null

  @AutoMap()
  title: string;

  @AutoMap()
  content: string;

  constructor() {}
}
