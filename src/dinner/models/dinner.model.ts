import {
  BelongsTo,
  BelongsToMany,
  Column,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Dinner } from 'src/core/domain';
import { UserModel } from 'src/user/models/user.model';
import { DinnerStatus } from '../../core/domain/dinner/dinner';
import { DinnerGuestsModel } from './dinner-guests.model';
import { DinnerLocationModel } from './dinner-location.model';

@Table({ tableName: 'dinner', timestamps: true })
export class DinnerModel extends Model<
  Dinner<number>,
  Omit<Dinner<number>, 'id'>
> {
  @Column({
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    autoIncrementIdentity: true,
  })
  id: number;

  @Column({ allowNull: false })
  description: string;

  @Column({ allowNull: false })
  scheduled_for: Date;

  @Column({ allowNull: false })
  duration_in_hours: number;

  @Column({ allowNull: false, values: Object.values(DinnerStatus) })
  status: string;

  @Column({ allowNull: false })
  max_guests: number;

  @Column({ allowNull: false })
  rating: number;

  @Column({ allowNull: false })
  title: string;

  @ForeignKey(() => UserModel)
  @Column({ allowNull: false })
  host_id: number;

  @BelongsTo(() => UserModel)
  host: UserModel;

  @ForeignKey(() => DinnerLocationModel)
  @Column({ allowNull: false })
  location_id: number;

  @BelongsTo(() => DinnerLocationModel)
  location: DinnerLocationModel;

  @BelongsToMany(() => UserModel, () => DinnerGuestsModel)
  guests: UserModel[];
}
