import { classes } from '@automapper/classes';
import { AutomapperModule } from '@automapper/nestjs';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { DinnerModule } from './dinner/dinner.module';
import { Sequelize } from './imports/sequelize';
import { TransactionModule } from './transaction/transaction.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AutomapperModule.forRoot({
      strategyInitializer: classes(),
    }),
    Sequelize,
    DinnerModule,
    UserModule,
    AuthModule,
    TransactionModule,
  ],
  controllers: [AppController],
  exports: [],
})
export class AppModule {}
