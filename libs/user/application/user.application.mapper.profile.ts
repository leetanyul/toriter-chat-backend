import { createMap, Mapper } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { OauthUserInput } from '@/libs/user/application/model/oauth-user.input';
import { InfraGoogleUserQueryDto } from '@libs/user/infrastructure/dtos/infra-google-user.query.dto';
import { UserFindResultDto } from '@/libs/user/infrastructure/dtos/infra-user.result.dto';
import { InfraGoogleUserFindQueryDto } from '@libs/user/infrastructure/dtos/infra-google-user.find.query.dto';
import { UserOutput } from '@/libs/user/application/model/user.output';

@Injectable()
export class UserApplicationMapperProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper: Mapper) => {
      createMap(mapper, OauthUserInput, InfraGoogleUserQueryDto);
      createMap(mapper, InfraGoogleUserQueryDto, InfraGoogleUserFindQueryDto);
      createMap(mapper, UserFindResultDto, UserOutput);
    };
  }
}
