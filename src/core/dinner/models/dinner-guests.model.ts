import { Column, ForeignKey, Model, Table } from 'sequelize-typescript';
import { UserModel } from 'src/user/models/user.model';
import { DinnerModel } from './dinner.model';

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
