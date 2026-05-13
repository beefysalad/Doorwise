import { Module } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { OrganizationAccessGuard } from '../guards/organization-access.guard';
import { TenantScope } from './tenant-scope.service';

@Module({
  providers: [PrismaService, TenantScope, OrganizationAccessGuard],
  exports: [TenantScope, OrganizationAccessGuard],
})
export class TenantScopeModule {}
