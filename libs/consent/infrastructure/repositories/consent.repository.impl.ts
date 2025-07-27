import { Injectable } from '@nestjs/common';
import { ConsentRepository } from '@/libs/consent/infrastructure/contracts/consent.repository';
import { InfraLatestPolicyEntityDto } from '@/libs/consent/infrastructure/dtos/infra-latest-policy.entity.dto';
import { ShardConnectionManager } from '@libs/shared/database/shard-connection-manager';
import { InfraLatestPolicyQueryDto } from '@/libs/consent/infrastructure/dtos/infra-latest-policy.query.dto';

@Injectable()
export class ConsentRepositoryImpl implements ConsentRepository {
  constructor(private readonly shardManager: ShardConnectionManager) {}

  async findLatestPoliciesByQuery(
    query: InfraLatestPolicyQueryDto,
  ): Promise<InfraLatestPolicyEntityDto[]> {
    const ds = await this.shardManager.getDataSource('core');

    const queryScript = `
SELECT
  cp.id AS policyId,
  cp.type,
  cp.version,
  cp.is_required AS isRequired,
  cpt.title,
  cpt.content,
  CASE
    WHEN uc.agreed = 1 THEN TRUE
    ELSE FALSE
  END AS agreed
FROM consent_policy cp
INNER JOIN (
  SELECT type, MAX(version) AS max_version
  FROM consent_policy
  GROUP BY type
) latest
  ON cp.type = latest.type AND cp.version = latest.max_version
INNER JOIN consent_policy_translation cpt
  ON cpt.policy_id = cp.id
INNER JOIN user u
  ON u.id = ? AND u.language = cpt.language
LEFT JOIN user_consent uc
  ON uc.user_id = u.id AND uc.policy_id = cp.id
`;

    return ds.query(queryScript, [query.userId]);
  }
}
