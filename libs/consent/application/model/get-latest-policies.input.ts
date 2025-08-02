import { AutoMap } from '@automapper/classes';

export class GetLatestPoliciesInput {
  @AutoMap()
  userId: string;
}
