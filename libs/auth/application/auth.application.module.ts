import { Module } from '@nestjs/common';
import { GoogleAuthUseCaseImpl } from '@libs/auth/application/use-case/google-auth.use-case.impl';
import { AuthInfrastructureModule } from '@libs/auth/infrastructure/auth.infrastructure.module';
import { ConfigService } from '@libs/shared/services/config.service';
import { ErrorHandlerService } from '@libs/shared/services/error-handler.service';
import { AuthService } from '@libs/auth/domain/services/auth.service';
import { JwtService } from '@nestjs/jwt';
import { JwtUseCase } from '@libs/auth/application/use-case/jwt.use-case';
import { SharedModule } from '@libs/shared/shared.module';
import { GoogleAuthUseCase } from '@libs/auth/application/contracts/google-auth.use-case';

import { GoogleUserBridgeUseCaseImpl } from '@libs/auth/application/use-case/google-user-bridge.use-case.impl';
import { AuthApplicationMapperProfile } from '@libs/auth/application/auth.application.mapper.profile';
import { UserApplicationModule } from '@libs/user/application/user.application.module';

@Module({
  imports: [AuthInfrastructureModule, SharedModule, UserApplicationModule],
  providers: [
    {
      provide: GoogleAuthUseCase,
      useClass: GoogleAuthUseCaseImpl,
    },
    ConfigService,
    ErrorHandlerService,
    AuthService,
    JwtUseCase,
    JwtService,
    GoogleUserBridgeUseCaseImpl,
    AuthApplicationMapperProfile,
  ],
  exports: [GoogleAuthUseCase, JwtUseCase, AuthApplicationMapperProfile],
})
export class AuthApplicationModule {}
