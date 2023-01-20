import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientProxyFactory, RmqOptions } from '@nestjs/microservices';
import configuration from './config/configuration';
import { MongooseModule } from '@nestjs/mongoose';
import { InteractionsModule } from './interactions/interactions.module';
import { MessagesModule } from './messages/messages.module';
import { MessagesController } from './messages/messages.controller';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [configuration] }),
    MongooseModule.forRoot('mongodb://192.168.43.169:30017/bt'),
    InteractionsModule,
    MessagesModule,
  ],
  providers: [
    {
      provide: 'RMQ_SERVICE',
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const rmqSvcOptions: RmqOptions = configService.get('rmq');
        return ClientProxyFactory.create(rmqSvcOptions);
      },
    },
  ],
})
export class AppModule {}
