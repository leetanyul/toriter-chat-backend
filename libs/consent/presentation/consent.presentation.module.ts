import { Module } from '@nestjs/common';
import { PolicyController } from '@libs/consent/presentation/controllers/consent.controller';
import { PoliciesUseCaseImpl } from '@/libs/consent/application/use-case/policies.use-case.impl';
import { ConsentRepositoryImpl } from '@libs/consent/infrastructure/repositories/consent.repository.impl';
import { ConsentRepository } from '@/libs/consent/infrastructure/contracts/consent.repository';
import { PoliciesUseCase } from '@/libs/consent/application/contracts/policies.use-case';
import { SharedModule } from '@libs/shared/shared.module';
import { ConsentPresentationMapperProfile } from '@/libs/consent/presentation/consent.presentation.mapper.profile';
import { ConsentApplicationModule } from '@libs/consent/application/consent.application.module';

@Module({
  imports: [SharedModule, ConsentApplicationModule],
  controllers: [PolicyController],
  providers: [
    ConsentPresentationMapperProfile,
    {
      provide: PoliciesUseCase,
      useClass: PoliciesUseCaseImpl,
    },
    {
      provide: ConsentRepository,
      useClass: ConsentRepositoryImpl,
    },
  ],
  exports: [ConsentPresentationMapperProfile],
})
export class ConsentPresentationModule {}
