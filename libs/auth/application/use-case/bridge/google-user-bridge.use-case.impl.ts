import { Injectable } from '@nestjs/common';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { GoogleUserCase } from '@libs/user/application/contracts/google-user.use-case';
import { OauthUserInput } from '@/libs/user/application/model/oauth-user.input';
import { UserOutput } from '@/libs/user/application/model/user.output';
import { GoogleLoginOutput } from '@/libs/auth/application/model/google-login.output';
import { UserBridgeOutput } from '@/libs/auth/application/model/bridge/user-bridge.output';
import { GoogleUserBridgeUseCase } from '@/libs/auth/application/contracts/bridge/google-user-bridge.use-case';

@Injectable()
export class GoogleUserBridgeUseCaseImpl implements GoogleUserBridgeUseCase {
  constructor(
    private readonly googleUserCase: GoogleUserCase,
    @InjectMapper() private readonly mapper: Mapper,
  ) {}

  async createOrLoginUser(
    googleLoginOutput: GoogleLoginOutput,
  ): Promise<UserBridgeOutput> {
    const userInput = this.mapper.map(
      googleLoginOutput,
      GoogleLoginOutput,
      OauthUserInput,
    );

    const user = await this.googleUserCase.checkOrCreateGoogleUser(userInput);

    return this.mapper.map(user, UserOutput, UserBridgeOutput);
  }
}
