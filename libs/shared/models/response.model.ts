export class ResponseModel<T> {
  success: boolean;
  code: number;
  message: string;
  data: T;

  constructor(success: boolean, code: number, message: string, data: T) {
    this.success = success;
    this.code = code;
    this.message = message;
    this.data = data;
  }

  static ok<T>(data: T, message = 'Success'): ResponseModel<T> {
    return new ResponseModel(true, ResponseCode.SUCCESS, message, data);
  }

  static fail<T = null>(message = 'Failure'): ResponseModel<T> {
    return new ResponseModel(false, ResponseCode.FAIL, message, null);
  }

  static error<T = null>(
    code = ResponseCode.INTERNAL_API_ERROR,
    message = 'Internal API Error',
  ): ResponseModel<T> {
    return new ResponseModel(false, code, message, null);
  }
}

export const ResponseCode = {
  SUCCESS: 1,
  FAIL: 0,
  INTERNAL_API_ERROR: 1000,
};
