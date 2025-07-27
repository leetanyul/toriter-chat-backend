import { Module } from '@nestjs/common';
import { GoogleAuthUserCaseImpl } from './use-case/google-auth.use-case.impl';
import { UserInfrastructureModule } from '@/libs/user/infrastructure/user.infrastructure.module';
import { AuthInfrastructureModule } from '@/libs/auth/infrastructure/auth.infrastructure.module';
import { ConfigService } from '@/libs/shared/services/config.service';
import { ErrorHandlerService } from '@/libs/shared/services/error-handler.service';
import { AuthService } from '@/libs/auth/domain/services/auth.service';
import { JwtService } from '@nestjs/jwt';
import { JwtUsecase } from './use-case/jwt.user-case';
import { SharedModule } from '@/libs/shared/shared.module';
import { GoogleAuthUserCase } from './contracts/google-auth.use-case';

@Module({
  imports: [UserInfrastructureModule, AuthInfrastructureModule, SharedModule],
  providers: [
    {
      provide: GoogleAuthUserCase,
      useClass: GoogleAuthUserCaseImpl,
    },
    ConfigService,
    ErrorHandlerService,
    AuthService,
    JwtUsecase,
    JwtService,
  ],
  exports: [GoogleAuthUserCase, JwtUsecase],
})
export class AuthApplicationModule {}
