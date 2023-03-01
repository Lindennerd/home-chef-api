import * as sequelize from 'sequelize';
import {
  BelongsToMany,
  Column,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from 'src/core/domain/user/user';
import {
  DinnerGuestsModel,
  DinnerModel,
} from '../../dinner/models/dinner.model';

@Table({ tableName: 'user', timestamps: true })
export class UserModel extends Model<User<string>, Omit<User<string>, 'id'>> {
  @Column({
    allowNull: false,
    primaryKey: true,
    type: 'uuid',
    defaultValue: sequelize.DataTypes.UUIDV4,
  })
  id: string;

  @Column({ allowNull: false })
  name: string;

  @Column({ allowNull: false })
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
}
