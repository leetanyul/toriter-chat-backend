// apps/api/main.ts
import * as dotenv from 'dotenv';
dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

import { NestFactory } from '@nestjs/core';
import { AppModule } from '@/apps/api/app.module';
import { GlobalHttpExceptionFilter } from '@/libs/shared/filters/http-exception.filter';
import { Logger } from 'nestjs-pino';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  app.useLogger(app.get(Logger));
  app.useGlobalFilters(new GlobalHttpExceptionFilter());

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
