import { Expose, Type } from 'class-transformer';
import { UserBridgeOutput } from '@/libs/auth/application/model/bridge/user-bridge.output';
import { AuthLatestPolicyBridgeOutput } from '@/libs/auth/application/model/bridge/get-latest-policies-bridge.output';
import { AutoMap } from '@automapper/classes';

export class GoogleLoginResponseDto {
  @Expose()
  @Type(() => UserBridgeOutput)
  @AutoMap(() => UserBridgeOutput)
  readonly user: UserBridgeOutput;

  @Expose()
  @AutoMap()
  readonly hasAgreedAllRequired: boolean;

  @Expose()
  @Type(() => AuthLatestPolicyBridgeOutput)
  @AutoMap(() => [AuthLatestPolicyBridgeOutput])
  policies: AuthLatestPolicyBridgeOutput[];

  constructor(
    user: UserBridgeOutput,
    policies: AuthLatestPolicyBridgeOutput[],
    hasAgreedAllRequired: boolean,
  ) {
    this.user = user;
    this.policies = policies;
    this.hasAgreedAllRequired = hasAgreedAllRequired;
  }
}
