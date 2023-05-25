import { Test, TestingModule } from '@nestjs/testing';
import { createMock } from '@golevelup/ts-jest';

import { UserService } from '../user.service';
import { User } from '../user.model';
import { UniqueEmailValidator } from './unique-email.validator';

describe('UniqueEmailValidator', () => {
  let uniqueEmailValidator: UniqueEmailValidator;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UniqueEmailValidator],
    })
      .useMocker(createMock)
      .compile();

    userService = module.get<UserService>(UserService);
    uniqueEmailValidator =
      module.get<UniqueEmailValidator>(UniqueEmailValidator);
  });

  describe('validate', () => {
    it('should return true when username is unique', async () => {
      const email = 'test@test.com';

      jest.spyOn(userService, 'findByEmail').mockResolvedValueOnce(null);

      const result = await uniqueEmailValidator.validate(email);

      expect(result).toBe(true);
      expect(userService.findByEmail).toBeCalledWith(email);
    });

    it('should return false when username is already registered', async () => {
      const email = 'test@test.com';

      jest
        .spyOn(userService, 'findByEmail')
        .mockResolvedValueOnce({ email } as User);

      const result = await uniqueEmailValidator.validate(email);

      expect(result).toBe(false);
      expect(userService.findByEmail).toBeCalledWith(email);
    });
  });

  describe('defaultMessage', () => {
    it('should return the default error message', () => {
      const defaultMessage = uniqueEmailValidator.defaultMessage();

      expect(defaultMessage).toBe('The email «$value» is already registered.');
    });
  });
});
