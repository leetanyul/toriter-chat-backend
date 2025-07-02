import { Controller, Get, Param, Put, Body } from '@nestjs/common';
import { UserService } from '@/libs/user/application/user.service';
import { UserDTO } from '@/libs/user/presentation/dtos/user.dto';
import { UpdateUserDTO } from '@/libs/user/presentation/dtos/update-user.dto';
import { ResponseModel, ResponseCode } from '@/libs/shared/models/response.model';
import { User } from '@/libs/user/domain/models/user.model';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get()
  async getUsers(): Promise<ResponseModel<UserDTO[]>> {
    const users = await this.userService.getAllUsers();
    return new ResponseModel(true, ResponseCode.SUCCESS, 'Users retrieved successfully', users.map(UserDTO.fromDomain));
  }

  @Get(':id')
  async getUserById(@Param('id') id: number): Promise<ResponseModel<UserDTO | null>> {
    const user = await this.userService.getUserById(id);
    if (user) {
      return new ResponseModel(true, ResponseCode.SUCCESS, 'User retrieved successfully', UserDTO.fromDomain(user));
    }
    return new ResponseModel(false, ResponseCode.FAIL, 'User not found', null);
  }

  @Put(':id')
  async updateUser(
    @Param('id') id: number,
    @Body() updateUserDto: UpdateUserDTO,
  ): Promise<ResponseModel<null>> {
    const user = User.fromUpdateDTO(id, updateUserDto);
    const success = await this.userService.updateUser(user);
    if (success) {
      return new ResponseModel(true, ResponseCode.SUCCESS, 'User updated successfully', null);
    }
    return new ResponseModel(false, ResponseCode.FAIL, 'Failed to update user', null);
  }
}
