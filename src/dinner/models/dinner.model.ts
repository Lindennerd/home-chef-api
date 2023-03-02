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
  location_id: string;

  @Column({ allowNull: false })
  title: string;

  @ForeignKey(() => UserModel)
  @Column({ allowNull: false })
  host_id: number;

  @BelongsTo(() => UserModel)
  host: UserModel;

  @BelongsToMany(() => UserModel, () => DinnerGuestsModel)
  guests: UserModel[];
}

@Table({ tableName: 'dinner_guests', timestamps: true })
export class DinnerGuestsModel extends Model {
  @Column({
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    autoIncrementIdentity: true,
  })
  id: number;

  @ForeignKey(() => DinnerModel)
  @Column({ allowNull: false })
  dinner_id: number;

  @ForeignKey(() => UserModel)
  @Column({ allowNull: false })
  user_id: number;

  @Column({ allowNull: false, defaultValue: false })
  confirmed_attendance: boolean;
}
