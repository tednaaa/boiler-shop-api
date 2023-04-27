import { INestApplication } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { TestingModule, Test } from '@nestjs/testing';
import * as bcrypt from 'bcrypt';
import * as request from 'supertest';
import * as session from 'express-session';
import * as passport from 'passport';

import { SequelizeConfigService } from 'src/config/sequelize-config.service';
import { databaseConfig } from 'src/config/configuration';
import { User } from 'src/users/users.model';
import { AuthModule } from 'src/auth/auth.module';

const mockedUser = {
  username: 'Test',
  email: 'Test@example.com',
  password: 'Test123456',
};

describe('Auth Controller', () => {
  let app: INestApplication;

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

    app = testModule.createNestApplication();

    app.use(
      session({
        secret: 'keyword',
        resave: false,
        saveUninitialized: false,
      }),
    );
    app.use(passport.initialize());
    app.use(passport.session());

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

  it('should login and return user', async () => {
    const response = await request(app.getHttpServer())
      .post('/users/login')
      .send({ username: mockedUser.username, password: mockedUser.password });

    expect(response.body.user.username).toBe(mockedUser.username);
    expect(response.body.user.email).toBe(mockedUser.email);
    expect(response.body.message).toBe('Logged In');
  });

  it('should set login session cookie and return user', async () => {
    const loginResponse = await request(app.getHttpServer())
      .post('/users/login')
      .send({ username: mockedUser.username, password: mockedUser.password });

    const checkResponse = await request(app.getHttpServer())
      .get('/users/login-check')
      .set('Cookie', loginResponse.headers['set-cookie']);

    expect(checkResponse.body.username).toBe(mockedUser.username);
    expect(checkResponse.body.email).toBe(mockedUser.email);
  });

  it('should logout user', async () => {
    const response = await request(app.getHttpServer()).get('/users/logout');

    expect(response.body.message).toBe('Session has ended');
  });
});
