import { GetLatestPoliciesInput } from '@libs/consent/application/dtos/get-latest-policies.input';
import { LatestPolicyOutput } from '@libs/consent/application/dtos/get-latest-policies.output';

export abstract class PoliciesUseCase {
  abstract getLastPolicies(
    input: GetLatestPoliciesInput,
  ): Promise<LatestPolicyOutput[]>;
}
