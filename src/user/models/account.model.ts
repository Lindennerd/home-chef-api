import {
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { UserModel } from 'src/user/models/user.model';

export interface IAccount {
  id: string;
  username: string;
  password: string;
  user_id: number;
}

@Table({ tableName: 'account', timestamps: true })
export class AccountModel extends Model<
  IAccount,
  Omit<IAccount, 'id' & 'user_id'>
> {
  @Column({
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    autoIncrementIdentity: true,
  })
  id: number;
  @Column({ allowNull: false, unique: true })
  username: string;
  @Column({ allowNull: false })
  password: string;
  @ForeignKey(() => UserModel)
  @Column({ allowNull: false })
  user_id: number;
  @BelongsTo(() => UserModel)
  user: UserModel;
}
