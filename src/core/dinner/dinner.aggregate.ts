import { AggregateRoot } from '@nestjs/cqrs';
import { AttendenceUpdated } from './use-cases/attendence-updated';
export class DinnerAggregate extends AggregateRoot {
  constructor(
    public readonly id: string,
    public readonly title: string,
    public readonly description: string,
    public readonly scheduled_for: Date,
    public readonly duration_in_hours: number,
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
  ) {
    super();
  }

  public async attendanceUpdated(guest_id: string) {
    this.apply(new AttendenceUpdated(this.id, guest_id));
  }
}
