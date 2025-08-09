import { Injectable } from '@nestjs/common';
import { ShardConnectionManager } from '@libs/shared/database/shard-connection-manager';
import { UserRepository } from '@libs/user/infrastructure/contracts/user.repository';
import { InfraGoogleUserQueryDto } from '@libs/user/infrastructure/dtos/infra-google-user.query.dto';
import { UserFindResultDto } from '@/libs/user/infrastructure/dtos/infra-user.result.dto';
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
  ): Promise<UserFindResultDto | null> {
    const ds = await this.shardManager.getDataSource('core');

    const result = await ds.query(
      `
  SELECT
    u.id                         AS id,
    u.name                       AS name,
    u.nickname                   AS nickname,
    u.email                      AS email,
    u.profile_image              AS profileImage,
    u.deleted_at                 AS deletedAt,
    u.login_fail_count           AS loginFailCount,
    u.email_verified             AS emailVerified,
    u.oauth_provider             AS oauthProvider,
    u.oauth_id                   AS oauthId,
    u.status_id                  AS statusId,
    u.role_id                    AS roleId,
    u.phone_number               AS phoneNumber
  FROM user u
  WHERE u.oauth_provider = ? AND u.oauth_id = ?
  LIMIT 1
  `,
      [query.providerId, query.sub],
    );

    if (result.length === 0) {
      return null; // 데이터가 없으면 null 반환
    }

    const user = result[0]; // 첫 번째 로우를 반환
    const resultDto: UserFindResultDto = {
      id: user.id,
      name: user.name ?? null,
      nickname: user.nickname,
      email: user.email,
      profileImage: user.profileImage ?? null,
      deletedAt: user.deletedAt ?? null,
      loginFailCount: user.loginFailCount ?? 0,
      emailVerified:
        typeof user.emailVerified === 'boolean'
          ? user.emailVerified
          : user.emailVerified === 1,
      oauthProvider: user.oauthProvider,
      oauthId: user.oauthId,
      statusId: user.statusId,
      roleId: user.roleId,
      phoneNumber: user.phoneNumber ?? null,
    };

    return resultDto;
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
  role_id,
  last_login_at
) VALUES (
  UUID(), ?, ?, ?, ?, ?, ?, 1, ?, ?, NOW()
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
