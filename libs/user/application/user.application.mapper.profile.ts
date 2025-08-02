import { createMap, Mapper } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { GoogleUserInput } from '@/libs/user/application/model/google-user.input';
import { InfraGoogleUserQueryDto } from '@libs/user/infrastructure/dtos/infra-google-user.query.dto';
import { InfraGoogleUserExistsResultDto } from '@/libs/user/infrastructure/dtos/infra-google-user.exist.result.dto';
import { InfraGoogleUserFindQueryDto } from '@libs/user/infrastructure/dtos/infra-google-user.find.query.dto';
import { GoogleUserOutput } from '@/libs/user/application/model/google-user.output';

@Injectable()
export class UserApplicationMapperProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper: Mapper) => {
      createMap(mapper, GoogleUserInput, InfraGoogleUserQueryDto);
      createMap(mapper, InfraGoogleUserQueryDto, InfraGoogleUserFindQueryDto);
      createMap(mapper, InfraGoogleUserExistsResultDto, GoogleUserOutput);
    };
  }
}
