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

@Module({
  imports: [AuthInfrastructureModule, SharedModule],
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
  ],
  exports: [GoogleAuthUseCase, JwtUseCase],
})
export class AuthApplicationModule {}
