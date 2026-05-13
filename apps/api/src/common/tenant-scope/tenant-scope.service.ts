import {
  Inject,
  Injectable,
  Scope,
  UnauthorizedException,
} from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import type { OrgRole } from '@workspace/shared';
import type { RequestWithClerkAuth } from '../guards/clerk-auth.guard';
import { PrismaService } from '../../prisma/prisma.service';

type ResolvedScope = {
  userId: string;
  organizationId: string;
  role: OrgRole;
  membershipId: string;
};

const ACTIVE_ORG_HEADER = 'x-active-org';

@Injectable({ scope: Scope.REQUEST })
export class TenantScope {
  private resolved: ResolvedScope | null = null;

  constructor(
    @Inject(REQUEST) private readonly request: RequestWithClerkAuth,
    private readonly prisma: PrismaService,
  ) {}

  async require(): Promise<ResolvedScope> {
    if (this.resolved) {
      return this.resolved;
    }

    const clerkUserId = this.request.clerkAuth?.userId;

    if (!clerkUserId) {
      throw new UnauthorizedException('Missing Clerk authentication');
    }

    const user = await this.prisma.db.user.findUnique({
      where: { clerkId: clerkUserId },
      select: { id: true },
    });

    if (!user) {
      throw new UnauthorizedException('Clerk user is not provisioned');
    }

    const requestedOrgId = this.readActiveOrgHeader();

    const memberships = await this.prisma.db.organizationMember.findMany({
      where: { userId: user.id, deletedAt: null },
      select: { id: true, organizationId: true, role: true },
    });

    if (memberships.length === 0) {
      throw new UnauthorizedException('User has no active organization');
    }

    const chosen = requestedOrgId
      ? memberships.find((m) => m.organizationId === requestedOrgId)
      : memberships.length === 1
        ? memberships[0]
        : null;

    if (!chosen) {
      throw new UnauthorizedException(
        requestedOrgId
          ? 'User is not a member of the requested organization'
          : 'Active organization header is required',
      );
    }

    this.resolved = {
      userId: user.id,
      organizationId: chosen.organizationId,
      role: chosen.role,
      membershipId: chosen.id,
    };

    return this.resolved;
  }

  private readActiveOrgHeader(): string | null {
    const raw = this.request.headers[ACTIVE_ORG_HEADER];

    if (typeof raw === 'string' && raw.length > 0) {
      return raw;
    }

    if (Array.isArray(raw) && raw.length > 0) {
      return raw[0] ?? null;
    }

    return null;
  }
}

export { ACTIVE_ORG_HEADER };
export type { ResolvedScope };
