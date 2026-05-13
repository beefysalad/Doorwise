import { Injectable } from '@nestjs/common';
import type { OrgRole } from '@workspace/shared';
import { PrismaService } from '../prisma/prisma.service';

type CreateInviteInput = {
  organizationId: string;
  email: string;
  role: OrgRole;
  tokenHash: string;
  tenantProfileId?: string;
  expiresAt: Date;
};

type InviteRecord = {
  id: string;
  organizationId: string;
  email: string;
  role: OrgRole;
  tokenHash: string;
  tenantProfileId: string | null;
  expiresAt: Date;
  consumedAt: Date | null;
};

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
        tenantProfileId: input.tenantProfileId ?? null,
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
}

export type { InviteRecord };
