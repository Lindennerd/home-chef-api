import { BadRequestException, Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/sequelize';
import { DinnerLocationModel } from 'src/core/dinner/models/dinner-location.model';
import { TransactionRunner } from '../../../transaction/transaction-runner';
import { DinnerModel } from '../../dinner/models/dinner.model';

export class NewDinner {
  constructor(
    public readonly title: string,
    public readonly description: string,
    public readonly scheduled_for: Date,
    public duration_in_hours: number,
    public readonly max_guests: number,
    public readonly host_id: number,
    public readonly location: {
      street: string;
      number: string;
      neighborhood: string;
      city: string;
      state: string;
      zip: string;
      latitude: number;
      longitude: number;
      address_complement?: string;
    },
  ) {}
}

@CommandHandler(NewDinner)
export class NewDinnerHandler implements ICommandHandler<NewDinner> {
  constructor(
    private transaction: TransactionRunner,
    @InjectModel(DinnerModel) private dinnerModel: typeof DinnerModel,
    @InjectModel(DinnerLocationModel)
    private dinnerLocationModel: typeof DinnerLocationModel,
  ) {}

  private logger = new Logger(NewDinner.name);

  async execute(command: NewDinner) {
    this.logger.debug(
      `Creating a dinner ${command.title} for the host ${command.host_id}`,
    );

    if (command.scheduled_for < new Date()) {
      throw new BadRequestException('Schedule date must be in the future');
    }

    if (command.duration_in_hours < 1) {
      throw new BadRequestException('Duration must be at least 1 hour');
    }

    const dinnersForTheSameHost = await this.dinnerModel.count({
      where: {
        host_id: command.host_id,
        scheduled_for: command.scheduled_for,
      },
    });

    if (dinnersForTheSameHost > 0) {
      throw new BadRequestException(
        'You already have a dinner scheduled for this date',
      );
    }

    try {
      await this.transaction.runTransaction(async (transaction) => {
        const location = await this.dinnerLocationModel.create(
          { ...command.location },
          { transaction },
        );
        await this.dinnerModel.create(
          {
            ...command,
            location_id: location.id,
            host_id: command.host_id,
          },
          { transaction },
        );
      });
    } catch (error) {
      this.logger.error(
        `Error while trying to create a dinner ${command.title}`,
        error,
      );
      throw error;
    }
  }
}
