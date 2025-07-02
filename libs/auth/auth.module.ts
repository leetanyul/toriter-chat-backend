import { Module } from '@nestjs/common';
import { AuthInfrastructureModule } from '@libs/auth/infrastructure/auth.infrastructure.module';
import { AuthApplicationModule } from '@libs/auth/application/auth.application.module';
import { AuthDomainModule } from '@libs/auth/domain/auth.domain.module';
import { AuthPresentationModule } from '@libs/auth/presentation/auth.presentation.module';

@Module({
  imports: [
    AuthInfrastructureModule,
    AuthApplicationModule,
    AuthDomainModule,
    AuthPresentationModule,
  ],
  exports: [
    AuthInfrastructureModule,
    AuthApplicationModule,
    AuthDomainModule,
    AuthPresentationModule,
  ],
})
export class AuthModule {}
