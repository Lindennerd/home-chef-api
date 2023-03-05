import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { SequelizeModule } from '@nestjs/sequelize';
import { Commands } from 'src/core/dinner/use-cases';
import { AuthModule } from '../../auth/auth.module';
import { UserModule } from '../../user/user.module';
import { DinnerNotificationsProvider } from './dinner-notifications.provider';
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
    SequelizeModule.forFeature([
      DinnerModel,
      DinnerGuestsModel,
      DinnerLocationModel,
      DinnerNotificationsModel,
    ]),
  ],
  providers: [...Commands, DinnerMappingProfile, DinnerNotificationsProvider],
  controllers: [DinnerController],
  exports: [SequelizeModule, DinnerMappingProfile],
})
export class DinnerModule {}
