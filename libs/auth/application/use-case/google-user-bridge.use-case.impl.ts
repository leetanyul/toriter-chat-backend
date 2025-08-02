import { Injectable } from '@nestjs/common';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { GoogleUserCase } from '@libs/user/application/contracts/google-user.use-case';
import { GoogleUserInput } from '@/libs/user/application/model/google-user.input';
import { GoogleUserOutput } from '@/libs/user/application/model/google-user.output';
import { GoogleLoginOutput } from '@/libs/auth/application/model/google-login.output';
import { GoogleUserBridgeOutput } from '@/libs/auth/application/model/google-user-bridge.output';

@Injectable()
export class GoogleUserBridgeUseCaseImpl {
  constructor(
    private readonly googleUserCase: GoogleUserCase,
    @InjectMapper() private readonly mapper: Mapper,
  ) {}

  async createOrLoginUser(
    googleLoginOutput: GoogleLoginOutput,
  ): Promise<GoogleUserBridgeOutput> {
    const userInput = this.mapper.map(
      googleLoginOutput,
      GoogleLoginOutput,
      GoogleUserInput,
    );

    const user = await this.googleUserCase.checkOrCreateGoogleUser(userInput);

    return this.mapper.map(user, GoogleUserOutput, GoogleUserBridgeOutput);
  }
}
