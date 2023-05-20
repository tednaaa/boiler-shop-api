import { NestFactory } from '@nestjs/core';

import { setup } from './setup';
import { AppModule } from './app.module';

async function bootstrap() {
  const PORT = 8080;

  const app = await NestFactory.create(AppModule);

  setup(app);

  await app.listen(PORT);
}
bootstrap();
