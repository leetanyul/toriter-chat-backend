// src/libs/shared/logger/pino-logger.ts
import { pino, LoggerOptions, stdTimeFunctions } from 'pino';
import { join } from 'path';
import * as fs from 'fs';
import * as rfs from 'rotating-file-stream';
import * as dayjs from 'dayjs';

const logDir = join(process.cwd(), 'logs');
if (!fs.existsSync(logDir)) fs.mkdirSync(logDir);

const generator = (time: Date, index: number) => {
  const date = dayjs(time || new Date()).format('YYYYMMDD');
  return index ? `app_${date}(${index}).log` : `app_${date}.log`;
};

export const rotatingStream = rfs.createStream(generator, {
  size: '100M', // 100MB 넘으면 새 파일 생성
  interval: '1d', // 하루 단위로도 강제 회전
  path: logDir,
  compress: 'gzip', // 이전 파일은 gzip 압축(현재 로깅되고 있지않은 파일은 모두 이전 파일)
  maxFiles: 500, // 최대 500개까지 보관
});

export const loggerOptions: LoggerOptions = {
  level: process.env.LOG_LEVEL || 'info',
  timestamp: stdTimeFunctions.isoTime,
};

export const logger = pino(loggerOptions, rotatingStream);
// TODO: aws 파일용 서버 구축 되면 하루지난 파일 자동 이관 기능  설정하기(aws 설정으로)
