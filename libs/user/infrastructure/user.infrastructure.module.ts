import { Module } from '@nestjs/common';
import { UserRepositoryImpl } from '@/libs/user/infrastructure/repositories/user.repository';

@Module({
  providers: [UserRepositoryImpl],
  exports: [UserRepositoryImpl],
})
export class UserInfrastructureModule {}
