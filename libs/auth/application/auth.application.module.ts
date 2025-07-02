import { Module } from '@nestjs/common';
import { AuthUserCase } from './use-case/auth.use-case';
import { UserInfrastructureModule } from '@/libs/user/infrastructure/user.infrastructure.module';
import { AuthInfrastructureModule } from '@/libs/auth/infrastructure/auth.infrastructure.module';
import { ConfigService } from '@/libs/shared/services/config.service';
import { ErrorHandlerService } from '@/libs/shared/services/error-handler.service';
import { AuthService } from '@/libs/auth/domain/services/auth.service';
import { JwtService } from '@nestjs/jwt';
import { JwtUsecase } from './use-case/jwt.user-case';
import { SharedModule } from '@/libs/shared/shared.module';

@Module({
  imports: [UserInfrastructureModule, AuthInfrastructureModule, SharedModule],
  providers: [
    AuthUserCase,
    ConfigService,
    ErrorHandlerService,
    AuthService,
    JwtUsecase,
    JwtService,
  ],
  exports: [AuthUserCase, JwtUsecase],
})
export class AuthApplicationModule {}
