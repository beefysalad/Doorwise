import { Module } from '@nestjs/common';
import { TenantScopeModule } from '../common/tenant-scope/tenant-scope.module';
import { PrismaService } from '../prisma/prisma.service';
import { UsersModule } from '../users/users.module';
import { OrganizationsController } from './organizations.controller';
import { OrganizationsRepository } from './organizations.repository';
import { OrganizationsService } from './organizations.service';

@Module({
  imports: [UsersModule, TenantScopeModule],
  controllers: [OrganizationsController],
  providers: [PrismaService, OrganizationsRepository, OrganizationsService],
  exports: [OrganizationsRepository],
})
export class OrganizationsModule {}
