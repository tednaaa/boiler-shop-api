import { Test, TestingModule } from '@nestjs/testing';
import { UnauthorizedException } from '@nestjs/common';
import { createMock } from '@golevelup/ts-jest';

import { AuthService } from '../auth.service';
import { LocalStrategy } from './local.strategy';

describe('LocalStrategy', () => {
  let localStrategy: LocalStrategy;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LocalStrategy],
    })
      .useMocker(createMock)
      .compile();

    localStrategy = module.get<LocalStrategy>(LocalStrategy);
    authService = module.get<AuthService>(AuthService);
  });

  describe('validate', () => {
    it('should return user data if validation succeeds', async () => {
      const username = 'testuser';
      const password = 'password123';

      const user = {
        userId: 1,
        username,
        email: 'test@example.com',
      };

      jest.spyOn(authService, 'validateUser').mockResolvedValueOnce(user);

      const result = await localStrategy.validate(username, password);

      expect(result).toEqual(user);
      expect(authService.validateUser).toHaveBeenCalledWith(username, password);
    });

    it('should throw UnauthorizedException if validation fails', async () => {
      const username = 'testuser';
      const password = 'password123';

      jest.spyOn(authService, 'validateUser').mockResolvedValueOnce(null);

      await expect(localStrategy.validate(username, password)).rejects.toThrow(
        UnauthorizedException,
      );
      expect(authService.validateUser).toHaveBeenCalledWith(username, password);
    });
  });
});
