import { Controller, Get, Param, Put, Body } from '@nestjs/common';
import {
  ResponseModel,
  ResponseCode,
} from '@libs/shared/models/response.model';

@Controller('user')
export class UserController {
  @Get()
  async getUsers(): Promise<ResponseModel<string>> {
    return ResponseModel.ok('getUsers');
  }
}
