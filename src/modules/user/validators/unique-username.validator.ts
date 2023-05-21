import { Injectable } from '@nestjs/common';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { UserService } from '../user.service';

@Injectable()
@ValidatorConstraint({ name: 'uniqueUsername', async: true })
export class UniqueUsernameValidator implements ValidatorConstraintInterface {
  constructor(private readonly userService: UserService) {}

  async validate(username: string): Promise<boolean> {
    const user = await this.userService.findByUsername(username);

    return !user;
  }

  defaultMessage(): string {
    return 'The username «$value» is already register.';
  }
}
