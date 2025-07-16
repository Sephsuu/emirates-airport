import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { logger: ['error', 'warn', 'log', 'debug'] });
  const port = process.env.PORT || 3001; 
  await app.listen(port);
}
bootstrap();
