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
import { ApiBody, ApiOkResponse } from '@nestjs/swagger';

import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthenticatedGuard } from './guards/authenticated.guard';
import {
  MeResponse,
  LoginRequest,
  LoginResponse,
  LogoutResponse,
  SignupResponse,
} from './types';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UserService } from '../user/user.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly userService: UserService) {}

  @ApiBody({ type: LoginRequest })
  @ApiOkResponse({ type: LoginResponse })
  @Header('Content-Type', 'application/json')
  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Request() request) {
    return { user: request.user, message: 'Logged In' };
  }

  @ApiOkResponse({ type: SignupResponse })
  @Header('Content-Type', 'application/json')
  @HttpCode(HttpStatus.CREATED)
  @Post('signup')
  signup(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @ApiOkResponse({ type: MeResponse })
  @UseGuards(AuthenticatedGuard)
  @Header('Content-Type', 'application/json')
  @Get('me')
  getProfile(@Request() request) {
    return request.user;
  }

  @ApiOkResponse({ type: LogoutResponse })
  @Header('Content-Type', 'application/json')
  @Get('logout')
  logout(@Request() request) {
    request.session.destroy();
    return { message: 'Session has ended' };
  }
}
