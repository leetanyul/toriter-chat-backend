import { ConfigModule } from '@nestjs/config';
import { UserInfrastructureModule } from '@/libs/user/infrastructure/user.infrastructure.module';
import { GoogleApiModule } from '@/libs/auth/infrastructure/google-oauth.module';
import { AuthApplicationModule } from '@/libs/auth/application/auth.application.module';
import { AuthDomainModule } from '@/libs/auth/domain/auth.domain.module';
import { AuthPresentationModule } from '@/libs/auth/presentation/auth.presentation.module';
import { AutomapperModule } from '@automapper/nestjs';
import { classes } from '@automapper/classes';
import { JwtModule } from '@nestjs/jwt';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { SharedModule } from '@/libs/shared/shared.module';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_ACCESS_TOKEN_SECRET,
      signOptions: { expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRATION_TIME },
    }),
    AutomapperModule.forRoot({
      strategyInitializer: classes(),
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [`.env.${process.env.NODE_ENV}`, '.env'],
      ignoreEnvFile: false,
    }),
    UserInfrastructureModule,
    GoogleApiModule,
    AuthApplicationModule,
    AuthDomainModule,
    AuthPresentationModule,
    SharedModule,
  ],
})
export class AppModule {}
