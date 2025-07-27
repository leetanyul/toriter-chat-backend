import { Module } from '@nestjs/common';
import { PoliciesUseCaseImpl } from '@libs/consent/application/use-case/policies.use-case.impl';
import { PoliciesUseCase } from '@libs/consent/application/contracts/policies.use-case';
import { ConsentRepository } from '@libs/consent/infrastructure/contracts/consent.repository';
import { ConsentRepositoryImpl } from '@libs/consent/infrastructure/repositories/consent.repository.impl';
import { SharedDatabaseModule } from '@libs/shared/database/shared-database.module';
import { ConsentApplicationMapperProfile } from '@libs/consent/application/consent.application.mapper.profile';

@Module({
  imports: [SharedDatabaseModule],
  providers: [
    ConsentApplicationMapperProfile,
    {
      provide: PoliciesUseCase,
      useClass: PoliciesUseCaseImpl,
    },
    {
      provide: ConsentRepository,
      useClass: ConsentRepositoryImpl,
    },
  ],
  exports: [PoliciesUseCase, ConsentApplicationMapperProfile],
})
export class ConsentApplicationModule {}
