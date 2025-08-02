import { GoogleLoginOutput } from '@/libs/auth/application/model/google-login.output';
import { UserBridgeOutput } from '@/libs/auth/application/model/bridge/user-bridge.output';

export abstract class GoogleUserBridgeUseCase {
  abstract createOrLoginUser(
    googleLoginOutput: GoogleLoginOutput,
  ): Promise<UserBridgeOutput>;
}
