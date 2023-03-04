import { Inject, Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { ClientProxy } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/sequelize';
import { AccountModel } from '../../../user/models/account.model';
import { DinnerAggregate } from '../dinner.aggregate';
import { DinnerModel } from '../models/dinner.model';

export class AttendenceRequested {
  constructor(
    public readonly dinner: DinnerAggregate,
    public readonly guest_id: string,
  ) {}
}

@EventsHandler(AttendenceRequested)
export class AttendenceRequestedHandler
  implements IEventHandler<AttendenceRequested>
{
  constructor(
    @InjectModel(DinnerModel) private readonly dinnerModel: typeof DinnerModel,
    @InjectModel(AccountModel)
    private readonly accountModel: typeof AccountModel,
    @Inject('DINNER_NOTIFICATION_SERVICE') private readonly client: ClientProxy,
  ) {}

  private logger = new Logger(AttendenceRequestedHandler.name);

  async handle(event: AttendenceRequested) {
    const { dinner, guest_id } = event;

    this.logger.debug(`event: ${JSON.stringify(event)}`);

    const guest = await this.accountModel.findOne({
      where: { id: guest_id },
      include: [AccountModel.associations.user],
    });

    this.client.emit('attendence_requested', {
      dinner: dinner.id,
      guest: guest.id,
    });
  }
}
