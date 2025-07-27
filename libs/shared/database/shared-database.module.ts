import { Module } from '@nestjs/common';
import { ShardConnectionManager } from './shard-connection-manager';

@Module({
  providers: [ShardConnectionManager],
  exports: [ShardConnectionManager],
})
export class SharedDatabaseModule {}
