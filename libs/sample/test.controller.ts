import { Controller, Post, Body, Get, Req, Query, Param } from '@nestjs/common';
import {
  ResponseModel,
  ResponseCode,
} from '@/libs/shared/models/response.model';
import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { PinoLoggerService } from '@/libs/shared/logger/pino-logger.service';
import { TestParamDto } from '@/libs/sample/model';
import { TestModel } from '@/libs/sample/model';
import { Request } from 'express';

@Controller('test')
export class TestController {
  constructor(
    private readonly logger: PinoLoggerService,
    @InjectMapper() private readonly mapper: Mapper,
  ) {}

  @Get('test3/:message/:d')
  async test3(
    @Param() params: TestParamDto,
  ): Promise<ResponseModel<TestModel>> {
    // 매핑 작업
    const mapped = this.mapper.map(params, TestParamDto, TestModel);
    this.logger.log(`[test3] mapped: ${JSON.stringify(mapped)}`);
    return ResponseModel.ok(mapped);
  }
  // 10초동안 3번 호출 가능 주기도 10초
  @Get('test1')
  async test(@Req() req: Request): Promise<ResponseModel<string>> {
    this.logger.log(`IP: ${req.ip}, IPS: ${req.ips}`);
    return ResponseModel.ok('test1');
  }

  @Get('test2/:message/:d')
  async test2(@Param() params: TestParamDto): Promise<ResponseModel<string>> {
    this.logger.log('health check called');
    return ResponseModel.ok('test2');
  }
}
