import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as session from 'express-session';
import * as passport from 'passport';

import { AppModule } from './app.module';

async function bootstrap() {
  const PORT = 3000;

  const app = await NestFactory.create(AppModule);

  app.use(
    session({
      secret: 'keyword',
      resave: false,
      saveUninitialized: false,
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

  await app.listen(PORT);
}
bootstrap();
