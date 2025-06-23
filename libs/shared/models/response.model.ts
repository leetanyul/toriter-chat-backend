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
}

export const ResponseCode = {
  SUCCESS: 1,
  FAIL: 0,
};
