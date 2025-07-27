import { InfraLatestPolicyQueryDto } from '@/libs/consent/infrastructure/dtos/infra-latest-policy.query.dto';
import { InfraLatestPolicyEntityDto } from '@/libs/consent/infrastructure/dtos/infra-latest-policy.entity.dto';

export abstract class ConsentRepository {
  abstract findLatestPoliciesByQuery(
    query: InfraLatestPolicyQueryDto,
  ): Promise<InfraLatestPolicyEntityDto[]>;
}
