import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { DinnerGuestsModel } from './models/dinner-guests.model';
import { DinnerLocationModel } from './models/dinner-location.model';
import { DinnerModel } from './models/dinner.model';

@Module({
  imports: [
    SequelizeModule.forFeature([
      DinnerModel,
      DinnerGuestsModel,
      DinnerLocationModel,
    ]),
  ],
})
export class DinnerModule {}
