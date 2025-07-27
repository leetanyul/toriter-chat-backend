// auth-presentation.module.ts
import { Module } from '@nestjs/common';
import { GoogleLoginResponseDto } from './dtos/google-login.response.dto';
import { AuthApplicationModule } from '@/libs/auth/application/auth.application.module';
import { AuthPresentationMapperProfile } from '@/libs/auth/presentation/auth.presentation.mapper.profile';
import { SharedModule } from '@/libs/shared/shared.module';

@Module({
  imports: [AuthApplicationModule, SharedModule],
  providers: [GoogleLoginResponseDto, AuthPresentationMapperProfile],
  exports: [GoogleLoginResponseDto, AuthPresentationMapperProfile],
})
export class AuthPresentationModule {}
