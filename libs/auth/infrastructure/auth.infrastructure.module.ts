import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { GoogleOauthHttpContext } from '@/libs/auth/infrastructure/http-context/google-oauth.http-context';
import { ApiUtil } from '@/libs/shared/utils/api.util';

@Module({
  imports: [HttpModule],
  providers: [GoogleOauthHttpContext, ApiUtil],
  exports: [GoogleOauthHttpContext],
})
export class AuthInfrastructureModule {}
