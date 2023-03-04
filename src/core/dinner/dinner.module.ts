import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { SequelizeModule } from '@nestjs/sequelize';
import { Commands } from 'src/core/dinner/use-cases';
import { AuthModule } from '../../auth/auth.module';
import { UserModule } from '../../user/user.module';
import { DinnerController } from './dinner.controller';
import { DinnerMappingProfile } from './map/dinner.mappings';
import { DinnerGuestsModel } from './models/dinner-guests.model';
import { DinnerLocationModel } from './models/dinner-location.model';
import { DinnerNotificationsModel } from './models/dinner-notifications.model';
import { DinnerModel } from './models/dinner.model';

@Module({
  imports: [
    CqrsModule,
    AuthModule,
    UserModule,
    ClientsModule.registerAsync([
      {
        name: 'DINNER_NOTIFICATION_SERVICE',
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => ({
          transport: Transport.RMQ,
          urls: [configService.getOrThrow('RABBITMQ_HOST')],
          options: {
            queue: 'dinner_notifications',
            queueOptions: {
              durable: true,
            },
          },
        }),
      },
    ]),
    SequelizeModule.forFeature([
      DinnerModel,
      DinnerGuestsModel,
      DinnerLocationModel,
      DinnerNotificationsModel,
    ]),
  ],
  providers: [...Commands, DinnerMappingProfile],
  controllers: [DinnerController],
})
export class DinnerModule {}
