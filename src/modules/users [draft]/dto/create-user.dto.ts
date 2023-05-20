import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, Validate } from 'class-validator';

import { IsUserAlreadyExistEmail } from '../validators/is-user-already-exists-email.validator';
import { IsUserAlreadyExistUsername } from '../validators/is-user-already-exists-username.validator';

export class CreateUserDto {
  @ApiProperty({ example: 'Bob@example.com' })
  @Validate(IsUserAlreadyExistEmail)
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @ApiProperty({ example: 'Bob' })
  @Validate(IsUserAlreadyExistUsername)
  @IsNotEmpty()
  readonly username: string;

  @ApiProperty({ example: '123456' })
  @IsNotEmpty()
  readonly password: string;
}
