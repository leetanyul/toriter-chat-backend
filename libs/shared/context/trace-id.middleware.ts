import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { RequestContextService } from './request-context.service';

@Injectable()
export class TraceIdMiddleware implements NestMiddleware {
  constructor(private readonly context: RequestContextService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const traceId = req.id as string; // 이미 pinoHttp의 genReqId로 설정된 상태
    this.context.run(traceId, req, res, next);
  }
}
