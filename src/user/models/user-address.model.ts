import { Column, Model, Table } from 'sequelize-typescript';
import { Address } from '../../core/domain/common/address';

@Table({ tableName: 'user_address', timestamps: true })
export class UserAddressModel extends Model<
  Address<number>,
  Omit<Address<number>, 'id'>
> {
  @Column({
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    autoIncrementIdentity: true,
  })
  id: number;

  @Column({ allowNull: false })
  street: string;

  @Column({ allowNull: false })
  neighborhood: string;

  @Column({ allowNull: false })
  city: string;

  @Column({ allowNull: false })
  state: string;

  @Column({ allowNull: false })
  zip: string;

  @Column({ allowNull: false })
  country: string;

  @Column({ allowNull: false })
  latitude: number;

  @Column({ allowNull: false })
  longitude: number;

  @Column({ allowNull: true })
  address_complement: string;
}
