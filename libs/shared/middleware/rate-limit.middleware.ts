import rateLimit from 'express-rate-limit';
import { ResponseModel } from '@/libs/shared/models/response.model';

/**
 * 글로벌 API 요청 제한 미들웨어
 *
 * 모든 REST API 요청에 대해 전역적으로 rate limit을 적용합니다.
 * 개별 제한 설정은 각 최상단 module 에서 적용합니다. (ex: SampleApiModule)
 */
export const globalRateLimiter = rateLimit({
  windowMs: 30 * 1000,
  max: 100,
  keyGenerator: (req) => req.ip,
  handler: (req, res) => {
    const response = ResponseModel.fail(
      'Too many requests globally. Please try again after 30 seconds.',
    );
    res.status(429).json(response);
  },
});
