import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const logger: Logger = new Logger('Main');
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://192.168.43.169:30072/dev'],
        queue: 'analytics',
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
