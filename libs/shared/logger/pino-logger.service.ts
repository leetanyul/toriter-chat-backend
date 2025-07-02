import { Injectable, LoggerService } from '@nestjs/common';
import { logger } from './pino-logger';
import { RequestContextService } from '@/libs/shared/context/request-context.service';

@Injectable()
export class PinoLoggerService implements LoggerService {
  constructor(private readonly context: RequestContextService) {}

  private enrichLog(meta: any, message: any) {
    const store = this.context.getContext();
    if (!store) return { msg: message, ...meta };

    return {
      req: {
        id: store.req.id,
        method: store.req.method,
        url: store.req.originalUrl || store.req.url,
        // query: store.req.query,
        // params: store.req.params,
      },
      //   res: {
      //     statusCode: store.res.statusCode,
      //   },
      traceId: store.traceId,
      ...meta,
      msg: message,
    };
  }

  log(message: any, context?: string) {
    logger.info(this.enrichLog({ context }, message));
  }

  error(message: any, trace?: string, context?: string) {
    logger.error(this.enrichLog({ context, trace }, message));
  }

  warn(message: any, context?: string) {
    logger.warn(this.enrichLog({ context }, message));
  }

  debug(message: any, context?: string) {
    logger.debug(this.enrichLog({ context }, message));
  }

  verbose(message: any, context?: string) {
    logger.trace(this.enrichLog({ context }, message));
  }
}
