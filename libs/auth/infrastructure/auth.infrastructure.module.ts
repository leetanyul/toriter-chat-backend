import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { GoogleOauthHttpContext } from '@/libs/auth/infrastructure/http-context/google-oauth.http-context';
import { ApiUtil } from '@/libs/shared/utils/api.util';
import { AuthInfrastructureMapperProfile } from '@/libs/auth/infrastructure/auth.infrastructure.mapper.profile'; // 👈 import 추가

@Module({
  imports: [HttpModule],
  providers: [GoogleOauthHttpContext, ApiUtil, AuthInfrastructureMapperProfile],
  exports: [GoogleOauthHttpContext, AuthInfrastructureMapperProfile],
})
export class AuthInfrastructureModule {}
