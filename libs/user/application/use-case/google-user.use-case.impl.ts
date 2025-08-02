import { Injectable } from '@nestjs/common';
import { GoogleUserCase } from '@/libs/user/application/contracts/google-user.use-case';
import { GoogleUserInput } from '@/libs/user/application/model/google-user.input';
import { GoogleUserOutput } from '@/libs/user/application/model/google-user.output';
import { UserRepository } from '@libs/user/infrastructure/contracts/user.repository';
import { InfraGoogleUserQueryDto } from '@libs/user/infrastructure/dtos/infra-google-user.query.dto';
import { InfraGoogleUserExistsResultDto } from '@/libs/user/infrastructure/dtos/infra-google-user.exist.result.dto';
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

  async checkOrCreateGoogleUser(
    input: GoogleUserInput,
  ): Promise<GoogleUserOutput> {
    const infraInput = this.mapper.map(
      input,
      GoogleUserInput,
      InfraGoogleUserQueryDto,
    );

    infraInput.providerId = OauthProvider.GOOGLE;

    const findQuery = this.mapper.map(
      infraInput,
      InfraGoogleUserQueryDto,
      InfraGoogleUserFindQueryDto,
    );

    findQuery.providerId = OauthProvider.GOOGLE;

    let rawData =
      await this.userRepository.findByOauthProviderAndSub(findQuery);

    if (!rawData.exists) {
      const result = await this.userRepository.createOauthUser(infraInput);
      if (!result.success) {
        throw new Error('User creation failed');
      }
    }

    return this.mapper.map(
      rawData,
      InfraGoogleUserExistsResultDto,
      GoogleUserOutput,
    );
  }
}
