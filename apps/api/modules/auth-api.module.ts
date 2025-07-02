import { Module } from '@nestjs/common';
import { AuthModule } from '@/libs/auth/auth.module';
import { GoogleController } from '@/libs/auth/presentation/controller/google.controller';
import { SharedModule } from '@/libs/shared/shared.module';
/**
 * 애플리케이션(앱) 영역에서 사용할 Auth 전용 모듈.
 * 라우터(prefix) 에 연결할 ‘대표 모듈’ 역할만 합니다.
 */
@Module({
  controllers: [GoogleController], // controoler 등록은 여기서만, 하위 module에서 따로 등록하면 route가 해당 모듈기준으로 추가로 생김
  imports: [AuthModule, SharedModule], // 서비스, 유즈케이스 등 도메인 로직은 여전히 이쪽에서 가져옴
})
export class AuthApiModule {}
