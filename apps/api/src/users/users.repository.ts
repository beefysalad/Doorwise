import { Injectable } from '@nestjs/common';
import type {
  CurrentUserResponse,
  GetAllUsersResponse,
  SignupRole,
} from '@workspace/shared';
import { PrismaService } from '../prisma/prisma.service';

type UpsertClerkUserInput = {
  clerkId: string;
  email: string;
  name: string;
  imageUrl: string | null;
};

type UserRow = {
  id: string;
  email: string;
  name: string;
  imageUrl: string | null;
  intendedRole: SignupRole | null;
};

@Injectable()
export class UsersRepository {
  constructor(private readonly prisma: PrismaService) {}

  async upsertClerkUser(
    input: UpsertClerkUserInput,
  ): Promise<CurrentUserResponse> {
    const user = (await this.prisma.db.user.upsert({
      where: { clerkId: input.clerkId },
      update: input,
      create: input,
    })) as UserRow;

    return this.toResponse(user, input.clerkId);
  }

  async setIntendedRole(
    clerkId: string,
    role: SignupRole,
  ): Promise<CurrentUserResponse> {
    const user = (await this.prisma.db.user.update({
      where: { clerkId },
      data: { intendedRole: role },
    })) as UserRow;

    return this.toResponse(user, clerkId);
  }

  async clearIntendedRole(clerkId: string): Promise<void> {
    await this.prisma.db.user.update({
      where: { clerkId },
      data: { intendedRole: null },
    });
  }

  private toResponse(user: UserRow, clerkId: string): CurrentUserResponse {
    return {
      id: user.id,
      clerkId,
      email: user.email,
      name: user.name,
      imageUrl: user.imageUrl,
      intendedRole: user.intendedRole,
    };
  }

  async deleteByClerkId(clerkId: string): Promise<void> {
    await this.prisma.db.user.deleteMany({
      where: {
        clerkId,
      },
    });
  }
  async getAllUsers(): Promise<GetAllUsersResponse> {
    const users = await this.prisma.db.user.findMany({
      where: {
        clerkId: {
          not: null,
        },
      },
      select: {
        id: true,
        clerkId: true,
        email: true,
        name: true,
        imageUrl: true,
      },
    });

    return {
      users: users.map((user) => ({
        id: user.id,
        clerkId: user.clerkId!,
        email: user.email,
        name: user.name,
        imageUrl: user.imageUrl,
      })),
    };
  }
}
