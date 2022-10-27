import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const logger: Logger = new Logger('Main');
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      logger:
        process.env.NODE_ENV === 'development'
          ? ['log', 'debug', 'error', 'verbose', 'warn']
          : ['log', 'error', 'warn'],
      transport: Transport.RMQ,
      options: {
        urls: [process.env.RABBITMQ_URL || 'amqp://192.168.43.169:30072'],
        queue: process.env.ANALYTICS_QUEUE || 'analytics',
        noAck: false,
        queueOptions: {
          durable: true,
        },
      },
    },
  );
  await app.listen().then(() => logger.log('Microservice is listening ...'));
}
bootstrap();
