import { createHash, randomBytes } from 'node:crypto';
import {
  BadRequestException,
  ForbiddenException,
  GoneException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import type {
  AcceptInviteResponse,
  CreateInviteResponse,
} from '@workspace/shared';
import { TenantScope } from '../common/tenant-scope/tenant-scope.service';
import { UsersService } from '../users/users.service';
import type { CreateInviteDto } from './dto/create-invite.dto';
import {
  InviteAlreadyConsumedError,
  InvitesRepository,
} from './invites.repository';

const INVITE_TTL_DAYS = 7;

@Injectable()
export class InvitesService {
  constructor(
    private readonly invitesRepository: InvitesRepository,
    private readonly usersService: UsersService,
    private readonly tenantScope: TenantScope,
  ) {}

  async createInvite(dto: CreateInviteDto): Promise<CreateInviteResponse> {
    const scope = await this.tenantScope.require();

    if (scope.role !== 'owner') {
      throw new ForbiddenException('Only owners can send invites');
    }

    const token = randomBytes(32).toString('base64url');
    const tokenHash = this.hashToken(token);
    const expiresAt = new Date(
      Date.now() + INVITE_TTL_DAYS * 24 * 60 * 60 * 1000,
    );

    const invite = await this.invitesRepository.create({
      organizationId: scope.organizationId,
      email: dto.email,
      role: dto.role,
      tokenHash,
      tenantProfileId: dto.tenantProfileId,
      expiresAt,
    });

    const appUrl = process.env.APP_URL;

    if (!appUrl) {
      throw new InternalServerErrorException(
        'APP_URL is not configured. Set it in apps/api/.env (dev) or in your deployment environment (prod).',
      );
    }

    return {
      id: invite.id,
      email: invite.email,
      role: invite.role,
      expiresAt: invite.expiresAt.toISOString(),
      inviteUrl: `${appUrl.replace(/\/$/, '')}/invite/${token}`,
    };
  }

  async acceptInvite(
    clerkUserId: string,
    token: string,
  ): Promise<AcceptInviteResponse> {
    if (!token || token.length < 16) {
      throw new BadRequestException('Invalid invite token');
    }

    const tokenHash = this.hashToken(token);
    const invite = await this.invitesRepository.findByTokenHash(tokenHash);

    if (!invite) {
      throw new NotFoundException('Invite not found');
    }

    if (invite.consumedAt) {
      throw new GoneException('Invite has already been used');
    }

    if (invite.expiresAt.getTime() < Date.now()) {
      throw new GoneException('Invite has expired');
    }

    const user = await this.usersService.syncCurrentUser(clerkUserId);

    if (invite.email.trim().toLowerCase() !== user.email.trim().toLowerCase()) {
      throw new ForbiddenException(
        'This invite was sent to a different email address',
      );
    }

    try {
      return await this.invitesRepository.acceptInvite({
        inviteId: invite.id,
        organizationId: invite.organizationId,
        userId: user.id,
        role: invite.role,
      });
    } catch (error) {
      if (error instanceof InviteAlreadyConsumedError) {
        throw new GoneException('Invite has already been used');
      }

      throw error;
    }
  }

  private hashToken(token: string): string {
    return createHash('sha256').update(token).digest('hex');
  }
}
