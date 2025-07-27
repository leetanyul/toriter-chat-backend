import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import {
  ResponseModel,
  ResponseCode,
} from '@libs/shared/models/response.model';
@Catch()
export class GlobalHttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const errorResponse =
      exception instanceof HttpException
        ? exception.getResponse()
        : { message: (exception as any).message || 'Internal Server Error' };

    const message =
      typeof errorResponse === 'string'
        ? errorResponse
        : Array.isArray((errorResponse as any).message)
          ? (errorResponse as any).message[0]
          : (errorResponse as any).message || 'Unexpected error';

    // 이미 ResponseModel 형태라면 그대로 리턴
    if (
      typeof errorResponse === 'object' &&
      'success' in errorResponse &&
      'code' in errorResponse &&
      'message' in errorResponse
    ) {
      return response.status(status).json(errorResponse);
    }

    const model = new ResponseModel<null>(
      false,
      ResponseCode.FAIL,
      message,
      null,
    );

    response.status(status).json(model);
  }
}
