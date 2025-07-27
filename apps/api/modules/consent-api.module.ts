import { Module } from '@nestjs/common';
import { PolicyController } from '@libs/consent/presentation/controllers/consent.controller';
import { ConsentModule } from '@libs/consent/consent.module';
import { SharedModule } from '@libs/shared/shared.module';

/**
 * 애플리케이션(앱) 영역에서 사용할 Consent 전용 API 모듈.
 * 실제 라우터(prefix 포함)로 연결될 상단 API 전용 모듈입니다.
 */
@Module({
  controllers: [PolicyController], // 컨트롤러는 여기서만 등록
  imports: [ConsentModule, SharedModule], // 도메인 로직 및 공통 의존성
})
export class ConsentApiModule {}
