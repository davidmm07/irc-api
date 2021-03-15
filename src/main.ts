import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { RedisIoAdapter } from './adapters/redis.adapter';
import { NestExpressApplication } from '@nestjs/platform-express';
import fetch from "node-fetch";
declare var global: any;
global.fetch = fetch;

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useWebSocketAdapter(new RedisIoAdapter(app));
  const port = parseInt(process.env.SERVER_PORT);
  await app.listen(port);
}

bootstrap();
