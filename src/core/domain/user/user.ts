import { AggregateRoot } from '@nestjs/cqrs';
import { IEntity } from 'src/core/base/entity.interface';

export class User<TId> extends AggregateRoot implements IEntity<TId> {
  constructor(
    readonly id: TId,
    protected name: string,
    protected email: string,
    protected phone: string,
    protected host_rating: number,
    protected guest_rating: number,
    protected hosted_events: [TId],
    protected attended_events: [TId],
    protected address: TId,
  ) {
    super();
  }
}
