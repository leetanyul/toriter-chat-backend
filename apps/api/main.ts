import * as dotenv from 'dotenv';
dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

import { NestFactory } from '@nestjs/core';
import { AppModule } from '@/apps/api/app.module';
import { ConfigService } from '@nestjs/config';
import { GlobalHttpExceptionFilter } from '@/libs/shared/filters/http-exception.filter';
import { Logger } from 'nestjs-pino';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true, // 버퍼해서 순서 보장
  });
  app.useLogger(app.get(Logger));
  app.useGlobalFilters(new GlobalHttpExceptionFilter());
  const configService = app.get(ConfigService);
  const port = process.env.PORT_API || 3000; // 환경 변수에서 포트 가져오기
  const env = process.env.ENV;

  app.enableCors({
    origin: ['http://localhost:3000', 'https://yourdomain.com'],
    credentials: true,
  });

  app.setGlobalPrefix('api');

  await app.listen(port);
  console.log(`Server running(${env}) on http://localhost:${port}`); // 로그 출력
}
bootstrap();
