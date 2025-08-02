import { AutoMap } from '@automapper/classes';

export class AuthLatestPolicyBridgeOutput {
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
