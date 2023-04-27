import { INestApplication } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { TestingModule, Test } from '@nestjs/testing';
import * as bcrypt from 'bcrypt';

import { SequelizeConfigService } from 'src/config/sequelize-config.service';
import { databaseConfig } from 'src/config/configuration';
import { User } from 'src/users/users.model';
import { AuthService } from 'src/auth/auth.service';
import { AuthModule } from 'src/auth/auth.module';

const mockedUser = {
  username: 'Test',
  email: 'Test@example.com',
  password: 'Test123456',
};

describe('Auth Service', () => {
  let app: INestApplication;
  let authService: AuthService;

  beforeEach(async () => {
    const testModule: TestingModule = await Test.createTestingModule({
      imports: [
        SequelizeModule.forRootAsync({
          imports: [ConfigModule],
          useClass: SequelizeConfigService,
        }),
        ConfigModule.forRoot({ load: [databaseConfig] }),
        AuthModule,
      ],
    }).compile();

    authService = testModule.get<AuthService>(AuthService);

    app = testModule.createNestApplication();
    await app.init();
  });

  beforeEach(async () => {
    const user = new User();

    const hashedPassword = await bcrypt.hash(mockedUser.password, 10);

    user.username = mockedUser.username;
    user.password = hashedPassword;
    user.email = mockedUser.email;

    return user.save();
  });

  afterEach(async () => {
    await User.destroy({ where: { username: mockedUser.username } });
  });

  it('should validate user', async () => {
    const user = await authService.validateUser(
      mockedUser.username,
      mockedUser.password,
    );

    console.log('user', user);

    expect(user.username).toBe(mockedUser.username);
    expect(user.email).toBe(mockedUser.email);
  });
});
