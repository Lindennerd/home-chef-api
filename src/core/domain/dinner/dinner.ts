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
    readonly scheduled_at: Date,
    readonly duration_in_hours: number,
    readonly status: DinnerStatus,
    readonly max_guests: number,
    readonly rating: number,
    readonly location_id: TId,
  ) {
    super();
  }
}
