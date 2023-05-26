import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { UserService } from '../user/user.service';
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
import { createMock } from '@golevelup/ts-jest';

describe('AuthController', () => {
  let authController: AuthController;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
    })
      .useMocker(createMock)
      .compile();

    authController = module.get<AuthController>(AuthController);
    userService = module.get<UserService>(UserService);
  });

  describe('login', () => {
    it('should return the user and message on successful login', () => {
      const request = {
        user: { id: 1, username: 'testuser', email: 'test@example.com' },
      };

      const response: LoginResponse = authController.login(request);

      expect(response.user).toEqual(request.user);
      expect(response.message).toBe('Logged In');
    });
  });

  describe('signup', () => {
    it('should return the response from the user service create method', async () => {
      const createUserDto: CreateUserDto = {
        email: 'test@example.com',
        username: 'testuser',
        password: 'password123',
      };

      authController.signup(createUserDto);

      expect(userService.create).toHaveBeenCalledWith(createUserDto);
    });
  });

  describe('getProfile', () => {
    it('should return the user from the request object', async () => {
      const request = {
        user: { id: 1, username: 'testuser', email: 'test@example.com' },
      };

      const response: MeResponse = await authController.getProfile(request);

      expect(response).toEqual(request.user);
    });
  });

  describe('logout', () => {
    it('should destroy the session and return a logout message', () => {
      const request = {
        session: {
          destroy: jest.fn(),
        },
      };

      const response: LogoutResponse = authController.logout(request);

      expect(request.session.destroy).toHaveBeenCalled();
      expect(response).toEqual({ message: 'Session has ended' });
    });
  });
});
