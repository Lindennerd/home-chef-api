import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

export class AttendenceUpdated {
  constructor(
    public readonly dinner_id: string,
    public readonly guest_id: string,
  ) {}
}

@EventsHandler(AttendenceUpdated)
export class AttendenceUpdatedHandler
  implements IEventHandler<AttendenceUpdated>
{
  constructor() {}

  async handle(event: AttendenceUpdated) {
    console.log('AttendenceUpdatedHandler', event);
  }
}
