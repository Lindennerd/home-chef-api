import {
  BelongsTo,
  BelongsToMany,
  Column,
  ForeignKey,
  HasMany,
  HasOne,
  Model,
  Table,
} from 'sequelize-typescript';
import { DinnerGuestsModel } from 'src/core/dinner/models/dinner-guests.model';
import { AccountModel } from 'src/user/models/account.model';
import { DinnerModel } from '../../core/dinner/models/dinner.model';
import { UserAddressModel } from './user-address.model';

@Table({ tableName: 'user', timestamps: true })
export class UserModel extends Model {
  @Column({
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    autoIncrementIdentity: true,
  })
  id: number;

  @Column({ allowNull: false })
  name: string;

  @Column({ allowNull: false, unique: true })
  email: string;

  @Column({ allowNull: false })
  phone: string;

  @Column({ allowNull: false, defaultValue: 0 })
  host_rating: number;

  @Column({ allowNull: false, defaultValue: 0 })
  host_rating_count: number;

  @Column({ allowNull: false, defaultValue: 0 })
  guest_rating: number;

  @Column({ allowNull: false, defaultValue: 0 })
  guest_rating_count: number;

  @HasMany(() => DinnerModel)
  hosted_events: DinnerModel[];

  @BelongsToMany(() => DinnerModel, () => DinnerGuestsModel)
  attended_events: DinnerModel[];

  @HasOne(() => AccountModel)
  account: AccountModel;

  @ForeignKey(() => UserAddressModel)
  @Column({ allowNull: false })
  address_id: number;

  @BelongsTo(() => UserAddressModel)
  address: UserAddressModel;
}
