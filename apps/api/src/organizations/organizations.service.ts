import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { randomBytes } from 'node:crypto';
import type {
  CreateOrganizationResponse,
  GetMyOrganizationsResponse,
  UpdateCurrentOrganizationResponse,
} from '@workspace/shared';
import type { ResolvedScope } from '../common/tenant-scope/tenant-scope.service';
import { UsersService } from '../users/users.service';
import { OrganizationsRepository } from './organizations.repository';
import type { CreateOrganizationDto } from './dto/create-organization.dto';
import type { UpdateOrganizationDto } from './dto/update-organization.dto';

@Injectable()
export class OrganizationsService {
  constructor(
    private readonly repository: OrganizationsRepository,
    private readonly usersService: UsersService,
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
    scope: ResolvedScope,
    dto: UpdateOrganizationDto,
  ): Promise<UpdateCurrentOrganizationResponse> {
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
      .slice(0, 43);

    if (!base) {
      throw new ConflictException('Could not derive an organization slug');
    }

    let candidate = base;
    for (let attempt = 0; attempt < 6; attempt++) {
      const exists = await this.repository.slugExists(candidate);
      if (!exists) return candidate;
      candidate = `${base}-${randomBytes(2).toString('hex')}`;
    }

    throw new ConflictException('Could not allocate a unique slug');
  }
}
