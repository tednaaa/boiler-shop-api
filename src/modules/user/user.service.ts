import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import * as bcrypt from 'bcrypt';

import { User } from './user.model';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User) private userModel: typeof User) {}

  findByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ where: { email } });
  }

  findByUsername(username: string): Promise<User | null> {
    return this.userModel.findOne({ where: { username } });
  }

  async create(createUserDto: CreateUserDto): Promise<Omit<User, 'password'>> {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    const user = await this.userModel.create({
      email: createUserDto.email,
      username: createUserDto.username,
      password: hashedPassword,
    });

    const userWithoutPassword = user.toJSON();
    delete userWithoutPassword.password;

    return userWithoutPassword;
  }
}
