import { LatestPolicyOutput } from '@libs/consent/application/dtos/get-latest-policies.output';

export abstract class ConsentRepository {
  abstract findLatestPoliciesByUserId(
    userId: string,
  ): Promise<LatestPolicyOutput[]>;
}
