import { AutoMap } from '@automapper/classes';

export class AuthGetLatestPoliciesBridgeInput {
  constructor(userId: string) {
    this.userId = userId;
  }

  @AutoMap()
  userId: string;
}
