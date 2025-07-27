import rateLimit from 'express-rate-limit';
import { Request } from 'express';
import { ResponseModel } from '@libs/shared/models/response.model';

/**
 * 공용 커스텀 RateLimiter 생성 팩토리
 * 개별 API 제한용 으로 각 module 최상단에 정의해서 사용(ex: SampleApiModule.ts)
 */
interface CustomRateLimitOptions {
  windowMs: number; // 제한 시간 (밀리초)
  max: number; // 해당 시간 내 허용할 최대 요청 수
  message?: string; // 제한 메시지 (지정하지 않으면 자동 생성)
  keyPrefix?: string; // Redis 등 외부 키 구분용 prefix (optional)
}

export function createRateLimiter({
  windowMs,
  max,
  message,
  keyPrefix = '',
}: CustomRateLimitOptions) {
  return rateLimit({
    windowMs,
    max,

    // TODO: 토큰값기준으로 변경할것, 토큰값없으면 패스
    // 클라이언트 식별 키 생성 방식 (기본: IP)
    keyGenerator: (req: Request) => {
      const forwarded = req.headers['x-forwarded-for'] as string;
      const ip = forwarded ? forwarded.split(',')[0].trim() : req.ip || '';
      return `${keyPrefix}${ip}`;
    },

    // 요청 횟수 초과 시 응답 핸들러
    handler: (req, res) => {
      const seconds = Math.floor(windowMs / 1000); // 밀리초 → 초 변환
      const finalMessage = `Too many ${message} requests. ${seconds} seconds.`;

      const response = ResponseModel.fail(finalMessage); // 공용 응답 포맷
      res.status(429).json(response); // 429 Too Many Requests
    },
  });
}
