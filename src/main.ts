import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.TCP,
    options: { host: '127.0.0.1', port: 3003 }, // Auth-service runs on port 3001
    logger: ['log', 'error', 'warn', 'debug', 'verbose'], // ✅ Enable all log levels
  });

  console.log('Auth Microservice is running on port 3003');
  await app.listen();
}
bootstrap();
