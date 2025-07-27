// infrastructure/mappers/test.mapper.ts
import { createMap, forMember, mapFrom } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { Mapper } from '@automapper/core';
import { TestParamDto } from '@libs/sample/model';
import { TestModel } from '@libs/sample/model';

@Injectable()
export class TestMapperProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper: Mapper) => {
      createMap(mapper, TestParamDto, TestModel);
    };
  }
}
