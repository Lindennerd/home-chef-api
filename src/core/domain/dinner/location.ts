import { Address } from '../common/address';

export class Location<TId> extends Address<TId> {
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
  ) {
    super(
      id,
      name,
      address,
      neighborhood,
      city,
      state,
      zip,
      country,
      latitude,
      longitude,
      address_complement,
    );
  }
}
