import { IEntity } from 'src/core/base/entity.interface';

export abstract class Address<TId> implements IEntity<TId> {
  constructor(
    readonly id: TId,
    protected name: string,
    protected address: string,
    protected neighborhood: string,
    protected city: string,
    protected state: string,
    protected zip: string,
    protected country: string,
    protected latitude: number,
    protected longitude: number,
    protected address_complement?: string,
  ) {}
}
