import { AggregateRoot } from '@nestjs/cqrs';
import { IEntity } from 'src/core/base/entity.interface';
import {
  DinnerCancelled,
  DinnerConfirmed,
  DinnerReScheduled,
} from './events/dinner.events';

export enum DinnerStatus {
  CONFIRMED = 'CONFIRMED',
  CANCELLED = 'CANCELLED',
  PENDING = 'PENDING',
}

export class Dinner<TId> extends AggregateRoot implements IEntity<TId> {
  constructor(
    readonly id: TId,
    protected title: string,
    protected description: string,
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
    this.apply(
      new DinnerConfirmed<TId>(this.id, this.location_id, this.scheduled_at),
    );
  }

  public cancel() {
    if (this.diffMinutes() < 60) {
      throw new Error(
        'Dinner cannot be cancelled less than 60 minutes before the scheduled time',
      );
    }

    this.apply(new DinnerCancelled<TId>(this.id));
  }

  public reSchedule(scheduled_at: Date) {
    if (this.diffMinutes() < 60) {
      throw new Error(
        'Dinner cannot be rescheduled less than 60 minutes before the scheduled time',
      );
    }
    this.apply(new DinnerReScheduled<TId>(this.id, scheduled_at));
  }

  private diffMinutes(): number {
    const diff = this.scheduled_at.getTime() - new Date().getTime();
    return Math.round(((diff % 86400000) % 3600000) / 60000);
  }
}
