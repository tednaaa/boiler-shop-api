import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/sequelize';

import { User } from './users.model';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
  ) {}

  findOne(filter: {
    where: { id?: string; username?: string; email?: string };
  }): Promise<User> {
    return this.userModel.findOne(filter);
  }

  async create(
    createUserDto: CreateUserDto,
  ): Promise<User | { warningMessage: string }> {
    const existingByUsername = await this.userModel.findOne({
      where: { username: createUserDto.username },
    });
    const existingByEmail = await this.userModel.findOne({
      where: { email: createUserDto.email },
    });

    if (existingByUsername) {
      return { warningMessage: 'Пользователь с таким именем уже существует' };
    }
    if (existingByEmail) {
      return { warningMessage: 'Пользователь с таким email уже существует' };
    }

    const user = new User();
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    user.username = createUserDto.username;
    user.email = createUserDto.email;
    user.password = hashedPassword;

    return user.save();
  }
}
