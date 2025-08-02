import { Injectable } from '@nestjs/common';
import { GoogleUserCase } from '@/libs/user/application/contracts/google-user.use-case';
import { OauthUserInput } from '@/libs/user/application/model/oauth-user.input';
import { UserOutput } from '@/libs/user/application/model/user.output';
import { UserRepository } from '@libs/user/infrastructure/contracts/user.repository';
import { InfraGoogleUserQueryDto } from '@libs/user/infrastructure/dtos/infra-google-user.query.dto';
import { UserFindResultDto } from '@/libs/user/infrastructure/dtos/infra-user.result.dto';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { InfraGoogleUserFindQueryDto } from '@libs/user/infrastructure/dtos/infra-google-user.find.query.dto';
import { OauthProvider } from '@/libs/shared/constants/common-code.enum';

@Injectable()
export class GoogleUserCaseImpl implements GoogleUserCase {
  constructor(
    private readonly userRepository: UserRepository,
    @InjectMapper() private readonly mapper: Mapper,
  ) {}

  async checkOrCreateGoogleUser(input: OauthUserInput): Promise<UserOutput> {
    const infraInput = this.mapper.map(
      input,
      OauthUserInput,
      InfraGoogleUserQueryDto,
    );

    infraInput.providerId = OauthProvider.GOOGLE;

    const findQuery = this.mapper.map(
      infraInput,
      InfraGoogleUserQueryDto,
      InfraGoogleUserFindQueryDto,
    );

    findQuery.providerId = OauthProvider.GOOGLE;

    let userData =
      await this.userRepository.findByOauthProviderAndSub(findQuery);

    if (!userData) {
      const result = await this.userRepository.createOauthUser(infraInput);
      if (!result.success) {
        throw new Error('User creation failed');
      }

      userData = await this.userRepository.findByOauthProviderAndSub(findQuery);
    }

    if (!userData) {
      throw new Error('User lookup after creation failed');
    }

    return this.mapper.map(userData, UserFindResultDto, UserOutput);
  }
}
