// src/libs/auth/infrastructure/user.mapper.profile.ts
import { Injectable } from '@nestjs/common';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Mapper, createMap } from '@automapper/core';
import { GoogleLoginModel } from '@/libs/auth/domain/models/google-login.model';
import { GoogleLoginRequestDto } from '@libs/auth/presentation/dtos/google-login-request.dto';

@Injectable()
export class AuthMapperProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper) => {
      createMap(mapper, GoogleLoginRequestDto, GoogleLoginModel);
    };
  }
}
