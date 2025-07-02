import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';

@Injectable()
export class JwtUsecase {
  constructor(private readonly jwtService: JwtService) {}

  // AccessToken 발급
  private generateAccessToken(payload: any): string {
    return this.jwtService.sign(payload, {
      secret: process.env.JWT_ACCESS_TOKEN_SECRET,
      expiresIn: Number(process.env.JWT_ACCESS_TOKEN_EXPIRATION_TIME), // 초 단위
    });
  }

  // RefreshToken 발급
  private generateRefreshToken(payload: any): string {
    return this.jwtService.sign(payload, {
      secret: process.env.JWT_REFRESH_TOKEN_SECRET,
      expiresIn: Number(process.env.JWT_REFRESH_TOKEN_EXPIRATION_TIME), // 초 단위
    });
  }

  // 로그인 시 쿠키로 내려주는 예시
  public async setAuthToken(user: any, res: Response) {
    const payload = { sub: user.id, email: user.email };

    const accessToken = this.generateAccessToken(payload);
    const refreshToken = this.generateRefreshToken(payload);

    // 환경변수에서 쿠키 세팅값 동적으로 읽기
    const accessTokenCookieName =
      process.env.JWT_ACCESS_TOKEN_COOKIE_NAME || 'access_token';
    const refreshTokenCookieName =
      process.env.JWT_REFRESH_TOKEN_COOKIE_NAME || 'refresh_token';

    const accessTokenCookiePath =
      process.env.JWT_ACCESS_TOKEN_COOKIE_PATH || '/';
    const refreshTokenCookiePath =
      process.env.JWT_REFRESH_TOKEN_COOKIE_PATH || '/';

    const cookieSecure = (process.env.JWT_COOKIE_SECURE || 'true') === 'true'; // 기본 true
    const cookieSameSite = process.env.JWT_COOKIE_SAMESITE || 'strict';

    // maxAge는 ms 단위로 변환 (초 * 1000)
    const accessTokenMaxAge =
      Number(process.env.JWT_ACCESS_TOKEN_EXPIRATION_TIME) * 1000;
    const refreshTokenMaxAge =
      Number(process.env.JWT_REFRESH_TOKEN_EXPIRATION_TIME) * 1000;

    res.cookie(accessTokenCookieName, accessToken, {
      httpOnly: true,
      secure: cookieSecure,
      sameSite: cookieSameSite as 'lax' | 'strict' | 'none',
      path: accessTokenCookiePath,
      maxAge: accessTokenMaxAge,
    });

    res.cookie(refreshTokenCookieName, refreshToken, {
      httpOnly: true,
      secure: cookieSecure,
      sameSite: cookieSameSite as 'lax' | 'strict' | 'none',
      path: refreshTokenCookiePath,
      maxAge: refreshTokenMaxAge,
    });

    return { success: true };
  }
}
