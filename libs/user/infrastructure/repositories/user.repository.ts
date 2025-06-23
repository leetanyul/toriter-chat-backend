import { Injectable } from '@nestjs/common';
import { UserRepository } from '@/libs/user/domain/interfaces/user.repository';
import { PrismaClient } from '@prisma/client';
import { User } from '@/libs/user/domain/models/user.model';
import { UserEntity } from '../models/user.entity';
import { UpdateUserEntityDTO } from '../dtos/update-user.dto';

@Injectable()
export class UserRepositoryImpl implements UserRepository {
  private readonly prisma = new PrismaClient();

  async findAll(): Promise<User[]> {
    try {
      const users = await this.prisma.user.findMany({
        select: {
          id: true,
          email: true,
          nickname: true,
          createdAt: true,
        },
      });
      return users.map(user => this.toDomain(new UserEntity(Number(user.id), user.email, user.nickname, user.createdAt)));
    } catch (error) {
      throw new Error(`Database connection failed: ${error.message}`);
    }
  }

  async findById(id: number): Promise<User | null> {
    try {
      const user = await this.prisma.user.findUnique({
        where: { id: BigInt(id) },
        select: {
          id: true,
          email: true,
          nickname: true,
          createdAt: true,
        },
      });
      return user ? this.toDomain(new UserEntity(Number(user.id), user.email, user.nickname, user.createdAt)) : null;
    } catch (error) {
      throw new Error(`Database connection failed: ${error.message}`);
    }
  }

  async updateUser(id: number, dto: UpdateUserEntityDTO): Promise<boolean> {
    try {
      const entity = new UserEntity(id, dto.email || '', dto.nickname || '', new Date());
      const data = {
        email: entity.email,
        nickname: entity.nickname,
      };
      const result = await this.prisma.user.update({
        where: { id: BigInt(entity.id) },
        data,
      });
      return !!result;
    } catch (error) {
      throw new Error(`Failed to update user: ${error.message}`);
    }
  }

  private toDomain(entity: UserEntity): User {
    return new User(entity.id, entity.email, entity.nickname, entity.createdAt);
  }
}
