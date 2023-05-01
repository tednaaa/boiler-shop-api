import { useContainer, validate, Validate } from 'class-validator';
import { Test, type TestingModule } from '@nestjs/testing';
import { createMock } from '@golevelup/ts-jest';

import { IsUserAlreadyExistEmail } from './is-user-already-exists-email.validator';
import { User } from '../users.model';

class UserDto {
  @Validate(IsUserAlreadyExistEmail)
  readonly email: string;

  constructor(email: string) {
    this.email = email;
  }
}

describe('IsUserAlreadyExistEmail', () => {
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [IsUserAlreadyExistEmail],
    })
      .useMocker(() => {
        return createMock<typeof User>({
          findOne: jest
            .fn()
            .mockImplementation((options: { where: { email: string } }) => {
              if (options.where.email === 'already-exists@test.com') {
                return createMock<User>();
              }
            }),
        });
      })
      .compile();

    useContainer(module, { fallbackOnErrors: true });
  });

  it.each([
    ['already-exists@test.com', 1],
    ['another@example.com', 0],
  ])(
    'should validate whether the user already exist by their email',
    async (email, errorsCount) => {
      const user = new UserDto(email);

      await expect(validate(user)).resolves.toHaveLength(errorsCount);
    },
  );
});
