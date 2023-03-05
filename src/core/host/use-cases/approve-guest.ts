import { BadRequestException, Logger } from '@nestjs/common';
import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';
import { DinnerModel } from 'src/core/dinner/models/dinner.model';
import { HostApprovedAttendence } from 'src/core/dinner/use-cases/host-approved-attendence';
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
    private eventBus: EventBus,
    private sequelize: Sequelize,
    @InjectModel(DinnerGuestsModel)
    private dinnerGuests: typeof DinnerGuestsModel,
    @InjectModel(DinnerModel) private dinnerModel: typeof DinnerModel,
  ) {}

  private logger = new Logger(ApproveGuestCommand.name);

  async execute(command: ApproveGuestCommand): Promise<any> {
    const dinner = await this.dinnerModel.findByPk(command.dinner_id);

    if (dinner.host_id !== command.user_id) {
      throw new BadRequestException(
        `You can't confirm attendence to a guest in a dinner that you are not hosting`,
      );
    }

    try {
      await this.transactionRunner.runTransaction(async (t) => {
        await this.dinnerGuests.update(
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
    } catch (e) {
      this.logger.error(`Error while approving attendance`, e.stack, e);
      throw e;
    }

    this.eventBus.publish(new HostApprovedAttendence(command.dinner_id));
  }
}
