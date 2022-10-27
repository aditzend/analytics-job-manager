import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientProxyFactory, RmqOptions } from '@nestjs/microservices';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import configuration from './config/configuration';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true, load: [configuration] })],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'ANALYTICS_SERVICE',
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const analyticsSvcOptions: RmqOptions =
          configService.get('analyticsService');
        return ClientProxyFactory.create(analyticsSvcOptions);
      },
    },
  ],
})
export class AppModule {}
