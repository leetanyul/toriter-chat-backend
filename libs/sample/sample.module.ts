import { Module } from '@nestjs/common';
import { TestMapperProfile } from '@libs/sample/test.mapper';
@Module({
  providers: [TestMapperProfile],
})
export class SampleModule {}
