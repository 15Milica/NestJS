import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser())
  app.enableCors({
    credentials:true,
    origin:"http://loacalhost"
  })  
  await app.listen(3000);
}
bootstrap();
