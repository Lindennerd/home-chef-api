import { Inject } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { ClientProxy } from '@nestjs/microservices';
export class AttendeceCancelled {
  constructor(public dinner_id: number, public guest_id: number) {}
}

@EventsHandler(AttendeceCancelled)
export class AttendenceCancelledHandler
  implements IEventHandler<AttendeceCancelled>
{
  constructor(
    @Inject('DINNER_NOTIFICATION_SERVICE') private readonly client: ClientProxy,
  ) {}

  async handle(event: AttendeceCancelled) {
    this.client.emit('attendence-canceled-by-guest', {
      canceled_at: new Date(),
      dinner_id: event.dinner_id,
      guest_id: event.guest_id,
    });
  }
}
