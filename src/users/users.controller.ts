import {
  Body,
  Controller,
  Get,
  Header,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';

import { LocalAuthGuard } from '../auth/local-auth.guard';
import { AuthenticatedGuard } from '../auth/authenticated.guard';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/signup')
  @HttpCode(HttpStatus.CREATED)
  @Header('Content-Type', 'application/json')
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Post('/login')
  @UseGuards(LocalAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Header('Content-Type', 'application/json')
  login(@Request() request) {
    return { user: request.user, message: 'Logged in' };
  }

  @Get('/login-check')
  @UseGuards(AuthenticatedGuard)
  @Header('Content-Type', 'application/json')
  loginCheck(@Request() request) {
    return request.user;
  }

  @Get('/logout')
  @UseGuards(AuthenticatedGuard)
  @Header('Content-Type', 'application/json')
  logout(@Request() request) {
    request.session.destroy();
    return { message: 'Session has ended' };
  }
}
