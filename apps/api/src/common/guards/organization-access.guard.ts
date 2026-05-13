import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import type { RequestWithClerkAuth } from './clerk-auth.guard';
import {
  TenantScope,
  type ResolvedScope,
} from '../tenant-scope/tenant-scope.service';

type RequestWithOrganizationAccess = RequestWithClerkAuth & {
  organizationAccess?: ResolvedScope;
};

@Injectable()
export class OrganizationAccessGuard implements CanActivate {
  constructor(private readonly tenantScope: TenantScope) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context
      .switchToHttp()
      .getRequest<RequestWithOrganizationAccess>();

    if (!request.clerkAuth?.userId) {
      throw new UnauthorizedException('Missing authenticated user');
    }

    request.organizationAccess = await this.tenantScope.require();

    return true;
  }
}

export type { RequestWithOrganizationAccess };
