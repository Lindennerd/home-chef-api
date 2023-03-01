import * as sequelize from 'sequelize';
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
  Dinner<string>,
  Omit<Dinner<string>, 'id'>
> {
  @Column({
    allowNull: false,
    primaryKey: true,
    type: 'uuid',
    defaultValue: sequelize.DataTypes.UUIDV4,
  })
  id: string;

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
  host_id: string;

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
    type: 'uuid',
    defaultValue: sequelize.DataTypes.UUIDV4,
  })
  id: string;

  @ForeignKey(() => DinnerModel)
  @Column({ allowNull: false })
  dinner_id: string;

  @ForeignKey(() => UserModel)
  @Column({ allowNull: false })
  user_id: string;

  @Column({ allowNull: false, defaultValue: false })
  confirmed_attendance: boolean;
}
