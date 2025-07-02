import { Injectable } from '@nestjs/common';

@Injectable()
export class ErrorHandlerService {
  handleError(error: Error): void {
    console.error('An error occurred:', error.message);
  }

  handleHttpError(
    statusCode: number,
    message: string,
  ): { statusCode: number; message: string } {
    return { statusCode, message };
  }
}
