import { createMap } from '@automapper/core';
import { GoogleLoginInput } from '@libs/auth/application/dtos/google-login.input';
import { GoogleLoginOutput } from '@libs/auth/application/dtos/google-login.output';
import { InfraGoogleLoginRequestDto } from '@libs/auth/infrastructure/dtos/infra-google-login.request.dto';
import { InfraGoogleLoginResponseDto } from '@libs/auth/infrastructure/dtos/infra-google-login.response.dto';
import { Injectable } from '@nestjs/common';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';

@Injectable()
export class AuthInfrastructureMapperProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper: Mapper) => {
      createMap(mapper, GoogleLoginInput, InfraGoogleLoginRequestDto);
      createMap(mapper, InfraGoogleLoginResponseDto, GoogleLoginOutput);
    };
  }
}
