import { createMap } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { Mapper } from '@automapper/core';
import { GoogleLoginRequestDto } from '@libs/auth/presentation/dtos/google-login.request.dto';
import { GoogleLoginResponseDto } from '@/libs/auth/presentation/dtos/user-login.response.dto';
import { GoogleLoginInput } from '@/libs/auth/application/model/google-login.input';
import { GoogleLoginOutput } from '@/libs/auth/application/model/google-login.output';
import { UserLoginOutput } from '@libs/auth/application/model/user-login.output';

@Injectable()
export class AuthPresentationMapperProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper) => {
      createMap(mapper, UserLoginOutput, GoogleLoginResponseDto);
      createMap(mapper, GoogleLoginRequestDto, GoogleLoginInput);
      createMap(mapper, GoogleLoginOutput, GoogleLoginResponseDto);
    };
  }
}
