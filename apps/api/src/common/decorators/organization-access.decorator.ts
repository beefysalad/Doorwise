import {
  createParamDecorator,
  ExecutionContext,
  InternalServerErrorException,
} from '@nestjs/common';
import type { RequestWithOrganizationAccess } from '../guards/organization-access.guard';
import type { ResolvedScope } from '../tenant-scope/tenant-scope.service';

export const OrganizationAccess = createParamDecorator(
  (_data: unknown, context: ExecutionContext): ResolvedScope => {
    const request = context
      .switchToHttp()
      .getRequest<RequestWithOrganizationAccess>();

    if (!request.organizationAccess) {
      throw new InternalServerErrorException(
        'Organization access is missing from request',
      );
    }

    return request.organizationAccess;
  },
);
