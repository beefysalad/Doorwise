import { Body, Controller, Get, Patch, Post, UseGuards } from '@nestjs/common';
import type {
  CurrentUserResponse,
  GetAllUsersResponse,
  SetIntendedRoleResponse,
} from '@workspace/shared';
import { ClerkUserId } from '../common/decorators/clerk-user-id.decorator';
import { ClerkAuthGuard } from '../common/guards/clerk-auth.guard';
import { parseWithZod } from '../common/validation/parse-with-zod';
import { setIntendedRoleSchema } from './dto/set-intended-role.dto';
import { UsersService } from './users.service';

@Controller('users')
@UseGuards(ClerkAuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('me/sync')
  syncCurrentUser(
    @ClerkUserId() clerkUserId: string,
  ): Promise<CurrentUserResponse> {
    return this.usersService.syncCurrentUser(clerkUserId);
  }

  @Get('me')
  getCurrentUser(
    @ClerkUserId() clerkUserId: string,
  ): Promise<CurrentUserResponse> {
    return this.usersService.syncCurrentUser(clerkUserId);
  }

  @Patch('me/role')
  setIntendedRole(
    @ClerkUserId() clerkUserId: string,
    @Body() body: unknown,
  ): Promise<SetIntendedRoleResponse> {
    const dto = parseWithZod(setIntendedRoleSchema, body);
    return this.usersService.setIntendedRole(clerkUserId, dto.role);
  }

  /**
   * @deprecated Returns every user in the database to any authenticated caller.
   * This is a cross-tenant data leak retained only because the dev-only
   * dashboard/users/data scaffolding pages still consume it. Replace with an
   * org-scoped membership listing endpoint before going to production.
   */
  @Get('all')
  async getAllUsers(): Promise<GetAllUsersResponse> {
    return await this.usersService.getAllUsers();
  }
}
