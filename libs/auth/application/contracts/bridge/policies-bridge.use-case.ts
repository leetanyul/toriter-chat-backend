import { AuthGetLatestPoliciesBridgeInput } from '@/libs/auth/application/model/bridge/get-latest-policies-bridge.input';
import { AuthLatestPolicyBridgeOutput } from '@/libs/auth/application/model/bridge/get-latest-policies-bridge.output';

export abstract class PoliciesBridgeUseCase {
  abstract getLatestPolicies(
    input: AuthGetLatestPoliciesBridgeInput,
  ): Promise<AuthLatestPolicyBridgeOutput[]>;
}
