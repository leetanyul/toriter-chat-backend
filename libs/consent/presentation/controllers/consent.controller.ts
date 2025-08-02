import { Controller, Get, Inject, Query } from '@nestjs/common';
import { PoliciesUseCase as PoliciesUseCase } from '@libs/consent/application/contracts/policies.use-case';
import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';

import { GetLatestPoliciesRequestDto } from '../dtos/get-latest-policies.request.dto';
import { LatestPolicyResponseDto } from '../dtos/get-latest-policies.response.dto';
import { GetLatestPoliciesInput } from '@/libs/consent/application/model/get-latest-policies.input';
import { LatestPolicyOutput } from '@/libs/consent/application/model/get-latest-policies.output';
import { ResponseModel } from '@libs/shared/models/response.model';

@Controller('policy')
export class PolicyController {
  constructor(
    private readonly policiesUseCase: PoliciesUseCase,
    @InjectMapper() private readonly mapper: Mapper,
  ) {}

  @Get('latest')
  async getLatestPolicies(
    @Query() query: GetLatestPoliciesRequestDto,
  ): Promise<ResponseModel<LatestPolicyResponseDto[]>> {
    const input = this.mapper.map(
      query,
      GetLatestPoliciesRequestDto,
      GetLatestPoliciesInput,
    );

    const result = await this.policiesUseCase.getLastPolicies(input);

    const responseDto = this.mapper.mapArray(
      result,
      LatestPolicyOutput,
      LatestPolicyResponseDto,
    );

    return ResponseModel.ok(responseDto);
  }
}
