import { Test } from '@nestjs/testing';
import { UniqueUsernameValidator } from './unique-username.validator';
import { UserService } from '../user.service';
import { createMock } from '@golevelup/ts-jest';

describe('UniqueUsernameValidator', () => {
  let uniqueUsernameValidator: UniqueUsernameValidator;
  let userService: UserService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [UniqueUsernameValidator, UserService],
    })
      .useMocker(createMock)
      .compile();

    uniqueUsernameValidator = module.get<UniqueUsernameValidator>(
      UniqueUsernameValidator,
    );
    userService = module.get<UserService>(UserService);
  });

  describe('validate', () => {
    it('should return true if username is unique', async () => {
      userService.findByUsername = jest.fn().mockResolvedValue(null);

      const result = await uniqueUsernameValidator.validate('testUser');

      expect(result).toBe(true);
      expect(userService.findByUsername).toHaveBeenCalledWith('testUser');
    });

    it('should return false if username is already registered', async () => {
      userService.findByUsername = jest
        .fn()
        .mockResolvedValue({ id: 1, username: 'testUser' });

      const result = await uniqueUsernameValidator.validate('testUser');

      expect(result).toBe(false);
      expect(userService.findByUsername).toHaveBeenCalledWith('testUser');
    });
  });

  describe('defaultMessage', () => {
    it('should return the default error message', () => {
      const message = uniqueUsernameValidator.defaultMessage();

      expect(message).toBe('The username «$value» is already registered.');
    });
  });
});
