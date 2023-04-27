import { INestApplication } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { TestingModule, Test } from '@nestjs/testing';

import { SequelizeConfigService } from 'src/config/sequelize-config.service';
import { databaseConfig } from 'src/config/configuration';
import { UsersModule } from 'src/users/users.module';
import { User } from 'src/users/users.model';
import { UsersService } from 'src/users/users.service';

const mockedUser = {
  username: 'Test',
  email: 'Test@example.com',
  password: 'Test123456',
};

describe('Users Service', () => {
  let app: INestApplication;
  let usersService: UsersService;

  beforeEach(async () => {
    const testModule: TestingModule = await Test.createTestingModule({
      imports: [
        SequelizeModule.forRootAsync({
          imports: [ConfigModule],
          useClass: SequelizeConfigService,
        }),
        ConfigModule.forRoot({ load: [databaseConfig] }),
        UsersModule,
      ],
    }).compile();

    usersService = testModule.get<UsersService>(UsersService);

    app = testModule.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await User.destroy({ where: { username: mockedUser.username } });
  });

  it('should create user', async () => {
    const user = (await usersService.create(mockedUser)) as User;

    expect(user.username).toBe(mockedUser.username);
    expect(user.email).toBe(mockedUser.email);
  });
});
