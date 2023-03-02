import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserProfile } from './mappings/user.profile';
import { UserModel } from './models/user.model';

@Module({
  imports: [SequelizeModule.forFeature([UserModel])],
  providers: [UserProfile],
  exports: [SequelizeModule],
})
export class UserModule {}
