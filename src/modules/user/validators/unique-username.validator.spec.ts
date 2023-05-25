import { UserService } from '../user.service';
import { Test, TestingModule } from '@nestjs/testing';
import { UniqueUsernameValidator } from './unique-username.validator';
import { User } from '../user.model';
import { createMock } from '@golevelup/ts-jest';

describe('UniqueUsernameValidator', () => {
  let uniqueUsernameValidator: UniqueUsernameValidator;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UniqueUsernameValidator],
    })
      .useMocker(createMock)
      .compile();

    userService = module.get<UserService>(UserService);
    uniqueUsernameValidator = module.get<UniqueUsernameValidator>(
      UniqueUsernameValidator,
    );
  });

  describe('validate', () => {
    it('should return true when username is unique', async () => {
      const username = 'test';

      jest.spyOn(userService, 'findByUsername').mockResolvedValueOnce(null);

      const result = await uniqueUsernameValidator.validate(username);

      expect(result).toBe(true);
      expect(userService.findByUsername).toHaveBeenCalledWith(username);
    });

    it('should return false when username is already registered', async () => {
      const username = 'test';

      jest
        .spyOn(userService, 'findByUsername')
        .mockResolvedValueOnce({ username } as User);

      const result = await uniqueUsernameValidator.validate(username);

      expect(result).toBe(false);
      expect(userService.findByUsername).toHaveBeenCalledWith(username);
    });
  });

  describe('defaultMessage', () => {
    it('should return the default error message', () => {
      const defaultMessage = uniqueUsernameValidator.defaultMessage();

      expect(defaultMessage).toBe(
        'The username «$value» is already registered.',
      );
    });
  });
});
