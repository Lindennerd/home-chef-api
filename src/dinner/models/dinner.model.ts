import {
  BelongsTo,
  BelongsToMany,
  Column,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { UserModel } from 'src/user/models/user.model';
import { DinnerGuestsModel } from './dinner-guests.model';
import { DinnerLocationModel } from './dinner-location.model';

export enum DinnerStatus {
  PENDING = 'PENDING',
  CANCELED = 'CANCELED',
  FINISHED = 'FINISHED',
  CONFIRMED = 'CONFIRMED',
}

@Table({ tableName: 'dinner', timestamps: true })
export class DinnerModel extends Model {
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

  @Column({
    allowNull: false,
    values: Object.values(DinnerStatus),
    defaultValue: DinnerStatus.PENDING,
  })
  status: string;

  @Column({ allowNull: false })
  max_guests: number;

  @Column({ allowNull: false, defaultValue: 0 })
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
