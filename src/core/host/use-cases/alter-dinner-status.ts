import { Logger } from '@nestjs/common';
import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/sequelize';
import { DinnerModel, DinnerStatus } from 'src/core/dinner/models/dinner.model';
import { TransactionRunner } from 'src/transaction/transaction-runner';
import { DinnerStatusUpdated } from '../../dinner/use-cases/dinner-status-updated';

export class AlterDinnerStatusCommand {
  constructor(
    public readonly dinner_id: number,
    public readonly user_id: number,
    public readonly status: DinnerStatus,
  ) {}
}

@CommandHandler(AlterDinnerStatusCommand)
export class AlterDinnerStatusCommandHandler
  implements ICommandHandler<AlterDinnerStatusCommand>
{
  constructor(
    @InjectModel(DinnerModel) private dinnerModel: typeof DinnerModel,
    private readonly transactionRunner: TransactionRunner,
    private readonly eventBus: EventBus,
  ) {}

  private logger = new Logger(AlterDinnerStatusCommandHandler.name);

  async execute(command: AlterDinnerStatusCommand): Promise<any> {
    try {
      const result = await this.transactionRunner.runTransaction(async (t) => {
        return await this.dinnerModel.update(
          { status: command.status },
          {
            where: { id: command.dinner_id, host_id: command.user_id },
            transaction: t,
          },
        );
      });
      this.eventBus.publish(
        new DinnerStatusUpdated(command.dinner_id, command.status),
      );

      return result;
    } catch (e) {
      this.logger.error(
        `Error while trying to alter the dinner status for dinner ${command.dinner_id}`,
        e,
      );
      throw e;
    }
  }
}
