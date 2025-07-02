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

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });
  const isProduction = process.env.ENV === 'PRODUCTION';

  app.useLogger(app.get(Logger));
  app.useGlobalFilters(new GlobalHttpExceptionFilter());
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // DTO에 명시된 속성만 허용
      forbidNonWhitelisted: true, // DTO 외의 속성은 400 에러
      transform: true, // ayload를 DTO 클래스로 변환
    }),
  );

  app.use(
    helmet({
      contentSecurityPolicy: isProduction ? undefined : false,
      crossOriginEmbedderPolicy: isProduction ? undefined : false,
      crossOriginResourcePolicy: isProduction ? undefined : false,
    }),
  );
  app.use(
    compression({
      threshold: 2048, // 1KB 이상일 때만 압축
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

  // 라우트 목록 출력
  const server = app.getHttpServer();
  const router = server._events.request._router;
  const routes = router.stack
    .filter((layer) => layer.route)
    .map((layer) => {
      const route = layer.route;
      const method = Object.keys(route.methods)[0].toUpperCase();
      return { method, path: route.path };
    });

  console.table(routes);
}

bootstrap();
