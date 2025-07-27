import { Module } from '@nestjs/common';
import { ShardConnectionManager } from '@libs/shared/database/shard-connection-manager';

@Module({
  providers: [ShardConnectionManager],
  exports: [ShardConnectionManager],
})
export class SharedDatabaseModule {}
