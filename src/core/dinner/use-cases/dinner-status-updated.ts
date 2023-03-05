import { Inject, Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { ClientProxy } from '@nestjs/microservices';
import { DinnerStatus } from '../models/dinner.model';

export class DinnerStatusUpdated {
  constructor(public dinner_id: number, public status: DinnerStatus) {}
}

@EventsHandler(DinnerStatusUpdated)
export class DinnerStatusUpdatedHandler
  implements IEventHandler<DinnerStatusUpdated>
{
  constructor(
    @Inject('DINNER_NOTIFICATION_SERVICE') private readonly client: ClientProxy,
  ) {}

  private logger = new Logger(DinnerStatusUpdatedHandler.name);

  handle(event: DinnerStatusUpdated) {
    this.logger.debug(
      `Dinner ${event.dinner_id} Status Updated to ${event.status}`,
    );
    this.client.emit('dinner-status-updated', {
      ...event,
      updated_at: new Date(),
    });
  }
}
