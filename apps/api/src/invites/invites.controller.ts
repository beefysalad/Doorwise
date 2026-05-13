import { Body, Controller, Param, Post, UseGuards } from '@nestjs/common';
import type {
  AcceptInviteResponse,
  CreateInviteResponse,
} from '@workspace/shared';
import { ClerkUserId } from '../common/decorators/clerk-user-id.decorator';
import { OrganizationAccess } from '../common/decorators/organization-access.decorator';
import { ClerkAuthGuard } from '../common/guards/clerk-auth.guard';
import { OrganizationAccessGuard } from '../common/guards/organization-access.guard';
import type { ResolvedScope } from '../common/tenant-scope/tenant-scope.service';
import { parseWithZod } from '../common/validation/parse-with-zod';
import { createInviteSchema } from './dto/create-invite.dto';
import { InvitesService } from './invites.service';

@Controller()
@UseGuards(ClerkAuthGuard)
export class InvitesController {
  constructor(private readonly invitesService: InvitesService) {}

  @Post('organizations/current/invites')
  @UseGuards(OrganizationAccessGuard)
  createInvite(
    @OrganizationAccess() organizationAccess: ResolvedScope,
    @Body() body: unknown,
  ): Promise<CreateInviteResponse> {
    const dto = parseWithZod(createInviteSchema, body);
    return this.invitesService.createInvite(organizationAccess, dto);
  }

  @Post('invites/:token/accept')
  acceptInvite(
    @ClerkUserId() clerkUserId: string,
    @Param('token') token: string,
  ): Promise<AcceptInviteResponse> {
    return this.invitesService.acceptInvite(clerkUserId, token);
  }
}
