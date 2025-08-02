import { Injectable } from '@nestjs/common';
import { ShardConnectionManager } from '@libs/shared/database/shard-connection-manager';
import { UserRepository } from '@libs/user/infrastructure/contracts/user.repository';
import { InfraGoogleUserQueryDto } from '@libs/user/infrastructure/dtos/infra-google-user.query.dto';
import { InfraGoogleUserExistsResultDto } from '@/libs/user/infrastructure/dtos/infra-google-user.exist.result.dto';
import { InfraGoogleUserFindQueryDto } from '@libs/user/infrastructure/dtos/infra-google-user.find.query.dto';
import { InfraGoogleUserCreateResultDto } from '@libs/user/infrastructure/dtos/infra-google-user.create.result.dto';
import {
  OauthProvider,
  UserStatus,
  UserRole,
} from '@/libs/shared/constants/common-code.enum';

@Injectable()
export class UserRepositoryImpl implements UserRepository {
  constructor(private readonly shardManager: ShardConnectionManager) {}

  async findByOauthProviderAndSub(
    query: InfraGoogleUserFindQueryDto,
  ): Promise<InfraGoogleUserExistsResultDto | null> {
    const ds = await this.shardManager.getDataSource('core');

    const result = await ds.query(
      `
SELECT 1
FROM user u
WHERE u.oauth_provider = ? AND u.oauth_id = ?
LIMIT 1
    `,
      [query.providerId, query.sub],
    );

    return { exists: result.length > 0 };
  }

  async createOauthUser(
    data: InfraGoogleUserQueryDto,
  ): Promise<InfraGoogleUserCreateResultDto> {
    const ds = await this.shardManager.getDataSource('core');

    const result = await ds.query(
      `
INSERT INTO user (
  id,
  name,
  nickname,
  email,
  profile_image,
  oauth_provider,
  oauth_id,
  email_verified,
  status_id,
  role_id
) VALUES (
  UUID(), ?, ?, ?, ?, ?, ?, 0, ?, ?
)
    `,
      [
        data.name, // name
        data.name, // nickname (name과 동일)
        data.email, // email
        data.picture, // profile_image
        data.providerId, // oauth_provider
        data.sub, // oauth_id
        UserStatus.ACTIVE, // status_id
        UserRole.USER, // role_id
      ],
    );

    const success = Array.isArray(result) ? true : result?.affectedRows > 0;

    return { success };
  }
}
