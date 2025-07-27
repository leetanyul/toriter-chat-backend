import { GetLatestPoliciesInput } from '@libs/consent/application/dtos/get-latest-policies.input';
import { LatestPolicyOutput } from '@libs/consent/application/dtos/get-latest-policies.output';

export interface GetLatestPoliciesUseCase {
  execute(input: GetLatestPoliciesInput): Promise<LatestPolicyOutput[]>;
}
