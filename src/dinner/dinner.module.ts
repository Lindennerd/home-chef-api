import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { DinnerGuestsModel, DinnerModel } from './models/dinner.model';

@Module({
  imports: [SequelizeModule.forFeature([DinnerModel, DinnerGuestsModel])],
})
export class DinnerModule {}
