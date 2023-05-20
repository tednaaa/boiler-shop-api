import { ApiProperty } from '@nestjs/swagger';

export class LoginUserRequest {
  @ApiProperty({ example: 'Bob' })
  username: string;

  @ApiProperty({ example: '123456' })
  password: string;
}

export class LoginUserResponse {
  @ApiProperty({
    example: {
      userId: 1,
      username: 'Bob',
      email: 'Bob@example.com',
    },
  })
  user: {
    userId: number;
    username: string;
    email: string;
  };

  @ApiProperty({ example: 'Logged In' })
  message: string;
}

export class LogoutUserResponse {
  @ApiProperty({ example: 'Session has ended' })
  message: string;
}

export class LoginCheckResponse {
  @ApiProperty({ example: 1 })
  userId: number;

  @ApiProperty({ example: 'Bob' })
  username: string;

  @ApiProperty({ example: 'Bob@example.com' })
  email: string;
}

export class SignupResponse {
  @ApiProperty({ example: 1 })
  userId: number;

  @ApiProperty({ example: 'Bob' })
  username: string;

  @ApiProperty({ example: 'Bob@example.com' })
  email: string;

  @ApiProperty({ example: '2023-04-20T14:35:11.298Z' })
  updatedAt: string;

  @ApiProperty({ example: '2023-04-20T14:35:11.298Z' })
  createdAt: string;
}
