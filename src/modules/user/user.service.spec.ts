import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/sequelize';
import * as bcrypt from 'bcrypt';

import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { User } from './user.model';

describe('UserService', () => {
  let userService: UserService;
  let userModel: typeof User;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getModelToken(User),
          useValue: User,
        },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
    userModel = module.get<typeof User>(getModelToken(User));
  });

  describe('findByEmail', () => {
    it('should find a user by email', async () => {
      const email = 'test@example.com';
      const user = {
        id: 1,
        email,
        username: 'testuser',
      } as User;

      jest.spyOn(userModel, 'findOne').mockResolvedValueOnce(user);

      const result = await userService.findByEmail(email);

      expect(result).toEqual(user);
      expect(userModel.findOne).toBeCalledWith({ where: { email } });
    });

    it('should return null if user with email is not found', async () => {
      const email = 'nonexistent@example.com';

      jest.spyOn(userModel, 'findOne').mockResolvedValueOnce(null);

      const result = await userService.findByEmail(email);

      expect(result).toBeNull();
      expect(userModel.findOne).toBeCalledWith({ where: { email } });
    });
  });

  describe('findByUsername', () => {
    it('should find a user by username', async () => {
      const username = 'testuser';
      const user = {
        id: 1,
        email: 'test@example.com',
        username,
      } as User;

      jest.spyOn(userModel, 'findOne').mockResolvedValueOnce(user);

      const result = await userService.findByUsername(username);

      expect(result).toEqual(user);
      expect(userModel.findOne).toBeCalledWith({ where: { username } });
    });

    it('should return null if user with username is not found', async () => {
      const username = 'nonexistent';

      jest.spyOn(userModel, 'findOne').mockResolvedValueOnce(null);

      const result = await userService.findByUsername(username);

      expect(result).toBeNull();
      expect(userModel.findOne).toBeCalledWith({ where: { username } });
    });
  });

  describe('create', () => {
    it('should create a new user and dont return password', async () => {
      const createUserDto: CreateUserDto = {
        email: 'test@example.com',
        username: 'testuser',
        password: 'password123',
      };
      const hashedPassword = 'hashedPassword';

      const parsedUser = {
        id: 1,
        email: createUserDto.email,
        username: createUserDto.username,
        password: createUserDto.password,
      };

      const user = {
        ...parsedUser,
        toJSON: jest.fn().mockReturnValueOnce(parsedUser),
      };

      jest
        .spyOn(bcrypt, 'hash')
        .mockImplementation(() => Promise.resolve(hashedPassword));
      jest.spyOn(userModel, 'create').mockResolvedValueOnce(user);

      const result = await userService.create(createUserDto);

      expect(bcrypt.hash).toBeCalledWith(createUserDto.password, 10);
      expect(userModel.create).toBeCalledWith({
        email: createUserDto.email,
        username: createUserDto.username,
        password: hashedPassword,
      });
      expect(user.toJSON).toBeCalled();
      expect(result).not.toHaveProperty('password');
    });
  });
});
