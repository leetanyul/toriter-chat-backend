import { PrismaClient } from '@prisma/client';
import { User } from '@/libs/user/domain/models/user.model';
import { UserRepository } from '@/libs/user/domain/interfaces/user.repository';

export class MysqlUserRepository implements UserRepository {
  private prisma = new PrismaClient();

  async findById(id: number): Promise<User | null> {
    const user = await this.prisma.user.findUnique({ where: { id } });
    return user
      ? new User(Number(user.id), user.email, user.nickname, user.createdAt)
      : null;
  }

  async findAll(): Promise<User[]> {
    const users = await this.prisma.user.findMany();
    return users.map(
      (user) =>
        new User(Number(user.id), user.email, user.nickname, user.createdAt),
    );
  }

  async updateUser(
    id: number,
    data: { email?: string; nickname?: string },
  ): Promise<boolean> {
    const updated = await this.prisma.user.update({
      where: { id },
      data,
    });
    return !!updated;
  }
}
