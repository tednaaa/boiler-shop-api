import { Injectable } from '@nestjs/common';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

import { User } from '../users.model';
import { InjectModel } from '@nestjs/sequelize';

@ValidatorConstraint({ async: true })
@Injectable()
export class IsUserAlreadyExistEmail implements ValidatorConstraintInterface {
  constructor(
    @InjectModel(User)
    private readonly userModel: typeof User,
  ) {}

  async validate(email: string): Promise<boolean> {
    const user = await this.userModel.findOne({ where: { email } });

    return user === null || user === undefined;
  }

  defaultMessage(): string {
    return 'The email «$value» is already register.';
  }
}
