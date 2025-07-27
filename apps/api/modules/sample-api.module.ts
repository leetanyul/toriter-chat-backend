import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import { SampleModule } from '@libs/sample/sample.module';
import { TestController } from '@libs/sample/test.controller';
import { SharedModule } from '@libs/shared/shared.module';
import { createRateLimiter } from '@libs/shared/middleware/custom-rate-limit.factory';

/**
 * 애플리케이션(앱) 영역에서 사용할 Sample 전용 모듈.
 * 라우터(prefix) 에 연결할 ‘대표 모듈’ 역할만 합니다.
 */
@Module({
  controllers: [TestController],
  imports: [SampleModule, SharedModule],
})
export class SampleApiModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    const test1Limiter = createRateLimiter({
      windowMs: 10 * 1000,
      max: 3,
      message: 'test1',
      keyPrefix: 'test1_',
    });

    consumer
      .apply(test1Limiter)
      .forRoutes({ path: 'sample/test/test1', method: RequestMethod.GET });
  }
}
