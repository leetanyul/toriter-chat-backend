import { OauthUserInput } from '@/libs/user/application/model/oauth-user.input';
import { UserOutput } from '@/libs/user/application/model/user.output';

export abstract class GoogleUserCase {
  abstract checkOrCreateGoogleUser(params: OauthUserInput): Promise<UserOutput>;
}
