import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { GoogleOauthHttpContext } from '@/libs/auth/infrastructure/http-context/google-oauth.http-context';
import { ApiUtil } from '@/libs/shared/utils/api.util';
import { AuthInfrastructureMapperProfile } from '@/libs/auth/infrastructure/auth.infrastructure.mapper.profile';
import { GoogleOauthService } from '@/libs/auth/infrastructure/contracts/google-oauth.service';

@Module({
  imports: [HttpModule],
  providers: [
    GoogleOauthHttpContext,
    ApiUtil,
    AuthInfrastructureMapperProfile,
    {
      provide: GoogleOauthService,
      useClass: GoogleOauthHttpContext,
    },
  ],
  exports: [
    GoogleOauthHttpContext,
    AuthInfrastructureMapperProfile,
    GoogleOauthService,
  ],
})
export class AuthInfrastructureModule {}
