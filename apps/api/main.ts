import { NestFactory } from '@nestjs/core';
import { AppModule } from '@/apps/api/app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    const configService = app.get(ConfigService);
    const port = configService.get<number>('PORT_API') || 3000;
    const env = configService.get<string>('ENV');

    app.setGlobalPrefix('api');

    await app.listen(port);
    console.log(`Server running(${env}) on http://localhost:${port}`);
}
bootstrap();
