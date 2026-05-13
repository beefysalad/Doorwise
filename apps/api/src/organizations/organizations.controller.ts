import { Body, Controller, Get, Patch, Post, UseGuards } from '@nestjs/common';
import type {
  CreateOrganizationResponse,
  GetMyOrganizationsResponse,
  UpdateCurrentOrganizationResponse,
} from '@workspace/shared';
import { ClerkUserId } from '../common/decorators/clerk-user-id.decorator';
import { OrganizationAccess } from '../common/decorators/organization-access.decorator';
import { ClerkAuthGuard } from '../common/guards/clerk-auth.guard';
import { OrganizationAccessGuard } from '../common/guards/organization-access.guard';
import type { ResolvedScope } from '../common/tenant-scope/tenant-scope.service';
import { parseWithZod } from '../common/validation/parse-with-zod';
import { createOrganizationSchema } from './dto/create-organization.dto';
import { updateOrganizationSchema } from './dto/update-organization.dto';
import { OrganizationsService } from './organizations.service';

@Controller('organizations')
@UseGuards(ClerkAuthGuard)
export class OrganizationsController {
  constructor(private readonly organizationsService: OrganizationsService) {}

  @Post()
  createOrganization(
    @ClerkUserId() clerkUserId: string,
    @Body() body: unknown,
  ): Promise<CreateOrganizationResponse> {
    const dto = parseWithZod(createOrganizationSchema, body);
    return this.organizationsService.createOrganization(clerkUserId, dto);
  }

  @Get('me')
  getMyOrganizations(
    @ClerkUserId() clerkUserId: string,
  ): Promise<GetMyOrganizationsResponse> {
    return this.organizationsService.getMyOrganizations(clerkUserId);
  }

  @Patch('current')
  @UseGuards(OrganizationAccessGuard)
  updateCurrentOrganization(
    @OrganizationAccess() organizationAccess: ResolvedScope,
    @Body() body: unknown,
  ): Promise<UpdateCurrentOrganizationResponse> {
    const dto = parseWithZod(updateOrganizationSchema, body);
    return this.organizationsService.updateCurrentOrganization(
      organizationAccess,
      dto,
    );
  }
}
