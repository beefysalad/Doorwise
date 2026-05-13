import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import type {
  CreateOrganizationResponse,
  GetMyOrganizationsResponse,
  UpdateCurrentOrganizationResponse,
} from '@workspace/shared';
import { TenantScope } from '../common/tenant-scope/tenant-scope.service';
import { UsersService } from '../users/users.service';
import { OrganizationsRepository } from './organizations.repository';
import type { CreateOrganizationDto } from './dto/create-organization.dto';
import type { UpdateOrganizationDto } from './dto/update-organization.dto';

@Injectable()
export class OrganizationsService {
  constructor(
    private readonly repository: OrganizationsRepository,
    private readonly usersService: UsersService,
    private readonly tenantScope: TenantScope,
  ) {}

  async createOrganization(
    clerkUserId: string,
    dto: CreateOrganizationDto,
  ): Promise<CreateOrganizationResponse> {
    const user = await this.usersService.syncCurrentUser(clerkUserId);
    const slug = await this.resolveSlug(dto.slug ?? dto.name);

    const membership = await this.repository.createWithOwner({
      name: dto.name,
      slug,
      address: dto.address,
      phone: dto.phone,
      ownerUserId: user.id,
    });

    await this.usersService.clearIntendedRole(clerkUserId);

    return membership;
  }

  async getMyOrganizations(
    clerkUserId: string,
  ): Promise<GetMyOrganizationsResponse> {
    const user = await this.usersService.syncCurrentUser(clerkUserId);
    const memberships = await this.repository.listMembershipsForUser(user.id);
    return { memberships };
  }

  async updateCurrentOrganization(
    dto: UpdateOrganizationDto,
  ): Promise<UpdateCurrentOrganizationResponse> {
    const scope = await this.tenantScope.require();

    if (scope.role !== 'owner') {
      throw new ForbiddenException('Only owners can update the organization');
    }

    const updated = await this.repository.updateOrganization(
      scope.organizationId,
      {
        name: dto.name,
        address: dto.address,
        phone: dto.phone,
        logoUrl: dto.logoUrl,
      },
    );

    if (!updated) {
      throw new NotFoundException('Organization not found');
    }

    return updated;
  }

  private async resolveSlug(seed: string): Promise<string> {
    const base = seed
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '')
      .slice(0, 48);

    if (!base) {
      throw new ConflictException('Could not derive an organization slug');
    }

    let candidate = base;
    for (let attempt = 0; attempt < 6; attempt++) {
      const exists = await this.repository.slugExists(candidate);
      if (!exists) return candidate;
      candidate = `${base}-${Math.random().toString(36).slice(2, 6)}`;
    }

    throw new ConflictException('Could not allocate a unique slug');
  }
}
