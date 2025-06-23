// apps/api/app.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserController } from './presentation/user.controller';
import { UserInfrastructureModule } from '@/libs/user/infrastructure/user.infrastructure.module';
import { UserService } from '@/libs/user/application/user.service';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: [
                `.env.${process.env.NODE_ENV}`,
                '.env',
            ],
            ignoreEnvFile: false,
        }),
        UserInfrastructureModule,
    ],
    controllers: [UserController],
    providers: [UserService],
})
export class AppModule { }
