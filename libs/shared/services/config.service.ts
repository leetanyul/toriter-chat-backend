import { Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';

@Injectable()
export class ConfigService {
  private readonly envConfig: { [key: string]: string };

  constructor() {
    console.log(process.env.NODE_ENV);
    dotenv.config();
    this.envConfig = process.env;
  }

  get(key: string): string | undefined {
    return this.envConfig[key];
  }
}
