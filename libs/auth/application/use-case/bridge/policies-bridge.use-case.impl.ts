import { Injectable } from '@nestjs/common';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { PoliciesUseCase } from '@libs/consent/application/contracts/policies.use-case';

import { PoliciesBridgeUseCase } from '@/libs/auth/application/contracts/bridge/policies-bridge.use-case';
import { AuthGetLatestPoliciesBridgeInput } from '@/libs/auth/application/model/bridge/get-latest-policies-bridge.input';
import { AuthLatestPolicyBridgeOutput } from '@/libs/auth/application/model/bridge/get-latest-policies-bridge.output';

import { GetLatestPoliciesInput } from '@/libs/consent/application/model/get-latest-policies.input';
import { LatestPolicyOutput } from '@/libs/consent/application/model/get-latest-policies.output';

@Injectable()
export class PoliciesBridgeUseCaseImpl extends PoliciesBridgeUseCase {
  constructor(
    private readonly policiesUseCase: PoliciesUseCase,
    @InjectMapper() private readonly mapper: Mapper,
  ) {
    super();
  }

  async getLatestPolicies(
    input: AuthGetLatestPoliciesBridgeInput,
  ): Promise<AuthLatestPolicyBridgeOutput[]> {
    const infraInput = this.mapper.map(
      input,
      AuthGetLatestPoliciesBridgeInput,
      GetLatestPoliciesInput,
    );

    const infraOutput = await this.policiesUseCase.getLastPolicies(infraInput);

    return this.mapper.mapArray(
      infraOutput,
      LatestPolicyOutput,
      AuthLatestPolicyBridgeOutput,
    );
  }
}
