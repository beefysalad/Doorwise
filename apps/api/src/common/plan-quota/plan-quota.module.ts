import { Module } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { PlanQuotaService } from './plan-quota.service';

@Module({
  providers: [PrismaService, PlanQuotaService],
  exports: [PlanQuotaService],
})
export class PlanQuotaModule {}
