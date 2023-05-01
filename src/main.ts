import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { setup } from './setup';

async function bootstrap() {
  const PORT = 8080;

  const app = await NestFactory.create(AppModule);

  setup(app);

  await app.listen(PORT);
}
bootstrap();
