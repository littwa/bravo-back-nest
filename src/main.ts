import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  app.use((req, res, next) => { console.log(req.rawHeaders); next() })
  await app.listen(process.env.PORT || 3000);

}
bootstrap();
