import { Module } from '@nestjs/common';
import { AuthInfrastructureModule } from './infrastructure/auth.infrastructure.module';
import { AuthApplicationModule } from './application/auth.application.module';
import { AuthDomainModule } from './domain/auth.domain.module';
import { AuthPresentationModule } from './presentation/auth.presentation.module';

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
