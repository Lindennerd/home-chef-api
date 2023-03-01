import { AggregateRoot } from '@nestjs/cqrs';
import { IEntity } from 'src/core/base/entity.interface';

export class User<TId> extends AggregateRoot implements IEntity<TId> {
  constructor(
    readonly id: TId,
    readonly name: string,
    readonly email: string,
    readonly phone: string,
    readonly host_rating: number,
    readonly guest_rating: number,
    readonly hosted_events: [TId],
    readonly attended_events: [TId],
    readonly address: TId,
  ) {
    super();
  }
}
