// src/libs/shared/constants/common-code.enum.ts

export enum OauthProvider {
  GOOGLE = 1,
  KAKAO = 2,
  NAVER = 3,
  APPLE = 4,
}

export enum UserRole {
  USER = 1,
  ADMIN = 2,
  MANAGER = 3,
}

export enum UserStatus {
  ACTIVE = 1,
  BANNED = 2,
  SLEEP = 3,
  PENDING = 4,
  DELETED = 5,
}
