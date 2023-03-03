import { Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/sequelize';
import * as bcrypt from 'bcrypt';
import { TransactionRunner } from 'src/transaction/transaction-runner';
import { AccountModel } from 'src/user/models/account.model';
import { UserAddressModel } from 'src/user/models/user-address.model';
import { UserModel } from 'src/user/models/user.model';

export class CreateUserCommand {
  constructor(
    readonly name: string,
    readonly email: string,
    readonly phone: string,
    readonly username: string,
    readonly password: string,
    readonly address: Partial<UserAddressModel>,
  ) {}
}

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(
    private readonly transaction: TransactionRunner,
    @InjectModel(UserModel) private readonly userModel: typeof UserModel,
    @InjectModel(UserAddressModel)
    private readonly userAddressModel: typeof UserAddressModel,
    @InjectModel(AccountModel)
    private readonly accountModel: typeof AccountModel,
  ) {}

  private logger = new Logger(CreateUserHandler.name);

  async execute(command: CreateUserCommand): Promise<UserModel> {
    try {
      await this.transaction.runTransaction(async (transaction) => {
        const address = await this.userAddressModel.create(
          {
            ...command.address,
          },
          { transaction },
        );

        const user = await this.userModel.create(
          {
            name: command.name,
            email: command.email,
            phone: command.phone,
            address_id: address.id,
          },
          { transaction },
        );

        await this.accountModel.create(
          {
            username: command.username,
            password: bcrypt.hashSync(command.password, 10),
            user_id: user.id,
          },
          { transaction },
        );
      });
      return null;
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}
