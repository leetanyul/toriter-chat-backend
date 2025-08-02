import { UserFindResultDto } from '@/libs/user/infrastructure/dtos/infra-user.result.dto';
import { InfraGoogleUserQueryDto } from '@libs/user/infrastructure/dtos/infra-google-user.query.dto';
import { InfraGoogleUserFindQueryDto } from '@libs/user/infrastructure/dtos/infra-google-user.find.query.dto';
import { InfraGoogleUserCreateResultDto } from '@libs/user/infrastructure/dtos/infra-google-user.create.result.dto';

export abstract class UserRepository {
  abstract findByOauthProviderAndSub(
    query: InfraGoogleUserFindQueryDto,
  ): Promise<UserFindResultDto | null>;

  abstract createOauthUser(
    data: InfraGoogleUserQueryDto,
  ): Promise<InfraGoogleUserCreateResultDto>;
}
