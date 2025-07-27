import { Injectable } from '@nestjs/common';
import { GetLatestPoliciesUseCase } from '@libs/consent/application/interface/get-latest-policies.use-case';
import { GetLatestPoliciesInput } from '@libs/consent/application/dtos/get-latest-policies.input';
import { LatestPolicyOutput } from '@libs/consent/application/dtos/get-latest-policies.output';
import { ConsentRepository } from '@libs/consent/infrastructure/repositories/interface/consent.repository';

@Injectable()
export class GetLatestPoliciesUseCaseImpl implements GetLatestPoliciesUseCase {
  constructor(private readonly consentRepository: ConsentRepository) {}

  async execute(input: GetLatestPoliciesInput): Promise<LatestPolicyOutput[]> {
    return this.consentRepository.findLatestPoliciesByUserId(input.userId);
  }
}
