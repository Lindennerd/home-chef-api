import { AggregateRoot } from '@nestjs/cqrs';
import { IEntity } from 'src/core/base/entity.interface';
import {
  EvaluateDinner,
  EvaluateDinnerGuest,
  EvaluateDinnerHost,
  UserAttendedToADinnerEvent,
  UserCancelledAttendenceToADinnerEvent,
  UserConfirmedAttendenceToADinnerEvent,
} from './events/user.events';

export class User<TId> extends AggregateRoot implements IEntity<TId> {
  constructor(
    readonly id: TId,
    protected name: string,
    protected email: string,
    protected phone: string,
    protected host_rating: number,
    protected host_rating_count: number,
    protected guest_rating: number,
    protected guest_rating_count: number,
    protected hosted_events: [TId],
    protected attended_events: [TId],
    protected address: TId,
  ) {
    super();
  }

  public attendToADinner(eventId: TId) {
    this.apply(new UserAttendedToADinnerEvent(this.id, eventId));
  }

  public evaluateDinnerHost(eventId: TId, rating: number) {
    this.apply(new EvaluateDinnerHost(this.id, eventId, rating));
  }

  public evaluateDinnerGuest(eventId: TId, guest: TId, rating: number) {
    this.apply(new EvaluateDinnerGuest(this.id, eventId, guest, rating));
  }

  public evaluateDinner(eventId: TId, rating: number) {
    this.apply(new EvaluateDinner(eventId, rating));
  }

  public confirmAttendenceToADinnerEvent(eventId: TId) {
    this.apply(new UserConfirmedAttendenceToADinnerEvent(this.id, eventId));
  }

  public cancelAttendenceToADinnerEvent(eventId: TId) {
    this.apply(new UserCancelledAttendenceToADinnerEvent(this.id, eventId));
  }
}
