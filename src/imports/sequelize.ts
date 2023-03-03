import { ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';

export const Sequelize = SequelizeModule.forRootAsync({
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => ({
    dialect: 'mysql',
    dialectOptions: {
      ssl: {
        rejectUnauthorized: false,
      },
    },
    define: {
      timestamps: false,
    },
    host: configService.getOrThrow('DATABASE_HOST'),
    username: configService.getOrThrow('DATABASE_USERNAME'),
    password: configService.getOrThrow('DATABASE_PWD'),
    database: configService.getOrThrow('DATABASE_DBNAME'),
    synchronize: process.env.NODE_ENV === 'development' ? true : false,
    autoLoadModels: true,
  }),
});
