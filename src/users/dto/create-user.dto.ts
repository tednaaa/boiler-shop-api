import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'Bob' })
  @IsNotEmpty()
  readonly username: string;

  @ApiProperty({ example: '123456' })
  @IsNotEmpty()
  readonly password: string;

  @ApiProperty({ example: 'Bob@example.com' })
  @IsNotEmpty()
  readonly email: string;
}
