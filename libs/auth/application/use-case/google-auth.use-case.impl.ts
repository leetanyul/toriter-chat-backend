import { Injectable } from '@nestjs/common';
import { GoogleLoginInput } from '@/libs/auth/application/model/google-login.input';
import { GoogleLoginOutput } from '@/libs/auth/application/model/google-login.output';
import { AuthService } from '@libs/auth/domain/services/auth.service';
import { GoogleAuthUseCase } from '@libs/auth/application/contracts/google-auth.use-case';
import { GoogleOauthService } from '@libs/auth/infrastructure/contracts/google-oauth.service';
import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { InfraGoogleLoginRequestDto } from '@libs/auth/infrastructure/dtos/infra-google-login.request.dto';
import { InfraGoogleLoginResponseDto } from '@libs/auth/infrastructure/dtos/infra-google-login.response.dto';
import { GoogleUserBridgeUseCase } from '@/libs/auth/application/contracts/bridge/google-user-bridge.use-case';
import { PoliciesBridgeUseCase } from '@/libs/auth/application/contracts/bridge/policies-bridge.use-case';
import { AuthGetLatestPoliciesBridgeInput } from '@/libs/auth/application/model/bridge/get-latest-policies-bridge.input';
import { UserLoginOutput } from '@libs/auth/application/model/user-login.output';

@Injectable()
export class GoogleAuthUseCaseImpl implements GoogleAuthUseCase {
  constructor(
    private readonly googleOauthService: GoogleOauthService,
    private readonly googleUserBridge: GoogleUserBridgeUseCase,
    private readonly policiesBridge: PoliciesBridgeUseCase,
    @InjectMapper() private readonly mapper: Mapper,
  ) {}

  async login(loginModel: GoogleLoginInput): Promise<UserLoginOutput> {
    const requestDto = this.mapper.map(
      loginModel,
      GoogleLoginInput,
      InfraGoogleLoginRequestDto,
    );

    const responseDto: InfraGoogleLoginResponseDto =
      await this.googleOauthService.validateAccessTokenByRequest(requestDto);

    const result = this.mapper.map(
      responseDto,
      InfraGoogleLoginResponseDto,
      GoogleLoginOutput,
    );

    //TODO: 검증 로직이후 예외 처리 추가할 것
    AuthService.isVerified(result);

    // 구글 사용자 생성 또는 로그인
    const userData = await this.googleUserBridge.createOrLoginUser(result);

    // 최신 약관 목록 조회
    const policies = await this.policiesBridge.getLatestPolicies(
      new AuthGetLatestPoliciesBridgeInput(userData.id),
    );

    const hasAgreedAllRequired = policies.every(
      (policy) => !policy.isRequired || policy.agreed,
    );

    return {
      user: userData,
      hasAgreedAllRequired,
      policies: policies,
    };
  }
}
