import { Injectable, OnApplicationShutdown } from '@nestjs/common';

// TODO: 모노레포라서 사용할지 말지는 좀더 고민
@Injectable()
export class ShutdownService implements OnApplicationShutdown {
  constructor() {} // 여기에 필요한 자원들 주입: 예) RedisService, DB, MQ Client 등

  async onApplicationShutdown(signal: string) {
    console.log(`[Graceful Shutdown] Signal received: ${signal}`);

    // 예시로 필요한 정리 작업:
    // await this.redisService.quit();
    // await this.db.disconnect();
    // await this.rabbitmq.close();
  }
}
