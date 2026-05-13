import { Injectable } from '@nestjs/common';
import type {
  Organization,
  OrganizationMembership,
  OrgRole,
} from '@workspace/shared';
import { PrismaService } from '../prisma/prisma.service';

type CreateOrganizationWithOwnerInput = {
  name: string;
  slug: string;
  address?: string;
  phone?: string;
  ownerUserId: string;
};

@Injectable()
export class OrganizationsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async slugExists(slug: string): Promise<boolean> {
    const found = await this.prisma.db.organization.findUnique({
      where: { slug },
      select: { id: true },
    });
    return Boolean(found);
  }

  async createWithOwner(
    input: CreateOrganizationWithOwnerInput,
  ): Promise<OrganizationMembership> {
    return this.prisma.db.$transaction(async (tx) => {
      const org = await tx.organization.create({
        data: {
          name: input.name,
          slug: input.slug,
          address: input.address ?? null,
          phone: input.phone ?? null,
        },
      });

      const membership = await tx.organizationMember.create({
        data: {
          organizationId: org.id,
          userId: input.ownerUserId,
          role: 'owner',
        },
      });

      return {
        id: membership.id,
        role: membership.role,
        joinedAt: membership.joinedAt.toISOString(),
        organization: this.serializeOrg(org),
      };
    });
  }

  async listMembershipsForUser(
    userId: string,
  ): Promise<OrganizationMembership[]> {
    const rows = await this.prisma.db.organizationMember.findMany({
      where: { userId, deletedAt: null },
      include: { organization: true },
      orderBy: { joinedAt: 'asc' },
    });

    return rows.map((row) => ({
      id: row.id,
      role: row.role,
      joinedAt: row.joinedAt.toISOString(),
      organization: this.serializeOrg(row.organization),
    }));
  }

  async updateOrganization(
    organizationId: string,
    data: {
      name?: string;
      address?: string | null;
      phone?: string | null;
      logoUrl?: string | null;
    },
  ): Promise<Organization> {
    const org = await this.prisma.db.organization.update({
      where: { id: organizationId },
      data,
    });
    return this.serializeOrg(org);
  }

  async createMembership(input: {
    organizationId: string;
    userId: string;
    role: OrgRole;
  }): Promise<OrganizationMembership> {
    const membership = await this.prisma.db.organizationMember.upsert({
      where: {
        organizationId_userId: {
          organizationId: input.organizationId,
          userId: input.userId,
        },
      },
      update: { deletedAt: null, role: input.role },
      create: input,
      include: { organization: true },
    });

    return {
      id: membership.id,
      role: membership.role,
      joinedAt: membership.joinedAt.toISOString(),
      organization: this.serializeOrg(membership.organization),
    };
  }

  private serializeOrg(org: {
    id: string;
    name: string;
    slug: string;
    address: string | null;
    phone: string | null;
    logoUrl: string | null;
    createdAt: Date;
  }): Organization {
    return {
      id: org.id,
      name: org.name,
      slug: org.slug,
      address: org.address,
      phone: org.phone,
      logoUrl: org.logoUrl,
      createdAt: org.createdAt.toISOString(),
    };
  }
}
