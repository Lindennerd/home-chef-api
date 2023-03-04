import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { SequelizeModule } from '@nestjs/sequelize';
import { Commands } from 'src/dinner/use-cases';
import { AuthModule } from '../auth/auth.module';
import { DinnerController } from './dinner.controller';
import { DinnerGuestsModel } from './models/dinner-guests.model';
import { DinnerLocationModel } from './models/dinner-location.model';
import { DinnerModel } from './models/dinner.model';

@Module({
  imports: [
    CqrsModule,
    AuthModule,
    SequelizeModule.forFeature([
      DinnerModel,
      DinnerGuestsModel,
      DinnerLocationModel,
    ]),
  ],
  providers: [...Commands],
  controllers: [DinnerController],
})
export class DinnerModule {}
