import { useContainer, validate, Validate } from 'class-validator';
import { Test, type TestingModule } from '@nestjs/testing';
import { createMock } from '@golevelup/ts-jest';
import { FindOptions } from 'sequelize';

import { User } from '../users.model';
import { IsUserAlreadyExistUsername } from './is-user-already-exists-username.validator';

class UserDto {
  @Validate(IsUserAlreadyExistUsername)
  readonly username: string;

  constructor(username: string) {
    this.username = username;
  }
}

describe('IsUserAlreadyExistUsername', () => {
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [IsUserAlreadyExistUsername],
    })
      .useMocker(() => {
        return createMock<typeof User>({
          findOne: jest
            .fn()
            .mockImplementation((options: { where: { username: string } }) => {
              if (options.where.username === 'already-exists-username') {
                return createMock<User>();
              }
            }),
        });
      })
      .compile();

    useContainer(module, { fallbackOnErrors: true });
  });

  it.each([
    ['already-exists-username', 1],
    ['another-username', 0],
  ])(
    'should validate whether the user already exist by their username',
    async (username, errorsCount) => {
      const user = new UserDto(username);

      await expect(validate(user)).resolves.toHaveLength(errorsCount);
    },
  );
});
