import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const PORT_SERVER = 8889
  const app = await NestFactory.create(AppModule);
  console.log(`============ Started server at port ${PORT_SERVER} ============`)
  await app.listen(PORT_SERVER);
}
bootstrap();
