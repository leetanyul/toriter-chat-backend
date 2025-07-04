// apps/api/main.ts
import * as dotenv from 'dotenv';
dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

import { NestFactory } from '@nestjs/core';
import { AppModule } from '@/apps/api/app.module';
import { GlobalHttpExceptionFilter } from '@/libs/shared/filters/http-exception.filter';
import { Logger } from 'nestjs-pino';
import { Reflector } from '@nestjs/core';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import * as compression from 'compression';
import { NestExpressApplication } from '@nestjs/platform-express';
import { Express } from 'express';
import { globalRateLimiter } from '@/libs/shared/middleware/rate-limit.middleware';

async function bootstrap() {
  const isProduction = process.env.ENV === 'PRODUCTION';
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    bufferLogs: true,
  });
  app.set('trust proxy', true);
  app.useLogger(app.get(Logger));

  // 전역 예외 필터 설정
  app.useGlobalFilters(new GlobalHttpExceptionFilter());

  // 직렬화 인터셉터 설정
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  // 유효성 검사 파이프 설정
  // DTO에 정의된 유효성 검사 규칙을 적용
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // DTO에 명시된 속성만 허용
      forbidNonWhitelisted: true, // DTO 외의 속성은 400 에러
      transform: true, // payload를 DTO 클래스로 변환
    }),
  );
  app.use(globalRateLimiter);
  // 보안 헤더 설정
  app.use(
    helmet({
      contentSecurityPolicy: isProduction ? undefined : false,
      crossOriginEmbedderPolicy: isProduction ? undefined : false,
      crossOriginResourcePolicy: isProduction ? undefined : false,
    }),
  );
  // 압축 미들웨어 설정
  app.use(
    compression({
      threshold: 2048, // response가 1KB 이상일 때만 압축
    }),
  );

  app.enableCors({
    origin: ['http://localhost:3000', 'https://yourdomain.com'],
    credentials: true,
  });

  app.setGlobalPrefix('api');

  const port = process.env.PORT_API || 3000;
  await app.listen(port);

  console.log(
    `🚀 Server running (${process.env.ENV}) on http://localhost:${port}`,
  );
}

bootstrap();
