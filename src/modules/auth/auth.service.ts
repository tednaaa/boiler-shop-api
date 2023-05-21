import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { UserService } from '@/modules/user/user.service';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UserService) {}

  async validateUser(username: string, password: string) {
    const user = await this.usersService.findByUsername(username);
    const isValidPassword = await bcrypt.compare(password, user.password);

    if (user && isValidPassword) {
      return {
        userId: user.id,
        username: user.username,
        email: user.email,
      };
    }

    return null;
  }
}
