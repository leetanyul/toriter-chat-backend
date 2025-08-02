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

import { GoogleUserBridgeUseCaseImpl } from '@/libs/auth/application/use-case/bridge/google-user-bridge.use-case.impl';
import { AuthApplicationMapperProfile } from '@libs/auth/application/auth.application.mapper.profile';
import { UserApplicationModule } from '@libs/user/application/user.application.module';
import { GoogleUserBridgeUseCase } from '@/libs/auth/application/contracts/bridge/google-user-bridge.use-case';
import { PoliciesBridgeUseCase } from '@/libs/auth/application/contracts/bridge/policies-bridge.use-case';
import { PoliciesBridgeUseCaseImpl } from '@libs/auth/application/use-case/bridge/policies-bridge.use-case.impl';
import { ConsentApplicationModule } from '@libs/consent/application/consent.application.module';

@Module({
  imports: [
    AuthInfrastructureModule,
    SharedModule,
    UserApplicationModule,
    ConsentApplicationModule,
  ],
  providers: [
    {
      provide: GoogleAuthUseCase,
      useClass: GoogleAuthUseCaseImpl,
    },
    {
      provide: GoogleUserBridgeUseCase,
      useClass: GoogleUserBridgeUseCaseImpl,
    },
    {
      provide: PoliciesBridgeUseCase,
      useClass: PoliciesBridgeUseCaseImpl,
    },
    ConfigService,
    ErrorHandlerService,
    AuthService,
    JwtUseCase,
    JwtService,
    AuthApplicationMapperProfile,
  ],
  exports: [
    GoogleAuthUseCase,
    JwtUseCase,
    AuthApplicationMapperProfile,
    PoliciesBridgeUseCase,
  ],
})
export class AuthApplicationModule {}
