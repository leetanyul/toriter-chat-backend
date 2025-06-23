import { Injectable } from '@nestjs/common';
import { UserRepositoryImpl } from '@/libs/user/infrastructure/repositories/user.repository';
import { User } from '@/libs/user/domain/models/user.model';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepositoryImpl) {}

  async getAllUsers(): Promise<User[]> {
    return await this.userRepository.findAll();
  }

  async getUserById(id: number): Promise<User | null> {
    return await this.userRepository.findById(id);
  }

  async updateUser(user: User): Promise<boolean> {
    const data = {
      email: user.email,
      nickname: user.nickname,
    };
    return await this.userRepository.updateUser(user.id, data);
  }
}
