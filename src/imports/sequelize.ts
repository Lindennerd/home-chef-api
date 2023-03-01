import { ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { DinnerModel } from '../dinner/models/dinner.model';

export const Sequelize = SequelizeModule.forRootAsync({
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => ({
    dialect: 'sqlite',
    storage: configService.getOrThrow('DATABASE_CONNECTION'),
    synchronize: true,
    models: [DinnerModel],
  }),
});
