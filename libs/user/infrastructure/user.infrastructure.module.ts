// libs/user/infrastructure/user.infrastructure.module.ts
import { Module } from '@nestjs/common';
import { UserRepository } from '@libs/user/infrastructure/contracts/user.repository';
import { UserRepositoryImpl } from '@libs/user/infrastructure/repositories/user.repository.impl';
import { SharedModule } from '@libs/shared/shared.module';

@Module({
  imports: [SharedModule],
  providers: [
    {
      provide: UserRepository,
      useClass: UserRepositoryImpl,
    },
  ],
  exports: [UserRepository],
})
export class UserInfrastructureModule {}
