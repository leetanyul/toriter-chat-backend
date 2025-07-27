import { InfraGoogleLoginRequestDto } from '@/libs/auth/infrastructure/dtos/infra-google-login.request.dto';
import { InfraGoogleLoginResponseDto } from '@/libs/auth/infrastructure/dtos/infra-google-login.response.dto';

export abstract class GoogleOauthService {
  abstract validateAccessTokenByRequest(
    request: InfraGoogleLoginRequestDto,
  ): Promise<InfraGoogleLoginResponseDto>;
}
