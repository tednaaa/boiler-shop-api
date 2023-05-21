import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { useContainer } from 'class-validator';
import * as passport from 'passport';
import * as session from 'express-session';

import { isProductionEnviroment } from '@/shared/lib/is-production-enviroment';

import { AppModule } from './app.module';

export const setup = (app: INestApplication): INestApplication => {
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
      disableErrorMessages: isProductionEnviroment(),
    }),
  );
  app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      store: new session.MemoryStore(),
      cookie: {
        httpOnly: true,
        signed: true,
        sameSite: 'strict',
        secure: isProductionEnviroment(),
      },
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());

  const config = new DocumentBuilder()
    .setTitle('Boiler Shop API')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  return app;
};
