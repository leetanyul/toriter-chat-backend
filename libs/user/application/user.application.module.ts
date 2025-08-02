import { Module } from '@nestjs/common';
import { GoogleUserCaseImpl } from '@/libs/user/application/use-case/google-user.use-case.impl';
import { GoogleUserCase } from '@libs/user/application/contracts/google-user.use-case';
import { UserInfrastructureModule } from '@libs/user/infrastructure/user.infrastructure.module';
import { AutomapperModule } from '@automapper/nestjs';
import { classes } from '@automapper/classes';
import { UserApplicationMapperProfile } from '@libs/user/application/user.application.mapper.profile';

@Module({
  imports: [UserInfrastructureModule],
  providers: [
    UserApplicationMapperProfile,
    {
      provide: GoogleUserCase,
      useClass: GoogleUserCaseImpl,
    },
  ],
  exports: [GoogleUserCase, UserApplicationMapperProfile],
})
export class UserApplicationModule {}
