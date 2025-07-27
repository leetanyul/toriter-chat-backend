// libs/consent/infrastructure/consent-infrastructure.module.ts
import { Module } from '@nestjs/common';
import { ConsentRepository } from '@libs/consent/infrastructure/contracts/consent.repository';
import { ConsentRepositoryImpl } from '@libs/consent/infrastructure/repositories/consent.repository.impl';
import { SharedDatabaseModule } from '@libs/shared/database/shared-database.module';

@Module({
  imports: [SharedDatabaseModule], // ✅ ShardConnectionManager 포함
  providers: [
    {
      provide: ConsentRepository,
      useClass: ConsentRepositoryImpl,
    },
  ],
  exports: [ConsentRepository], // ✅ Application layer에서 사용 가능하게 export
})
export class ConsentInfrastructureModule {}
