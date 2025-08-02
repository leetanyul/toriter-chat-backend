import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { Mapper, createMap } from '@automapper/core';
import { LatestPolicyOutput } from '@/libs/consent/application/model/get-latest-policies.output';
import { LatestPolicyResponseDto } from '@libs/consent/presentation/dtos/get-latest-policies.response.dto';
import { GetLatestPoliciesInput } from '@/libs/consent/application/model/get-latest-policies.input';
import { GetLatestPoliciesRequestDto } from '@libs/consent/presentation/dtos/get-latest-policies.request.dto';

@Injectable()
export class ConsentPresentationMapperProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper: Mapper) => {
      createMap(mapper, LatestPolicyOutput, LatestPolicyResponseDto);
      createMap(mapper, GetLatestPoliciesRequestDto, GetLatestPoliciesInput);
    };
  }
}
