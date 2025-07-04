import { Routes } from '@nestjs/core';
import { AuthApiModule } from '@/apps/api/modules/auth-api.module';
import { SampleApiModule } from '@/apps/api/modules/sample-api.module';
import { UserApiModule } from '@/apps/api/modules/user-api.module';

export const ApiModules = [AuthApiModule, SampleApiModule, UserApiModule];

export const AppRoutes: Routes = [
  { path: 'auth', module: AuthApiModule },
  { path: 'sample', module: SampleApiModule },
  { path: 'user', module: UserApiModule },
];
