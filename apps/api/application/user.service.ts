import { Injectable } from '@nestjs/common';
import { UserRepositoryImpl } from '@/libs/user/infrastructure/repositories/user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepositoryImpl) {}

  async getAllUsers() {
    return await this.userRepository.findAll();
  }
}
