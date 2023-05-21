import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, Validate } from 'class-validator';

import { UniqueEmailValidator } from '../validators/unique-email.validator';
import { UniqueUsernameValidator } from '../validators/unique-username.validator';

export class CreateUserDto {
  @ApiProperty({ example: 'Bob@example.com' })
  @Validate(UniqueEmailValidator)
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @ApiProperty({ example: 'Bob' })
  @Validate(UniqueUsernameValidator)
  @IsNotEmpty()
  readonly username: string;

  @ApiProperty({ example: '123456' })
  @IsNotEmpty()
  readonly password: string;
}
