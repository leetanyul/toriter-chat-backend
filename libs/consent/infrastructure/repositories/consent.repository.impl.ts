import { Injectable } from '@nestjs/common';
import { ConsentRepository } from '@libs/consent/infrastructure/repositories/interface/consent.repository';
import { LatestPolicyOutput } from '@libs/consent/application/dtos/get-latest-policies.output';
import { ShardConnectionManager } from '@libs/shared/database/shard-connection-manager';

@Injectable()
export class ConsentRepositoryImpl implements ConsentRepository {
  constructor(private readonly shardManager: ShardConnectionManager) {}

  async findLatestPoliciesByUserId(
    userId: string,
  ): Promise<LatestPolicyOutput[]> {
    const ds = await this.shardManager.getDataSource('core'); // ✅ 핵심: core DB
    const query = `
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

    return ds.query(query, [userId]);
  }
}
