// auth-presentation.module.ts
import { Module } from '@nestjs/common';
import { GoogleLoginResponseDto } from './dtos/google-login-response.dto';
import { AuthApplicationModule } from '@/libs/auth/application/auth.application.module';
import { AuthMapperProfile } from '@/libs/auth/presentation/mappers/auth.mapper.profile';
import { SharedModule } from '@/libs/shared/shared.module';

@Module({
  imports: [AuthApplicationModule, SharedModule],
  providers: [GoogleLoginResponseDto, AuthMapperProfile],
  exports: [GoogleLoginResponseDto, AuthMapperProfile],
})
export class AuthPresentationModule {}
