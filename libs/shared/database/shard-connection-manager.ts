import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { ShardDbConfig } from './shard-db-config.interface';
import * as url from 'url';

@Injectable()
export class ShardConnectionManager {
  private readonly cache = new Map<string, DataSource>();

  async getDataSource(shardId: string): Promise<DataSource> {
    // 캐시되어 있으면 바로 반환
    if (this.cache.has(shardId)) {
      return this.cache.get(shardId)!;
    }

    // core DB는 DATABASE_URL 파싱
    const config =
      shardId === 'core'
        ? this.parseDatabaseUrl(process.env.DATABASE_URL!)
        : await this.lookupShardConfig(shardId);

    const dataSource = new DataSource({
      type: 'mysql',
      host: config.host,
      port: config.port,
      username: config.username,
      password: config.password,
      database: config.database,
      synchronize: false,
    });

    await dataSource.initialize();
    this.cache.set(shardId, dataSource);

    return dataSource;
  }

  // shard DB 연결정보는 나중에 core DB 또는 redis 등에서 가져오게 확장 가능
  private async lookupShardConfig(shardId: string): Promise<ShardDbConfig> {
    return {
      host: '192.168.0.2',
      port: 13306,
      username: 'root',
      password: 'r1s2e3f4',
      database: `chat_shard_${shardId}`,
    };
  }

  private parseDatabaseUrl(dbUrl: string): ShardDbConfig {
    const parsed = new url.URL(dbUrl);
    return {
      host: parsed.hostname,
      port: Number(parsed.port),
      username: parsed.username,
      password: parsed.password,
      database: parsed.pathname.replace('/', ''),
    };
  }
}
