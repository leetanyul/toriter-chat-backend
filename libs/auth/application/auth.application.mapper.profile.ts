import { createMap, Mapper } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { GoogleLoginOutput } from '@/libs/auth/application/model/google-login.output';
import { OauthUserInput } from '@/libs/user/application/model/oauth-user.input';
import { UserOutput } from '@/libs/user/application/model/user.output';
import { UserBridgeOutput } from '@/libs/auth/application/model/bridge/user-bridge.output';

import { AuthGetLatestPoliciesBridgeInput } from '@/libs/auth/application/model/bridge/get-latest-policies-bridge.input';
import { AuthLatestPolicyBridgeOutput } from '@/libs/auth/application/model/bridge/get-latest-policies-bridge.output';

import { GetLatestPoliciesInput } from '@libs/consent/application/model/get-latest-policies.input';
import { LatestPolicyOutput } from '@libs/consent/application/model/get-latest-policies.output';

@Injectable()
export class AuthApplicationMapperProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper: Mapper) => {
      createMap(mapper, GoogleLoginOutput, OauthUserInput);
      createMap(mapper, UserOutput, UserBridgeOutput);
      createMap(
        mapper,
        AuthGetLatestPoliciesBridgeInput,
        GetLatestPoliciesInput,
      );
      createMap(mapper, LatestPolicyOutput, AuthLatestPolicyBridgeOutput);
    };
  }
}
