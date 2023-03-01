import { IEntity } from 'src/core/base/entity.interface';

export abstract class Address<TId> implements IEntity<TId> {
  constructor(
    readonly id: TId,
    readonly name: string,
    readonly address: string,
    readonly neighborhood: string,
    readonly city: string,
    readonly state: string,
    readonly zip: string,
    readonly country: string,
    readonly latitude: number,
    readonly longitude: number,
    readonly address_complement?: string,
  ) {}
}
