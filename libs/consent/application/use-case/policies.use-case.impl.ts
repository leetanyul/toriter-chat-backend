import { Injectable } from '@nestjs/common';
import { PoliciesUseCase as PoliciesUseCase } from '@/libs/consent/application/contracts/policies.use-case';
import { GetLatestPoliciesInput } from '@libs/consent/application/dtos/get-latest-policies.input';
import { LatestPolicyOutput } from '@libs/consent/application/dtos/get-latest-policies.output';
import { ConsentRepository } from '@/libs/consent/infrastructure/contracts/consent.repository';
import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { InfraLatestPolicyQueryDto } from '@/libs/consent/infrastructure/dtos/infra-latest-policy.query.dto';
import { InfraLatestPolicyEntityDto } from '@/libs/consent/infrastructure/dtos/infra-latest-policy.entity.dto';

@Injectable()
export class PoliciesUseCaseImpl implements PoliciesUseCase {
  constructor(
    private readonly consentRepository: ConsentRepository,
    @InjectMapper() private readonly mapper: Mapper,
  ) {}

  async getLastPolicies(
    input: GetLatestPoliciesInput,
  ): Promise<LatestPolicyOutput[]> {
    const infraInput = this.mapper.map(
      input,
      GetLatestPoliciesInput,
      InfraLatestPolicyQueryDto,
    );

    const rawData =
      await this.consentRepository.findLatestPoliciesByQuery(infraInput);

    return this.mapper.mapArray<InfraLatestPolicyEntityDto, LatestPolicyOutput>(
      rawData,
      InfraLatestPolicyEntityDto,
      LatestPolicyOutput,
    );
  }
}
