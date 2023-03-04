import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { BadRequestException, Logger } from '@nestjs/common';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/sequelize';
import { TransactionRunner } from '../../../transaction/transaction-runner';
import { DinnerAggregate } from '../../dinner/dinner.aggregate';
import { DinnerGuestsModel } from '../../dinner/models/dinner-guests.model';
import { DinnerModel } from '../../dinner/models/dinner.model';

export class AttendToDinnerCommand {
  constructor(public readonly dinner_id: number, public readonly guest_id) {}
}

@CommandHandler(AttendToDinnerCommand)
export class AttendToDinnerHandler
  implements ICommandHandler<AttendToDinnerCommand>
{
  constructor(
    private readonly transaction: TransactionRunner,
    private readonly eventPublisher: EventPublisher,
    @InjectMapper() private readonly mapper: Mapper,
    @InjectModel(DinnerModel) private readonly dinnerModel: typeof DinnerModel,
    @InjectModel(DinnerGuestsModel)
    private readonly dinnerGuestsModel: typeof DinnerGuestsModel,
  ) {}

  private logger = new Logger(AttendToDinnerHandler.name);

  async execute(command: AttendToDinnerCommand) {
    console.debug('AttendToDinnerCommand', command);

    const dinner = await this.dinnerModel.findOne({
      where: {
        id: command.dinner_id,
      },
      include: [DinnerModel.associations.guests],
    });

    if (!dinner) {
      throw new BadRequestException('Dinner not found');
    }

    if (dinner.guests.length >= dinner.max_guests) {
      throw new BadRequestException('Dinner is full');
    }

    if (dinner.guests.find((guest) => guest.id === command.guest_id)) {
      throw new BadRequestException('You are already attending to this dinner');
    }

    if (dinner.host_id === command.guest_id) {
      throw new BadRequestException('You are the host of this dinner');
    }

    dinner.guests.push(command.guest_id);

    await this.transaction.runTransaction(async (transaction) => {
      await this.dinnerGuestsModel.create(
        {
          dinner_id: dinner.id,
          user_id: command.guest_id,
        },
        { transaction },
      );
    });

    const dinnerEvent = this.eventPublisher.mergeObjectContext(
      this.mapper.map(dinner, DinnerModel, DinnerAggregate),
    );

    dinnerEvent.attendanceUpdated(command.guest_id);
    dinnerEvent.commit();
  }
}
