import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { ConfigService } from '@/libs/shared/services/config.service';
import { LoggerModule } from 'nestjs-pino';
import { v4 as uuid } from 'uuid';
import { rotatingStream } from '@/libs/shared/logger/pino-logger';
import { PinoLoggerService } from '@/libs/shared/logger/pino-logger.service';
import { multistream, stdTimeFunctions } from 'pino';
import { RequestContextService } from '@/libs/shared/context/request-context.service';
import { TraceIdMiddleware } from '@/libs/shared/context/trace-id.middleware';

@Module({
  imports: [
    LoggerModule.forRoot({
      pinoHttp: {
        stream: multistream([
          { stream: process.stdout }, // 콘솔
          { stream: rotatingStream }, // 파일
        ]),
        level: process.env.LOG_LEVEL || 'info',
        timestamp: stdTimeFunctions.isoTime,
        genReqId: (req, res) => {
          const traceId = uuid();
          req.id = uuid();
          return traceId;
        },
        redact: {
          paths: [
            'req.query',
            'req.params',
            'req.headers',
            'req.remoteAddress',
            'req.remotePort',
            'res.headers',
          ],
          remove: true,
        },
        customSuccessMessage: () => '1',
        customErrorMessage: () => '0',
      },
    }),
  ],
  providers: [ConfigService, PinoLoggerService, RequestContextService],
  exports: [ConfigService, PinoLoggerService, RequestContextService],
})
export class SharedModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(TraceIdMiddleware).forRoutes('*');
  }
}
