import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { UniqueEmailValidator } from './validators/unique-email.validator';
import { UniqueUsernameValidator } from './validators/unique-username.validator';
import { UserService } from './user.service';
import { User } from './user.model';

@Module({
  imports: [SequelizeModule.forFeature([User])],
  providers: [UserService, UniqueEmailValidator, UniqueUsernameValidator],
  exports: [UserService],
})
export class UserModule {}
