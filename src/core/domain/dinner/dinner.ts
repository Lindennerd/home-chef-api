import { AggregateRoot } from '@nestjs/cqrs';
import { IEntity } from 'src/core/base/entity.interface';

export enum DinnerStatus {
  CONFIRMED = 'CONFIRMED',
  CANCELLED = 'CANCELLED',
  PENDING = 'PENDING',
}

export class Dinner<TId> extends AggregateRoot implements IEntity<TId> {
  constructor(
    readonly id: TId,
    protected scheduled_at: Date,
    protected duration_in_hours: number,
    protected status: DinnerStatus,
    protected max_guests: number,
    protected rating: number,
    protected location_id: TId,
  ) {
    super();
  }

  public confirm() {
    this.status = DinnerStatus.CONFIRMED;
  }
}
