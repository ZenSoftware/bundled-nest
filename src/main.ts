import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // For Docker containerization
  const PORT = process.env.PORT || 3000;
  await app.listen(PORT);

  console.log(`Server is running at http://localhost:${PORT}`);
}
bootstrap();
