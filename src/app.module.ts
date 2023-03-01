import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Sequelize } from './imports/sequelize';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), Sequelize],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
