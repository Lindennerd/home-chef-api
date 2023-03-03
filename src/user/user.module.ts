import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AccountModel } from './models/account.model';
import { UserAddressModel } from './models/user-address.model';
import { UserModel } from './models/user.model';
import { CreateUserHandler } from './use-cases/register-user/create-user';

@Module({
  imports: [
    SequelizeModule.forFeature([UserModel, UserAddressModel, AccountModel]),
  ],
  providers: [CreateUserHandler],
  exports: [SequelizeModule],
})
export class UserModule {}
