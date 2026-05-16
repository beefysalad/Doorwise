import { ForbiddenException, Injectable, Scope } from '@nestjs/common';
import { PLAN_LIMITS, type PlanTier } from '@workspace/shared';
import { PrismaService } from '../../prisma/prisma.service';
import type { ResolvedScope } from '../tenant-scope/tenant-scope.service';

/**
 * Enforces plan-tier quotas on resource creation. Backend source of truth is
 * PLAN_LIMITS in @workspace/shared.
 *
 * Property/Resident Prisma models do not exist yet — when they land, replace
 * the placeholder counts below with real `count()` queries. The assertion
 * shape is in place so feature controllers can call it from day one.
 */
@Injectable({ scope: Scope.REQUEST })
export class PlanQuotaService {
  private readonly planCache = new Map<string, PlanTier>();

  constructor(private readonly prisma: PrismaService) {}

  async assertCanCreateProperty(scope: ResolvedScope): Promise<void> {
    const plan = await this.getPlan(scope.organizationId);
    const limit = PLAN_LIMITS[plan].properties;
    if (limit === null) return;

    // TODO: replace with `this.prisma.db.property.count({ where: { organizationId: scope.organizationId } })`
    // once the Property model exists.
    const current = 0;

    if (current >= limit) {
      throw new ForbiddenException(
        `Your ${plan} plan allows ${limit} properties. Upgrade to add more.`,
      );
    }
  }

  async assertCanCreateResident(scope: ResolvedScope): Promise<void> {
    const plan = await this.getPlan(scope.organizationId);
    const limit = PLAN_LIMITS[plan].residents;
    if (limit === null) return;

    // TODO: replace with `this.prisma.db.resident.count(...)` once the Resident model exists.
    const current = 0;

    if (current >= limit) {
      throw new ForbiddenException(
        `Your ${plan} plan allows ${limit} residents. Upgrade to add more.`,
      );
    }
  }

  private async getPlan(organizationId: string): Promise<PlanTier> {
    const cached = this.planCache.get(organizationId);
    if (cached) {
      return cached;
    }

    const org = await this.prisma.db.organization.findUnique({
      where: { id: organizationId },
      select: { plan: true },
    });

    const plan = org?.plan ?? 'free';
    this.planCache.set(organizationId, plan);
    return plan;
  }
}
