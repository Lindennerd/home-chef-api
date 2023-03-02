import {
  BelongsToMany,
  Column,
  HasMany,
  HasOne,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from 'src/core/domain/user/user';
import { AccountModel } from '../../auth/models/auth.model';
import {
  DinnerGuestsModel,
  DinnerModel,
} from '../../dinner/models/dinner.model';

@Table({ tableName: 'user', timestamps: true })
export class UserModel extends Model<User<number>, Omit<User<number>, 'id'>> {
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
}
