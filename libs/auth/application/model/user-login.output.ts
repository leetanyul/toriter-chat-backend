import { AutoMap } from '@automapper/classes';
import { UserBridgeOutput } from '@/libs/auth/application/model/bridge/user-bridge.output';
import { AuthLatestPolicyBridgeOutput } from '@/libs/auth/application/model/bridge/get-latest-policies-bridge.output';
import { Type } from 'class-transformer';

export class UserLoginOutput {
  @AutoMap(() => UserBridgeOutput)
  @Type(() => UserBridgeOutput)
  user: UserBridgeOutput;

  @AutoMap()
  hasAgreedAllRequired: boolean;

  @AutoMap(() => [AuthLatestPolicyBridgeOutput])
  @Type(() => AuthLatestPolicyBridgeOutput)
  policies: AuthLatestPolicyBridgeOutput[];
}
