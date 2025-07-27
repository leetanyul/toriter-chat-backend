import { Module } from '@nestjs/common';
import { GetLatestPoliciesUseCaseImpl } from '@libs/consent/application/use-case/get-latest-policies.use-case.impl';
import { GetLatestPoliciesUseCase } from '@libs/consent/application/interface/get-latest-policies.use-case';
import { ConsentRepository } from '@libs/consent/infrastructure/repositories/interface/consent.repository';
import { ConsentRepositoryImpl } from '@libs/consent/infrastructure/repositories/consent.repository.impl';
import { SharedDatabaseModule } from '@libs/shared/database/shared-database.module';

@Module({
  imports: [SharedDatabaseModule],
  providers: [
    {
      provide: 'GetLatestPoliciesUseCase',
      useClass: GetLatestPoliciesUseCaseImpl,
    },
    {
      provide: ConsentRepository,
      useClass: ConsentRepositoryImpl,
    },
  ],
  exports: ['GetLatestPoliciesUseCase'],
})
export class ConsentApplicationModule {}
