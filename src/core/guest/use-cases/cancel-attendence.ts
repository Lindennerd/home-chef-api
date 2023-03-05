import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/sequelize';
import { TransactionRunner } from '../../../transaction/transaction-runner';
import { DinnerGuestsModel } from '../../dinner/models/dinner-guests.model';
export class CancelAttendenceCommand {
  constructor(public dinner_id: number, public user_id: number) {}
}

@CommandHandler(CancelAttendenceCommand)
export class CancelAttendenceCommandHandler
  implements ICommandHandler<CancelAttendenceCommand>
{
  constructor(
    private transactionRunner: TransactionRunner,
    @InjectModel(DinnerGuestsModel)
    private dinnerGuestModel: typeof DinnerGuestsModel,
  ) {}

  execute(command: CancelAttendenceCommand): Promise<any> {
    return this.transactionRunner.runTransaction(async (t) => {
      this.dinnerGuestModel.destroy({
        where: { dinner_id: command.dinner_id, user_id: command.user_id },
      });
    });
  }
}
