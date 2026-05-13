import { Module } from '@nestjs/common';
import { TenantScopeModule } from '../common/tenant-scope/tenant-scope.module';
import { OrganizationsModule } from '../organizations/organizations.module';
import { PrismaService } from '../prisma/prisma.service';
import { UsersModule } from '../users/users.module';
import { InvitesController } from './invites.controller';
import { InvitesRepository } from './invites.repository';
import { InvitesService } from './invites.service';

@Module({
  imports: [UsersModule, OrganizationsModule, TenantScopeModule],
  controllers: [InvitesController],
  providers: [PrismaService, InvitesRepository, InvitesService],
})
export class InvitesModule {}
