import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AccountModel } from './models/account.model';
import { UserAddressModel } from './models/user-address.model';
import { UserModel } from './models/user.model';
import { Commands, Queries } from './use-cases';

@Module({
  imports: [
    SequelizeModule.forFeature([UserModel, UserAddressModel, AccountModel]),
  ],
  providers: [...Commands, ...Queries],
  exports: [SequelizeModule],
})
export class UserModule {}
