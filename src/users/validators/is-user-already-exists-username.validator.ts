import { Injectable } from '@nestjs/common';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

import { User } from '../users.model';
import { InjectModel } from '@nestjs/sequelize';

@ValidatorConstraint({ async: true })
@Injectable()
export class IsUserAlreadyExistUsername
  implements ValidatorConstraintInterface
{
  constructor(
    @InjectModel(User)
    private readonly userModel: typeof User,
  ) {}

  async validate(username: string): Promise<boolean> {
    const user = await this.userModel.findOne({ where: { username } });

    return user === null || user === undefined;
  }

  defaultMessage(): string {
    return 'The username «$value» is already register.';
  }
}
