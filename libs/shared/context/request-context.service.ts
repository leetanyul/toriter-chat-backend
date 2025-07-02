import { Injectable } from '@nestjs/common';
import { AsyncLocalStorage } from 'async_hooks';
import { Request, Response } from 'express';

interface RequestContextData {
  traceId: string;
  req: Request;
  res: Response;
}

@Injectable()
export class RequestContextService {
  private readonly als = new AsyncLocalStorage<RequestContextData>();

  run(traceId: string, req: Request, res: Response, callback: () => void) {
    this.als.run({ traceId, req, res }, callback);
  }

  getContext(): RequestContextData | undefined {
    return this.als.getStore();
  }

  getTraceId(): string | undefined {
    return this.als.getStore()?.traceId;
  }
}
