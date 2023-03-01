import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Sequelize } from './imports/sequelize';
import { CoreModule } from './core/core.module';
import { DinnerModule } from './dinner/dinner.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), Sequelize, CoreModule, DinnerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
