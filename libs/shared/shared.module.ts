import { Module } from '@nestjs/common';
import { ConfigService } from '@/libs/shared/services/config.service';
import { LoggerModule } from 'nestjs-pino';
import { v4 as uuid } from 'uuid';
import { stdTimeFunctions } from 'pino';
import { rotatingStream } from '@/libs/shared/logger/pino-logger';

@Module({
  imports: [
    LoggerModule.forRoot({
      pinoHttp: {
        level: process.env.LOG_LEVEL || 'info',
        timestamp: stdTimeFunctions.isoTime,
        genReqId: (req, res) => {
          const traceId = uuid();
          req.id = uuid();
          return traceId;
        },
        stream: rotatingStream,
        redact: [
          'req.headers',
          'req.remoteAddress',
          'req.remotePort',
          'res.headers',
        ],
        customSuccessMessage: () => 'request completed',
        customErrorMessage: () => 'request failed',
      },
    }),
  ],
  providers: [ConfigService],
  exports: [ConfigService],
})
export class SharedModule {}
