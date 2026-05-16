import { Injectable } from '@nestjs/common';
import type { OrganizationMembership, OrgRole } from '@workspace/shared';
import { PrismaService } from '../prisma/prisma.service';

type CreateInviteInput = {
  organizationId: string;
  email: string;
  role: OrgRole;
  tokenHash: string;
  expiresAt: Date;
};

type InviteRecord = {
  id: string;
  organizationId: string;
  email: string;
  role: OrgRole;
  tokenHash: string;
  expiresAt: Date;
  consumedAt: Date | null;
};

type AcceptInviteInput = {
  inviteId: string;
  organizationId: string;
  userId: string;
  role: OrgRole;
};

class InviteAlreadyConsumedError extends Error {
  constructor() {
    super('Invite has already been used');
  }
}

@Injectable()
export class InvitesRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(input: CreateInviteInput): Promise<InviteRecord> {
    const row = await this.prisma.db.organizationInvite.create({
      data: {
        organizationId: input.organizationId,
        email: input.email,
        role: input.role,
        tokenHash: input.tokenHash,
        expiresAt: input.expiresAt,
      },
    });
    return row;
  }

  async findByTokenHash(tokenHash: string): Promise<InviteRecord | null> {
    const row = await this.prisma.db.organizationInvite.findUnique({
      where: { tokenHash },
    });
    return row ?? null;
  }

  async markConsumed(id: string): Promise<void> {
    await this.prisma.db.organizationInvite.update({
      where: { id },
      data: { consumedAt: new Date() },
    });
  }

  async acceptInvite(
    input: AcceptInviteInput,
  ): Promise<OrganizationMembership> {
    return this.prisma.db.$transaction(async (tx) => {
      const consumeResult = await tx.organizationInvite.updateMany({
        where: {
          id: input.inviteId,
          consumedAt: null,
        },
        data: {
          consumedAt: new Date(),
        },
      });

      if (consumeResult.count === 0) {
        throw new InviteAlreadyConsumedError();
      }

      const membership = await tx.organizationMember.upsert({
        where: {
          organizationId_userId: {
            organizationId: input.organizationId,
            userId: input.userId,
          },
        },
        update: { deletedAt: null, role: input.role },
        create: {
          organizationId: input.organizationId,
          userId: input.userId,
          role: input.role,
        },
        include: { organization: true },
      });

      return {
        id: membership.id,
        role: membership.role,
        joinedAt: membership.joinedAt.toISOString(),
        organization: {
          id: membership.organization.id,
          name: membership.organization.name,
          slug: membership.organization.slug,
          address: membership.organization.address,
          phone: membership.organization.phone,
          logoUrl: membership.organization.logoUrl,
          plan: membership.organization.plan,
          createdAt: membership.organization.createdAt.toISOString(),
        },
      };
    });
  }
}

export { InviteAlreadyConsumedError };
export type { InviteRecord };
