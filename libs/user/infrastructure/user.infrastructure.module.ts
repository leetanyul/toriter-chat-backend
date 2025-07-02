import { Module } from '@nestjs/common';
import { UserRepositoryImpl } from '@/libs/user/infrastructure/repositories/user.repository.impl';

@Module({
  providers: [UserRepositoryImpl],
  exports: [UserRepositoryImpl],
})
export class UserInfrastructureModule {}
