import { createMap, Mapper } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { GoogleLoginOutput } from '@/libs/auth/application/model/google-login.output';
import { GoogleUserInput } from '@/libs/user/application/model/google-user.input';
import { GoogleUserOutput } from '@/libs/user/application/model/google-user.output';
import { GoogleUserBridgeOutput } from '@/libs/auth/application/model/google-user-bridge.output';

@Injectable()
export class AuthApplicationMapperProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper: Mapper) => {
      createMap(mapper, GoogleLoginOutput, GoogleUserInput);
      createMap(mapper, GoogleUserOutput, GoogleUserBridgeOutput);
    };
  }
}
