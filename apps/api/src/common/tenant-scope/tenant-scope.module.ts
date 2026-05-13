import { Module } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { TenantScope } from './tenant-scope.service';

@Module({
  providers: [PrismaService, TenantScope],
  exports: [TenantScope],
})
export class TenantScopeModule {}
