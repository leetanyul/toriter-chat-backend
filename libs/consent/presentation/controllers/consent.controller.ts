import { Controller, Get, Inject, Query } from '@nestjs/common';
import { GetLatestPoliciesUseCase } from '@libs/consent/application/interface/get-latest-policies.use-case';
import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';

import { GetLatestPoliciesRequestDto } from '../dtos/get-latest-policies.request.dto';
import { LatestPolicyResponseDto } from '../dtos/get-latest-policies.response.dto';
import { GetLatestPoliciesInput } from '@libs/consent/application/dtos/get-latest-policies.input';
import { LatestPolicyOutput } from '@libs/consent/application/dtos/get-latest-policies.output';

@Controller('policy')
export class PolicyController {
  constructor(
    @Inject('GetLatestPoliciesUseCase')
    private readonly getLatestPoliciesUseCase: GetLatestPoliciesUseCase,
    @InjectMapper() private readonly mapper: Mapper,
  ) {}

  @Get('latest')
  async getLatestPolicies(
    @Query() query: GetLatestPoliciesRequestDto,
  ): Promise<LatestPolicyResponseDto[]> {
    const input = this.mapper.map(
      query,
      GetLatestPoliciesRequestDto,
      GetLatestPoliciesInput,
    );

    const result = await this.getLatestPoliciesUseCase.execute(input);

    const responseDto = this.mapper.mapArray(
      result,
      LatestPolicyOutput,
      LatestPolicyResponseDto,
    );

    return responseDto;
  }
}
