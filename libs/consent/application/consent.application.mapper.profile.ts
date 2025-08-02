import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { Mapper, createMap, forMember, mapFrom } from '@automapper/core';

import { LatestPolicyOutput } from '@/libs/consent/application/model/get-latest-policies.output';
import { InfraLatestPolicyEntityDto } from '@libs/consent/infrastructure/dtos/infra-latest-policy.entity.dto';
import { GetLatestPoliciesInput } from '@/libs/consent/application/model/get-latest-policies.input';
import { InfraLatestPolicyQueryDto } from '@libs/consent/infrastructure/dtos/infra-latest-policy.query.dto';

@Injectable()
export class ConsentApplicationMapperProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper: Mapper) => {
      createMap(
        mapper,
        InfraLatestPolicyEntityDto,
        LatestPolicyOutput,
        forMember(
          (dest) => dest.agreed,
          mapFrom((src) => src.agreed === 1),
        ),
        forMember(
          (dest) => dest.isRequired,
          mapFrom((src) => src.isRequired === 1),
        ),
      );
      createMap(mapper, GetLatestPoliciesInput, InfraLatestPolicyQueryDto);
    };
  }
}
