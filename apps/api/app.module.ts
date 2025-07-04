import { ConfigModule } from '@nestjs/config';
import { UserInfrastructureModule } from '@/libs/user/infrastructure/user.infrastructure.module';
import { AutomapperModule } from '@automapper/nestjs';
import { classes } from '@automapper/classes';
import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { SharedModule } from '@/libs/shared/shared.module';
import { RouterModule } from '@nestjs/core';
import { AppRoutes, ApiModules } from '@/apps/api/routes.config';

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
    RouterModule.register(AppRoutes),
    ...ApiModules,
    UserInfrastructureModule,
    SharedModule,
  ],
})
export class AppModule {}
