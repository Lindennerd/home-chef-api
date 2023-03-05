import { Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/sequelize';
import { DinnerModel, DinnerStatus } from 'src/core/dinner/models/dinner.model';
import { TransactionRunner } from 'src/transaction/transaction-runner';

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
  ) {}

  private logger = new Logger(AlterDinnerStatusCommandHandler.name);

  async execute(command: AlterDinnerStatusCommand): Promise<any> {
    try {
      return await this.transactionRunner.runTransaction(async (t) => {
        await this.dinnerModel.update(
          { status: command.status },
          {
            where: { id: command.dinner_id, host_id: command.user_id },
            transaction: t,
          },
        );
      });
    } catch (e) {
      this.logger.error(
        `Error while trying to alter the dinner status for dinner ${command.dinner_id}`,
        e,
      );
      throw e;
    }
  }
}
