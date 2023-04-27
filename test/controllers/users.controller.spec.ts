import { INestApplication } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { TestingModule, Test } from '@nestjs/testing';
import * as request from 'supertest';

import { SequelizeConfigService } from 'src/config/sequelize-config.service';
import { databaseConfig } from 'src/config/configuration';
import { UsersModule } from 'src/users/users.module';
import { User } from 'src/users/users.model';

const mockedUser = {
  username: 'Test',
  email: 'Test@example.com',
  password: 'Test123456',
};

describe('Users Controller', () => {
  let app: INestApplication;

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

    app = testModule.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await User.destroy({ where: { username: mockedUser.username } });
  });

  it('should create and return user', async () => {
    const response = await request(app.getHttpServer())
      .post('/users/signup')
      .send(mockedUser);

    expect(response.body.username).toBe(mockedUser.username);
    expect(response.body.email).toBe(mockedUser.email);
  });
});
