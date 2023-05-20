import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './users.model';
import { IsUserAlreadyExistEmail } from './validators/is-user-already-exists-email.validator';
import { IsUserAlreadyExistUsername } from './validators/is-user-already-exists-username.validator';

@Module({
  imports: [SequelizeModule.forFeature([User])],
  controllers: [UsersController],
  providers: [
    UsersService,
    IsUserAlreadyExistEmail,
    IsUserAlreadyExistUsername,
  ],
  exports: [UsersService],
})
export class UsersModule {}
