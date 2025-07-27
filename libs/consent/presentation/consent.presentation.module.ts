import { Module } from '@nestjs/common';
import { PolicyController } from '@libs/consent/presentation/controllers/consent.controller';
import { GetLatestPoliciesUseCaseImpl } from '@/libs/consent/application/use-case/get-latest-policies.use-case.impl';
import { ConsentRepositoryImpl } from '@libs/consent/infrastructure/repositories/consent.repository.impl';
import { ConsentRepository } from '@libs/consent/infrastructure/repositories/interface/consent.repository';
import { GetLatestPoliciesUseCase } from '@libs/consent/application/interface/get-latest-policies.use-case';
import { SharedModule } from '@libs/shared/shared.module';
import { ConsentPresentationMapperProfile } from '@/libs/consent/presentation/consent.presentation.mapper.profile';

@Module({
  imports: [SharedModule],
  controllers: [PolicyController],
  providers: [
    ConsentPresentationMapperProfile,
    {
      provide: 'GetLatestPoliciesUseCase',
      useClass: GetLatestPoliciesUseCaseImpl,
    },
    {
      provide: ConsentRepository,
      useClass: ConsentRepositoryImpl,
    },
  ],
  exports: [ConsentPresentationMapperProfile],
})
export class ConsentPresentationModule {}
