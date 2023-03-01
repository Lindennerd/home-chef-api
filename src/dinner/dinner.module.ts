import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { DinnerModel } from './models/dinner.model';

@Module({
  imports: [SequelizeModule.forFeature([DinnerModel])],
})
export class DinnerModule {}
