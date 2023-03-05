import { Inject } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { ClientProxy } from '@nestjs/microservices';
export class HostApprovedAttendence {
  constructor(public dinner_id: number) {}
}

@EventsHandler(HostApprovedAttendence)
export class HostApprovedAttendenceHandler
  implements IEventHandler<HostApprovedAttendence>
{
  constructor(
    @Inject('DINNER_NOTIFICATION_SERVICE') private readonly client: ClientProxy,
  ) {}

  async handle(event: HostApprovedAttendence) {
    console.log('------------------ approved');

    this.client.emit('attendence-confirmed-by-host', {
      confirmed_at: new Date(),
      dinner_id: event.dinner_id,
    });
  }
}
