import { BadRequestException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/sequelize';
import { DinnerModel } from 'src/core/dinner/models/dinner.model';
import { TransactionRunner } from '../../../transaction/transaction-runner';
import { DinnerGuestsModel } from '../../dinner/models/dinner-guests.model';
export class ApproveGuestCommand {
  constructor(
    public guest_id: number,
    public dinner_id: number,
    public user_id: number,
  ) {}
}

@CommandHandler(ApproveGuestCommand)
export class ApproveGuestCommandHandler
  implements ICommandHandler<ApproveGuestCommand>
{
  constructor(
    private transactionRunner: TransactionRunner,
    @InjectModel(DinnerGuestsModel)
    private dinnerGuests: typeof DinnerGuestsModel,
    @InjectModel(DinnerModel) private dinnerModel: typeof DinnerModel,
  ) {}

  async execute(command: ApproveGuestCommand): Promise<any> {
    const dinner = await this.dinnerModel.findByPk(command.dinner_id);

    if (dinner.host_id !== command.user_id) {
      throw new BadRequestException(
        `You can't confirm attendence to a guest in a dinner that you are not hosting`,
      );
    }

    return this.transactionRunner.runTransaction(async (t) => {
      this.dinnerGuests.update(
        {
          confirmed_attendance: true,
        },
        {
          where: {
            user_id: command.guest_id,
            dinner_id: command.guest_id,
          },
          transaction: t,
        },
      );
    });
  }
}
