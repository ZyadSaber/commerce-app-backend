import { NestFactory } from '@nestjs/core';
import * as cors from 'cors';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cors());
  await app.listen(8080);
  console.log(`server is up and running at port 8080`);
}
bootstrap();
