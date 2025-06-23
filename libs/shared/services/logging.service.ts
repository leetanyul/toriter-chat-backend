import { Injectable } from '@nestjs/common';

@Injectable()
export class LoggingService {
  log(message: string): void {
    console.log(message);
  }

  error(message: string, trace?: string): void {
    console.error(message, trace);
  }

  warn(message: string): void {
    console.warn(message);
  }
}
