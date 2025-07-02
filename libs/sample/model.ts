import { IsString, IsNotEmpty, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';
export class TestParamDto {
  @IsString()
  @IsNotEmpty()
  message: string;

  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  d: number;
}

export class TestModel {
  message: string;
  d: number;
}
