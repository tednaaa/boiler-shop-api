import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/sequelize';
import { createMock } from '@golevelup/ts-jest';
import * as bcrypt from 'bcrypt';

import { CreateUserDto } from '../users [draft]/dto/create-user.dto';
import { UsersService } from '../users [draft]/users.service';
import { User } from '../users [draft]/users.model';

describe('UsersService', () => {
  let usersService: UsersService;
  let userModel: jest.Mocked<typeof User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
    })
      .useMocker(createMock)
      .compile();

    usersService = module.get<UsersService>(UsersService);
    userModel = module.get<typeof User, jest.Mocked<typeof User>>(
      getModelToken(User),
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(usersService).toBeDefined();
  });

  // it('should find user by username', () => {
  //   const createdUserMock = {
  //     id: 1,
  //     username: createUserDto.username,
  //     email: createUserDto.email,
  //   };

  //   const findOneSpy = jest.spyOn(userModel, 'findOne');

  //   expect(
  //     usersService.findOne({ where: { username: createUserDto.username } }),
  //   );
  //   expect(findOneSpy).toBeCalledWith({
  //     where: { username: createUserDto.username },
  //   });
  // });

  it('should create user with hashed password and return user without it', async () => {
    const bcryptHashSpy = jest.spyOn(bcrypt, 'hash');
    const createSpy = jest.spyOn(userModel, 'create');

    const createUserDto: CreateUserDto = {
      username: 'test',
      password: '123456',
      email: 'test@test.com',
    };

    userModel.create.mockResolvedValueOnce(createMock<User>(createUserDto));

    const user = await usersService.create(createUserDto);

    expect(user).toHaveProperty('email', createUserDto.email);
    expect(user).toHaveProperty('username', createUserDto.username);
    expect(user).not.toHaveProperty('password');

    expect(bcryptHashSpy).toBeCalledWith(createUserDto.password, 10);
    expect(createSpy).toBeCalledWith(createUserDto);
  });
});
