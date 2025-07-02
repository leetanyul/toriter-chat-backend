import { Module } from '@nestjs/common';
import { GoogleLoginModel } from './models/google-login.model';
import { AuthService } from './services/auth.service';

@Module({
  providers: [GoogleLoginModel, AuthService],
  exports: [GoogleLoginModel, AuthService],
})
export class AuthDomainModule {}
