import { Module } from '@nestjs/common';
import { ConsentPresentationModule } from '@libs/consent/presentation/consent.presentation.module';
import { ConsentInfrastructureModule } from '@/libs/consent/infrastructure/consent.infrastructure.module';
import { ConsentApplicationModule } from '@libs/consent/application/consent.application.module';

@Module({
  imports: [
    ConsentPresentationModule,
    ConsentInfrastructureModule,
    ConsentApplicationModule,
  ],
  exports: [
    ConsentPresentationModule,
    ConsentInfrastructureModule,
    ConsentApplicationModule,
  ],
})
export class ConsentModule {}
