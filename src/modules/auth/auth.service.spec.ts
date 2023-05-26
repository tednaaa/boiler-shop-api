import { Test, TestingModule } from '@nestjs/testing';
import * as bcrypt from 'bcrypt';

import { UserService } from '@/modules/user/user.service';
import { AuthService } from './auth.service';
import { createMock } from '@golevelup/ts-jest';
import { User } from '../user/user.model';

describe('AuthService', () => {
  let authService: AuthService;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService],
    })
      .useMocker(createMock)
      .compile();

    authService = module.get<AuthService>(AuthService);
    userService = module.get<UserService>(UserService);
  });

  describe('validateUser', () => {
    it('should return user data if username and password are valid', async () => {
      const username = 'testuser';
      const password = 'password123';

      const user = {
        id: 1,
        username: 'testuser',
        email: 'test@example.com',
        password: await bcrypt.hash(password, 10),
      } as User;

      jest.spyOn(userService, 'findByUsername').mockResolvedValueOnce(user);
      jest
        .spyOn(bcrypt, 'compare')
        .mockImplementation(() => Promise.resolve(true));

      const result = await authService.validateUser(username, password);

      expect(result).toEqual({
        userId: user.id,
        username: user.username,
        email: user.email,
      });

      expect(userService.findByUsername).toBeCalledWith(username);
      expect(bcrypt.compare).toBeCalledWith(password, user.password);
    });

    it('should return null if username or password are invalid', async () => {
      const username = 'testuser';
      const password = 'password123';

      jest.spyOn(userService, 'findByUsername').mockResolvedValueOnce(null);

      const result = await authService.validateUser(username, password);

      expect(result).toBeNull();
      expect(userService.findByUsername).toBeCalledWith(username);
    });
  });
});
